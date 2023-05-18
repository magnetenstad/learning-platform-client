import { Configuration, OpenAIApi } from 'npm:openai@3';
import { z } from 'https://deno.land/x/zod@v3.16.1/mod.ts';
import { env } from './env.ts';

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const performRequestWrapper = async (
  performRequest: () => Promise<{ result: string | undefined; status: number }>
) => {
  if (!configuration.apiKey) {
    return {
      result: 'An error occurred during your request.',
      status: 500,
    };
  }

  try {
    return await performRequest();
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    return {
      result: 'An error occurred during your request.',
      status: 500,
    };
  }
};

export const requestCompletion = async (prompt: string) => {
  return await performRequestWrapper(async () => {
    const result = await openai.createCompletion({
      model: 'text-davinci-003', // $0.02 / 1K tokens
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 100,
    });
    return { result: result.data.choices[0].text, status: 200 };
  });
};

export const requestGpt = async (prompt: string) => {
  return await performRequestWrapper(async () => {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // $0.002 / 1K tokens
      temperature: 0.6,
      max_tokens: 100,
      messages: [{ role: 'system', content: prompt }],
    });
    return { result: result.data.choices[0].message?.content, status: 200 };
  });
};

const questionSchema = z.object({
  question: z.string().min(1).max(400),
  correctAnswer: z.string().min(1).max(400).optional(),
  userAnswer: z.string().min(1).max(400),
});

export const generateQuestionPrompt = (body: unknown) => {
  const parsed = questionSchema.safeParse(body);

  if (!parsed.success) {
    console.error(parsed.error);
    return null;
  }

  const data = parsed.data;
  const isStatement =
    data.correctAnswer?.toLowerCase() === 'true' ||
    (data.correctAnswer?.toLowerCase() === 'false' &&
      !data.question.includes('?'));

  return `Grade my answer as correct, somewhat correct or incorrect. Explain any mistakes in my answer. Did I forget anything? What is important to know about to answer this question? 
${isStatement ? 'Statement' : 'Question'}: "${data.question}"
${data.correctAnswer ? `Professor's solution: "${data.correctAnswer}"` : ''}
My answer: "${data.userAnswer}"`;
};

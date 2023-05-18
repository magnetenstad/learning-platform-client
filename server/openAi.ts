import { Configuration, OpenAIApi } from 'npm:openai@3';
import { z } from 'https://deno.land/x/zod@v3.16.1/mod.ts';
import { env } from './env.ts';

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const requestCompletion = async (prompt: string) => {
  if (!configuration.apiKey) {
    return {
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
      status: 500,
    };
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 100,
    });
    return { result: completion.data.choices[0].text, status: 200 };
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    return {
      error: {
        message: 'An error occurred during your request.',
      },
      status: 500,
    };
  }
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

  return `Grade the following student answer (incorrect/somewhat correct/correct). Justify the grade and reflect on how the answer may be improved, without revealing the correct answer.
Question: ${data.question}
${data.correctAnswer ? `Correct answer: ${data.correctAnswer}` : ''}
Student answer: ${data.userAnswer}
Grade and justification:`;
};

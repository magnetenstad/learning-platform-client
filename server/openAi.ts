import { Configuration, OpenAIApi } from 'npm:openai@3';
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

export const generateQuestionPrompt = (
  body:
    | {
        question: string;
        correctAnswer: string;
        userAnswer: string;
      }
    | unknown
) => {
  // TODO: Zod
  if (
    !(
      body &&
      typeof body === 'object' &&
      'question' in body &&
      'correctAnswer' in body &&
      'userAnswer' in body &&
      typeof body.question == 'string' &&
      typeof body.correctAnswer == 'string' &&
      typeof body.userAnswer == 'string' &&
      body.question.length > 0 &&
      body.correctAnswer.length > 0 &&
      body.userAnswer.length > 0
    )
  ) {
    console.error(`Body failed: ${JSON.stringify(body)}`);
    return null;
  }

  return `Grade the following student answer (incorrect/somewhat correct/correct). Justify the grade and reflect on how the answer may be improved, without revealing the correct answer.
Question: ${body.question}
Correct answer: ${body.correctAnswer}
Student answer: ${body.userAnswer}
Grade and justification:`;
};

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

export const generateAnimalPrompt = (animal: string) => {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
};

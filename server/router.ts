import { Router } from 'https://deno.land/x/oak@v12.4.0/mod.ts';
import { generateAnimalPrompt, requestCompletion } from './openAi.ts';

export const router = new Router();

router.get('/', (ctx) => {
  ctx.response.body = 'Hello world!';
});

router.post('/animal', async (ctx) => {
  const body = await ctx.request.body().value;
  // TODO: Zod?

  if (!body || !('animal' in body) || (body.animal ?? '').trim().length === 0) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: {
        message: 'Please enter a valid animal',
      },
    };
    return;
  }
  console.log('C');

  const prompt = generateAnimalPrompt(body.animal);
  const result = await requestCompletion(prompt);
  ctx.response.status = result.status;
  ctx.response.body = result;
});

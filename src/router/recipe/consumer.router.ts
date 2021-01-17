// Modules
import { getApiResponse } from 'http-provider';

// Providers
import { RecipeConsumerProvider } from '../../providers/recipe/recipe-consumer.provider';

// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.get('/', async (request: Request, response: Response) => {
  const message = {};

  const { status, body } = getApiResponse(message);
  response.status(status).send(body);
});

router.post('/', async (request: Request, response: Response) => {
  const message = await RecipeConsumerProvider.create(request);

  const { status, body } = getApiResponse(message);
  response.status(status).send(body);
});

router.delete('/:id', async (request: Request, response: Response) => {
  const message = {};

  const { status, body } = getApiResponse(message);
  response.status(status).send(body);
});

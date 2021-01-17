// Modules
import { getApiResponse } from 'http-provider';

// Providers
import { RecipeProvider } from '../../providers/recipe/recipe.provider';

// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.get('/', async (request: Request, response: Response) => {
  const message = await RecipeProvider.find(request);

  const { status, body } = getApiResponse(message);
  response.status(status).send(body);
});

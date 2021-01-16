// Modules
import { getApiResponse } from 'http-provider';

// Providers
import { UserProvider } from '../providers/user.provider';

// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.post('/signup', async (request: Request, response: Response) => {
  const message = await UserProvider.signup(request);

  const { status, body } = getApiResponse(message);
  response.status(status).send(body);
});

router.post('/signin', async (request: Request, response: Response) => {
  const message = await UserProvider.signin(request);

  const { status, body } = getApiResponse(message);
  response.status(status).send(body);
});

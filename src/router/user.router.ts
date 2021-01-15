// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.post('/signup', async (request: Request, response: Response) => {
  const message = {};
  response.status(200).send(message);
});

router.post('/signin', async (request: Request, response: Response) => {
  const message = {};
  response.status(200).send(message);
});

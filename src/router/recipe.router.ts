// Types
import { Router, Request, Response } from 'express';

export const router: Router = Router();

router.get('/', async (request: Request, response: Response) => {
  const message = {};
  response.status(200).send(message);
});

router.post('/', async (request: Request, response: Response) => {
  const message = {};
  response.status(200).send(message);
});

router.delete('/:id', async (request: Request, response: Response) => {
  const message = {};
  response.status(200).send(message);
});

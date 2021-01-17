// Modules
import { get, isNil } from 'lodash';

// Providers
import { TokenProvider } from '../providers/token.provider';

// Types
import { Router, Request, Response, NextFunction } from 'express';
import { IDecodedTokenPayload } from '../types/token.types';

export const router: Router = Router();

/**
 * Verify if the user auth status is valid or not
 */
router.use((request: Request, response: Response, next: NextFunction) => {
  const authorization: string = get(request, 'headers.authorization', null);

  if (isNil(authorization)) {
    return response.status(401).send({ error: 'Missing authorization header' });
  }

  const decodedToken = TokenProvider.verify(authorization);

  request.decodedTokenPayload = decodedToken as IDecodedTokenPayload;
  next();
});

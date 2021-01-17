// Modules
import { get } from 'lodash';

// Types
import { Router, Request, Response, NextFunction } from 'express';

export const router: Router = Router();

/**
 * Verify if authenticated user is admin
 */
router.use((request: Request, response: Response, next: NextFunction) => {
  const { isAdmin } = get(request, 'decodedTokenPayload', {
    isAdmin: false
  });

  if (!isAdmin) {
    return response.status(401).send('You are not allowed to request');
  }

  next();
});

import { IDecodedTokenPayload } from '../../src/types/token.types';

declare global {
  namespace Express {
    interface Request {
      decodedTokenPayload: IDecodedTokenPayload;
    }
  }
}

// Types
import { IDb } from '../src/types/db.types';

export interface Environment {
  autoInstance: boolean;
  api: {
    port: number;
  };
  db: IDb;
  jwt: {
    secret: string;
  };
  crypto: {
    algorithm: string;
    secret: string;
  };
}

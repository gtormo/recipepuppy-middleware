import { Environment } from './environment.type';

// Modules
import { toNumber } from 'lodash';

export const environment: Environment = {
  autoInstance: true,
  api: {
    port: toNumber(process.env.API_PORT)
  },
  db: {
    db: process.env.MONGO_CONNECTION_DATABASE,
    host: process.env.MONGO_CONNECTION_HOST,
    username: process.env.MONGO_CONNECTION_USERNAME,
    password: process.env.MONGO_CONNECTION_PASSWORD,
    port: toNumber(process.env.MONGO_CONNECTION_PORT)
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY
  },
  crypto: {
    algorithm: process.env.CRYPTO_ALGORITHM,
    secret: process.env.CRYPTO_SECRET_KEY
  },
  recipepuppy: {
    apiUrl: process.env.RECIPEPUPPY_API_URL
  }
};

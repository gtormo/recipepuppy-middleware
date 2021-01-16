import { environment as originalEnvironment } from './environment/environment';

// Mocking environment
import { mocked } from 'ts-jest/utils';

jest.mock('./environment/environment');
const environment = mocked(originalEnvironment, true);
environment.autoInstance = false;
// environment.db.db = 'test';

import { DbProvider } from './src/providers/db.provider';
// import mongoose from 'mongoose';

// Tests
import { userTestSuite } from './tests/e2e/user';

describe('sequentially run tests', () => {
  beforeAll(
    async (): Promise<void> => {
      await DbProvider.instance(environment.db);

      // if (mongoose.connection.db.databaseName === 'test') {
      //   await mongoose.connection.db.dropDatabase();
      // }
    }
  );

  afterAll(
    async (): Promise<void> => {
      await DbProvider.disconnectInstance();
    }
  );

  userTestSuite();
});

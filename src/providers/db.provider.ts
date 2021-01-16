// Modules
import { connect, ConnectOptions, disconnect } from 'mongoose';

// Types
import { IDb } from '../types/db.types';

const getUri = (options: IDb): string => {
  const { protocol, username, password, host, port, db } = options;
  return `${protocol}${username}:${password}@${host}:${port}/${db}`;
};

const getOptions = (): ConnectOptions => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  } as ConnectOptions;
};

const instance = async (connectionConfig: IDb): Promise<void> => {
  try {
    await connect(getUri(connectionConfig), getOptions());

    console.info('Successfully connected to MongoDB server');
  } catch (error) {
    throw new Error(error);
  }
};

const disconnectInstance = async (): Promise<void> => {
  await disconnect();
};

export const DbProvider = {
  instance,
  disconnectInstance
};

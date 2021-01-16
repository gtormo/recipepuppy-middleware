// Modules
import { get, toLower } from 'lodash';
import { convertToAppError } from 'http-provider';

// Providers
import { ValidateDataProvider } from './validate-data.provider';
// import { CryptoProvider } from './crypto.provider';

// Types
import { Request } from 'express';
import { ICreateUserInput } from '../types/user.types';

export function getSanetizedRequestBody({
  email,
  password,
  isAdmin
}: ICreateUserInput): ICreateUserInput {
  const loweredEmail = toLower(email);

  ValidateDataProvider.validateEmail(loweredEmail);
  ValidateDataProvider.validatePassword(password);

  return {
    email: loweredEmail,
    password,
    isAdmin
  };
}

const signup = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    // const { email, password, isAdmin }: ICreateUserInput = getSanetizedRequestBody(body);
    // const encryptedPassword = CryptoProvider.encrypt(password);

    return body;
  } catch (error) {
    return convertToAppError(error);
  }
};

const signin = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    return body;
  } catch (error) {
    return convertToAppError(error);
  }
};

export const UserProvider = {
  signup,
  signin
};

// Modules
import { get, toLower, isNil } from 'lodash';
import { convertToAppError } from 'http-provider';

// Providers
import { ValidateDataProvider } from './validate-data.provider';
import { CryptoProvider } from './crypto.provider';

// Schemas
import { UserSchema } from '../schemas/user.schema';

// Types
import { Request } from 'express';
import { AppError } from 'error-type';
import { ICreateUserInput, IUser } from '../types/user.types';

export function getSanetizedRequestBody({
  email,
  password,
  isAdmin
}: ICreateUserInput): ICreateUserInput {
  const loweredEmail = toLower(email);

  ValidateDataProvider.validateEmail(loweredEmail);
  ValidateDataProvider.validatePassword(password);
  ValidateDataProvider.validateIsAdmin(isAdmin);

  return {
    email: loweredEmail,
    password,
    isAdmin
  };
}

const signup = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    const { email, password, isAdmin }: ICreateUserInput = getSanetizedRequestBody(body);
    const encryptedPassword = CryptoProvider.encrypt(password);

    const user: IUser = await UserSchema.findOne({ email });

    if (!isNil(user)) {
      throw {
        httpStatus: 413,
        description: 'Account already registered',
        error: new Error('Account already registered. Duplicated email')
      } as AppError;
    }

    const userSchema: IUser = new UserSchema();
    userSchema.email = email;
    userSchema.password = encryptedPassword;

    if (isAdmin) {
      userSchema.isAdmin = true;
    }

    await userSchema.save();

    return { message: 'user created successfully' };
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

// Modules
import { get, toLower, isNil } from 'lodash';
import { convertToAppError } from 'http-provider';

// Providers
import { ValidateDataProvider } from './validate-data.provider';
import { CryptoProvider } from './crypto.provider';
import { TokenProvider } from './token.provider';

// Schemas
import { UserSchema } from '../schemas/user.schema';

// Types
import { Request } from 'express';
import { AppError } from 'error-type';
import { IEncrypt } from '../types/crypto.types';
import { ITokenPayload } from '../types/token.types';
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
    const { email, password } = request.body as ICreateUserInput;

    if (isNil(email) || isNil(password)) {
      throw {
        httpStatus: 413,
        description: 'Email and password are non optional parameters',
        error: new Error('Missing parameters')
      } as AppError;
    }

    // If the db user does not exists, we need to check it
    const user: IUser = await UserSchema.findOne({ email });

    // If the email or password are not valid we throw an authorization error
    if (!get(user, 'password', null) || !isValidUserAndPasswordFromDb(password, user.password)) {
      throw {
        httpStatus: 401,
        description: 'Email or password does not match',
        error: new Error('Invalid credentials')
      };
    }

    const token = TokenProvider.sign({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    } as ITokenPayload);

    return token;
  } catch (error) {
    return convertToAppError(error);
  }
};

/**
 * It compares if both passwords are the same.
 * It is possible because the db password is decrypted inside of this function.
 */
export function isValidUserAndPasswordFromDb(password: string, dbPassword: IEncrypt): boolean {
  const dbPasswordDecrypted: string = CryptoProvider.decrypt(dbPassword);
  return password === dbPasswordDecrypted;
}

export const UserProvider = {
  signup,
  signin
};

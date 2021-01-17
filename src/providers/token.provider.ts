import { environment } from '../../environment/environment';

// Modules
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import { isEmpty, isNil, get, isObject } from 'lodash';
import { convertToAppError } from 'http-provider';

// Types
import { ITokenPayload } from '../types/token.types';
import { AppError } from 'error-type';

/**
 * This function generates new tokens with an expiration time
 */
const sign = (payload: ITokenPayload): Record<string, any> => {
  try {
    if (isEmpty(payload)) {
      throw {
        httpStatus: 413,
        description: 'Missing payload',
        error: new Error('Missing payload')
      } as AppError;
    }

    const token: string = jwtSign(payload, environment.jwt.secret, {
      expiresIn: '8h'
    });

    if (isNil(token)) {
      throw new Error('Generated token is nil');
    }

    return { token };
  } catch (error) {
    return convertToAppError(error);
  }
};

/**
 * This checks if the token is a valid one or even if it's expired
 */
const verify = (token: string): Record<string, any> => {
  try {
    if (isEmpty(token)) {
      throw {
        httpStatus: 413,
        description: 'Token can not be null',
        error: new Error('Token can not be null')
      } as AppError;
    }

    const payload: any = jwtVerify(token, environment.jwt.secret);

    if (!isObject(payload)) {
      throw {
        httpStatus: 500,
        description: 'Error decoding payload',
        error: new Error('Error decoding payload. It is not an object')
      } as AppError;
    }

    return payload;
  } catch (error) {
    throw !get(error, 'httpStatus', null)
      ? ({
          httpStatus: 401,
          description: 'Token is already expired',
          error: new Error('JWT can not verify token')
        } as AppError)
      : error;
  }
};

export const TokenProvider = {
  sign,
  verify
};

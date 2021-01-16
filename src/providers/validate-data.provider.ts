// Modules
import validator from 'validator';
import { isEmpty, isBoolean } from 'lodash';

// Types
import { AppError } from 'error-type';

const PasswordValidator = require('password-validator');

const validateEmail = (value: string): void => {
  if (isEmpty(value) || !validator.isEmail(value)) {
    throw {
      httpStatus: 413,
      description: 'Email is not valid',
      error: new Error(`User email is not passing validator.isEmail`)
    } as AppError;
  }
};

const validateIsAdmin = (value: boolean): void => {
  if (!isEmpty(value) && !isBoolean(value)) {
    throw {
      httpStatus: 413,
      description: 'invalid value for isAdmin field',
      error: new Error(`invalid value for isAdmin field`)
    } as AppError;
  }
};

const validatePassword = (value: string): void => {
  const passwordValidator = new PasswordValidator();
  const schema = passwordValidator
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();

  const isNotValidRules: string[] = schema.validate(value, {
    list: true
  }) as string[];

  if (!isEmpty(isNotValidRules)) {
    throw {
      httpStatus: 413,
      description:
        'Password is not valid: min 8, max 100, uppercase, lowercase, digits and no spaces',
      error: new Error(`Invalid password rules: ${isNotValidRules}`)
    } as AppError;
  }
};

export const ValidateDataProvider = {
  validateEmail,
  validatePassword,
  validateIsAdmin
};

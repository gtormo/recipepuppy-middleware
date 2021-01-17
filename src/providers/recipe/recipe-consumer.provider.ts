// Modules
import { convertToAppError } from 'http-provider';
import { get, isEmpty } from 'lodash';

// Types
import { ICreateRecipe } from '../../types/recipe.type';
import { AppError } from 'error-type';
import { Request } from 'express';

export function getSanetizedRequestBody({
  title,
  ingredients,
  href,
  thumbnail
}: ICreateRecipe): ICreateRecipe {
  if (isEmpty(title) || isEmpty(ingredients)) {
    throw {
      httpStatus: 413,
      description: 'Missing some required parameter',
      error: new Error('Missing some required parameter (title or ingredients)')
    } as AppError;
  }

  return {
    title,
    ingredients,
    href,
    thumbnail
  };
}

const create = async (request: Request): Promise<Record<string, any>> => {
  try {
    const body = get(request, 'body', {});
    const { _id } = get(request, 'decodedTokenPayload', {
      _id: ''
    });

    // const { title, ingredients, thumbnail, href }: ICreateRecipe = getSanetizedRequestBody(body);

    return { _id, body };
  } catch (error) {
    return convertToAppError(error);
  }
};

export const RecipeConsumerProvider = {
  create
};

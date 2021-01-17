import { environment } from '../../../environment/environment';

// Modules
import { convertToAppError } from 'http-provider';
import axios, { AxiosResponse } from 'axios';
import { get, toString } from 'lodash';

// Types
import { IRecipeApiResponse, IRecipeItem } from '../../types/recipe/recipe.type';
import { Request } from 'express';

const getQueryParamsUri = (ingredients: string, recipeName: string, page: string): string => {
  let uri: string = `/?i=${ingredients}&q=${recipeName}&page=${page}`;
  return uri;
};

const find = async (request: Request): Promise<Record<string, any>> => {
  try {
    const ingredients = toString(get(request.query, 'i', ''));
    const recipeName = toString(get(request.query, 'q', ''));
    const page = toString(get(request.query, 'p', '1'));

    console.info(
      `GET - ${environment.recipepuppy.apiUrl}${getQueryParamsUri(ingredients, recipeName, page)}`
    );

    const response: AxiosResponse<IRecipeApiResponse> = await axios.get(
      `${environment.recipepuppy.apiUrl}${getQueryParamsUri(ingredients, recipeName, page)}`
    );

    return response.data.results as IRecipeItem[];
  } catch (error) {
    return convertToAppError(error);
  }
};

export const RecipeProvider = {
  find
};

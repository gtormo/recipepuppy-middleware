// Types
import { Document, Types } from 'mongoose';

// HTTP interfaces
export interface IRecipeApiResponse {
  title: string;
  version: number;
  href: string;
  results: IRecipeItem[];
}

export interface IRecipeItem {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;
}

// Database interfaces
export interface IRecipe extends Document {
  _id: Types.ObjectId;
  hash: string;
  userId: Types.ObjectId;
  title: string;
  href: string;
  ingredients: string[];
  thumbnail: string;
}

export interface ICreateRecipe {
  hash?: IRecipe['hash'];
  userId?: IRecipe['userId'];
  title?: IRecipe['title'];
  href?: IRecipe['href'];
  ingredients?: IRecipe['ingredients'];
  thumbnail?: IRecipe['thumbnail'];
}

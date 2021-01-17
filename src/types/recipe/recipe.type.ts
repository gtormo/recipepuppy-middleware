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

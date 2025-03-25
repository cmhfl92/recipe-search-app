export interface Recipe {
  uri: string;
  label: string;
  image: string;
  url: string;
  totalTime: number;
  ingredientLines: string[];
}

export interface RecipeSearchResponse {
  hits: { recipe: Recipe }[];
}

import { RecipeDifficulty } from '../components/recipeDifficultyBadge';

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  url: string;
  totalTime: number;
  ingredientLines: string[];
  healthLabels?: string[];
  difficulty: RecipeDifficulty;
}

export interface RecipeSearchResponse {
  hits: { recipe: Recipe }[];
}

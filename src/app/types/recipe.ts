import { RecipeDifficulty } from '../components/recipeDifficultyBadge';
import { SpiceLevel } from '../components/spiceBadge';

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  url: string;
  totalTime: number;
  ingredientLines: string[];
  healthLabels?: string[];
  difficulty: RecipeDifficulty;
  spice: SpiceLevel;
}

export interface RecipeSearchResponse {
  hits: { recipe: Recipe }[];
}

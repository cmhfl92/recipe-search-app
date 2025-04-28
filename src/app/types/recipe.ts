import { RecipeDifficulty } from '../components/recipeDifficultyBadge';
import { SpiceLevel } from '../components/spiceBadge';

export interface Recipe {
  uri?: string;
  _id: string;
  label: string;
  image: string;
  url?: string;
  totalTime?: number;
  ingredients: string[];
  healthLabels?: string[];
  difficulty?: RecipeDifficulty;
  spice?: SpiceLevel;
}

export interface RecipeSearchResponse {
  hits: { recipe: Recipe }[];
}

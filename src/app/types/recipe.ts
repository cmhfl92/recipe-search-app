import { RecipeDifficulty } from '../components/recipeDifficultyBadge';
import { SpiceLevel } from '../components/spiceBadge';

export interface Recipe {
  uri?: string;
  _id: string; //added be/fe
  label: string; //added be/fe
  image: string; //added be/fe
  url?: string;
  totalTime?: number;
  ingredients: string[]; //added be/fe
  healthLabels?: string[]; //should be
  difficulty: RecipeDifficulty; //added be/fe
  spice: SpiceLevel; //added be/fe
}

export interface RecipeSearchResponse {
  hits: { recipe: Recipe }[];
}

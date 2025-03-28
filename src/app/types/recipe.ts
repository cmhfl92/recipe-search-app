import { RecipeDifficulty } from '../components/recipeDifficultyBadge';
import { SpiceLevelBadge } from '../components/spiceBadge';

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  url: string;
  totalTime: number;
  ingredientLines: string[];
  healthLabels?: string[];
  difficulty: RecipeDifficulty;
  spice: SpiceLevelBadge;
}

export interface RecipeSearchResponse {
  hits: { recipe: Recipe }[];
}

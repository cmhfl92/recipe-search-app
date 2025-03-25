import axios from 'axios';
import { RecipeSearchResponse } from '@/app/types/recipe';

const APP_ID = process.env.NEXT_PUBLIC_EDAMAM_APP_ID!;
const APP_KEY = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY!;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export const searchRecipes = async (
  query: string
): Promise<RecipeSearchResponse> => {
  const url = `${BASE_URL}?type=public&q=${encodeURIComponent(
    query
  )}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await axios.get<RecipeSearchResponse>(url);
  return response.data;
};

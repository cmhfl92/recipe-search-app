import axios from 'axios';
import { RecipeSearchResponse } from '@/app/types/recipe';
import { RecipeDifficulty } from '../components/recipeDifficultyBadge';
import { SpiceLevel } from '../components/spiceBadge';

const APP_ID = process.env.NEXT_PUBLIC_EDAMAM_APP_ID!;
const APP_KEY = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY!;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

// export const searchRecipes = async (
//   query: string
// ): Promise<RecipeSearchResponse> => {
//   const url = `${BASE_URL}?type=public&q=${encodeURIComponent(
//     query
//   )}&app_id=${APP_ID}&app_key=${APP_KEY}`;
//   const response = await axios.get<RecipeSearchResponse>(url, {
//     headers: {
//       'Edamam-Account-User': 'christa.hegedus1@gmail.com',
//     },
//   });
//   return response.data;
// };

//mockData
export const searchRecipes = async (
  query: string
): Promise<RecipeSearchResponse> => {
  console.log('Mock search for:', query);
  return mockRecipes;
};

export const mockRecipes = {
  hits: [
    {
      recipe: {
        uri: 'mock_1',
        label: 'Spaghetti Carbonara',
        image: 'https://source.unsplash.com/400x300/?spaghetti',
        url: 'https://example.com/recipes/spaghetti-carbonara',
        totalTime: 25,
        ingredientLines: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta'],
        healthLabels: ['Gluten-Free'],
        difficulty: RecipeDifficulty.Medium,
        spice: SpiceLevel.Mild,
      },
    },
    {
      recipe: {
        uri: 'mock_2',
        label: 'Avocado Toast',
        image: 'https://source.unsplash.com/400x300/?avocado-toast',
        url: 'https://example.com/recipes/avocado-toast',
        totalTime: 10,
        ingredientLines: ['Bread', 'Avocado', 'Salt', 'Chili flakes'],
        healthLabels: ['Vegan'],
        difficulty: RecipeDifficulty.Easy,
        spice: SpiceLevel.NoSpice,
      },
    },
    {
      recipe: {
        uri: 'mock_3',
        label: 'Moong Dal',
        image: 'https://source.unsplash.com/400x300/?moong-dal',
        url: 'https://example.com/recipes/moong-dal',
        totalTime: 45,
        ingredientLines: [
          'Moong split peas',
          'curry spice',
          'onion',
          'coriander',
          'garlic/ginger paste',
          'water',
        ],
        healthLabels: ['Vegan'],
        difficulty: RecipeDifficulty.Hard,
        spice: SpiceLevel.Hot,
      },
    },
    {
      recipe: {
        uri: 'mock_4',
        label: 'Roasted Chicken Thighs',
        image: 'https://source.unsplash.com/400x300/?chicken-thighs',
        url: 'https://example.com/recipes/chicken-thighs',
        totalTime: 30,
        ingredientLines: ['chickens thighs', 'spices'],
        healthLabels: ['Gluten Free'],
        difficulty: RecipeDifficulty.Easy,
        spice: SpiceLevel.Medium,
      },
    },
  ],
};

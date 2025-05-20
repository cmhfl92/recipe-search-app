import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { FavoriteRecipe } from '../types/recipe';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['FavoriteRecipe'],
  endpoints: builder => ({
    getFavorites: builder.query<FavoriteRecipe[], string>({
      query: getFavorite => ({
        url: '/favorites',
      }),
    }),
  }),
});

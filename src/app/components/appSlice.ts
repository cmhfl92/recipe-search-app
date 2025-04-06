import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Recipe, RecipeSearchResponse } from '../types/recipe';
import { searchRecipes } from '../lib/api';

type CustomArgs = string;
type CustomResult = RecipeSearchResponse;

const customBaseQuery: BaseQueryFn<
  CustomArgs,
  CustomResult,
  unknown
> = async query => {
  try {
    const data = await searchRecipes(query);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getReipces: builder.query<Recipe[], string>({
      query: query => query,
      transformResponse: (response: RecipeSearchResponse) =>
        response.hits.map(hit => hit.recipe),
    }),
  }),
});

export const { useGetReipcesQuery, useLazyGetReipcesQuery } = recipesApi;

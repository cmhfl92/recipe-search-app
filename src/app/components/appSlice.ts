import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Recipe, RecipeSearchResponse } from '../types/recipe';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Recipe'],
  endpoints: builder => ({
    getReipces: builder.query<Recipe[], string>({
      query: query => `/search?query=${encodeURIComponent(query)}`,
      transformResponse: (response: RecipeSearchResponse) =>
        response.hits.map(hit => hit.recipe),
      providesTags: result =>
        result ? result.map(({ uri }) => ({ type: 'Recipe', id: uri })) : [],
    }),
    deleteRecipe: builder.mutation<{ success: boolean; id: string }, string>({
      query: id => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Recipe', id }],
    }),
  }),
});

export const {
  useGetReipcesQuery,
  useLazyGetReipcesQuery,
  useDeleteRecipeMutation,
} = recipesApi;

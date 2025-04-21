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
        result ? result.map(({ _id }) => ({ type: 'Recipe', id: _id })) : [],
    }),
    createRecipe: builder.mutation<Recipe, { label: string }>({
      query: newRecipe => ({
        url: '/recipes',
        method: 'POST',
        body: newRecipe,
      }),
      invalidatesTags: ['Recipe'],
    }),
    deleteRecipe: builder.mutation<{ success: boolean; id: string }, string>({
      query: id => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetReipcesQuery,
  useLazyGetReipcesQuery,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FavoriteRecipe, Recipe, RecipeSearchResponse } from '../types/recipe';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Recipe'],
  endpoints: builder => ({
    getReipces: builder.query<Recipe[], string>({
      query: query => `/search?query=${encodeURIComponent(query)}`,
      transformResponse: (response: RecipeSearchResponse) =>
        response.hits.map(hit => hit.recipe),
      providesTags: result =>
        result ? result.map(({ _id }) => ({ type: 'Recipe', id: _id })) : [],
    }),
    createRecipe: builder.mutation<
      Recipe,
      {
        label: string;
        image: string;
        difficulty: string;
        spice: string;
        ingredients: string;
      }
    >({
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

//creating another 'createApi' in the same folder. Do I need a separate folder or just add it to the existing one?
// export const favoritesApi = createApi({
//   reducerPath: 'favoritesApi',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
//   tagTypes: ['FavoriteRecipe'],
//   endpoint: builder => ({

//   })
// })

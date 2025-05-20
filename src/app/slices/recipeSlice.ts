import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchRecipes } from '../lib/api';
import { Recipe } from '../types/recipe';

type RecipesState = {
  data: Recipe[];
  loading: boolean;
  error: string;
};

const initialState: RecipesState = {
  data: [],
  loading: false,
  error: '',
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query: string) => {
    const response = await searchRecipes(query);
    return response.hits.map((hit: any) => hit.recipe);
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message ?? 'Failed to load recipes!!');
      });
  },
});

export default recipesSlice.reducer;

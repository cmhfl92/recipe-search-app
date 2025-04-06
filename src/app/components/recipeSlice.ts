import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type Recipe = {
  id: number;
  title: string;
};

interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const res = await new Promise<{ id: number; title: string }[]>(resolve =>
      setTimeout(
        () =>
          resolve([
            { id: 1, title: 'Sphagetti' },
            { id: 2, title: 'Tacos' },
          ]),
        1000
      )
    );
    return res;
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
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message ?? 'Failed to load recipes!!');
      });
  },
});

export default recipesSlice.reducer;

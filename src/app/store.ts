import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from './slices/appSlice';
//import recipesReducer from '../app/components/recipeSlice';

export const store = configureStore({
  reducer: {
    //recipes: recipesReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: getDefaulMiddleware =>
    getDefaulMiddleware().concat(recipesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

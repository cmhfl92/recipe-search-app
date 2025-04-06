'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './lib/themeContext';
import { FavoritesProvider } from './lib/favoriteContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </ThemeProvider>
    </Provider>
  );
}

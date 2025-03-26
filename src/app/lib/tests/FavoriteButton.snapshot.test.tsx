import React from 'react';
import { render } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '@/app/lib/favoriteContext';

const FavoriteButton = ({ recipeId }: { recipeId: string }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(recipeId);

  return (
    <button
      onClick={() =>
        favorite ? removeFavorite(recipeId) : addFavorite(recipeId)
      }
    >
      {favorite ? '💔' : '❤️'}
    </button>
  );
};

describe('FavoriteButton Snapshot', () => {
  const renderWithProvider = (ui: React.ReactNode) =>
    render(<FavoritesProvider>{ui}</FavoritesProvider>);

  it('renders non-favorited state', () => {
    const { asFragment } = renderWithProvider(
      <FavoriteButton recipeId='123' />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders favorited state after click', () => {
    const { asFragment, getByRole } = renderWithProvider(
      <FavoriteButton recipeId='123' />
    );
    getByRole('button').click();
    expect(asFragment()).toMatchSnapshot();
  });
});

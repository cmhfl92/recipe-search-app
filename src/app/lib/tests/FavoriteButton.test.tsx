import { render, screen, fireEvent } from '@testing-library/react';
import { useFavorites, FavoritesProvider } from '@/app/lib/favoriteContext';
import React from 'react';

const FavoriteButtonTest = ({ recipeId }: { recipeId: string }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
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

const renderWithProvider = (ui: React.ReactNode) =>
  render(<FavoritesProvider>{ui}</FavoritesProvider>);

describe('Favorite Button', () => {
  it('adds and removes favorite correctly', () => {
    renderWithProvider(<FavoriteButtonTest recipeId='test_recipe_1' />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('❤️');

    fireEvent.click(button);
    expect(button).toHaveTextContent('💔');

    fireEvent.click(button);
    expect(button).toHaveTextContent('❤️');
  });
});

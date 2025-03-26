import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../favoriteContext';

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  it('adds and removes favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    //empty initially
    expect(result.current.favorites).toEqual([]);

    act(() => {
      result.current.addFavorite('recipe_1');
    });

    act(() => {
      result.current.removeFavorite('recipe_1');
    });
    expect(result.current.favorites).not.toContain('recipe_1');
  });

  it('checks isFavorite correctly', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite('recipe_2');
    });

    expect(result.current.isFavorite('recipe_2')).toBe(true);
    expect(result.current.isFavorite('recipe_x')).toBe(false);
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { useFavorites, FavoritesProvider } from '@/app/lib/favoriteContext';
import React, { useState } from 'react';
import {
  useDeleteRecipeMutation,
  useLazyGetReipcesQuery,
} from '@/app/components/appSlice';

const mockDelete = jest.fn();

const DeleteButtonTest = ({ recipeId }: { recipeId: string }) => {
  const handleDeleteRecipe = async (id: string) => {
    mockDelete(recipeId);
  };

  return <button onClick={() => handleDeleteRecipe(recipeId)}>Delete</button>;
};

describe('Delete Button', () => {
  it('deletes recipe card with recipeId', () => {
    render(<DeleteButtonTest recipeId='recipeIdTest' />);
    const button = screen.getByRole('button', { name: /delete/i });

    fireEvent.click(button);
    expect(mockDelete).toHaveBeenCalledWith('recipeIdTest');
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

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

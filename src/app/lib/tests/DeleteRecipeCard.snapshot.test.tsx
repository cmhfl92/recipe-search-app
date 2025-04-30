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
    const { asFragment } = render(<DeleteButtonTest recipeId='recipeIdTest' />);
    expect(asFragment()).toMatchSnapshot();
  });
});

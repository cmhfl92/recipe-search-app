import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

export const ViewIngredientsButtonTest = ({
  _id,
  ingredients,
  label,
}: {
  _id: string;
  ingredients: string[];
  label: string;
}) => {
  const clickHandler = (_id: string) => {};

  return <button onClick={() => clickHandler(_id)}>View Ingredients</button>;
};

describe('View Ingredients Button', () => {
  it('views ingredients via modal', () => {
    render(
      <ViewIngredientsButtonTest
        _id='test_recipe_1'
        label='test_ingredients_1'
        ingredients={['ingredient test 1', 'ingredient test 2']}
      />
    );
    const button = screen.getByRole('button', { name: /view ingredients/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('View Ingredients');

    fireEvent.click(button);
  });
});

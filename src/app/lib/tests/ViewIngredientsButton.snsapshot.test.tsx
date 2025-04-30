import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ViewIngredientsButtonTest } from './ViewIngredientsButton.test';

describe('View Ingredients Button', () => {
  it('views ingredients via modal', () => {
    const { asFragment } = render(
      <ViewIngredientsButtonTest
        _id='test_recipe_1'
        label='test_ingredients_1'
        ingredients={['ingredient test 1', 'ingredient test 2']}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

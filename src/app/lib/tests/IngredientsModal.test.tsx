import IngredientsModal from '@/app/components/ingredientsModal';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

describe('Show Ingredients Modal', () => {
  it('should not show when closed', () => {
    render(
      <IngredientsModal
        open={false}
        onClose={() => {}}
        label='Test Recipe'
        ingredients={['ingredient 1', 'ingredient 2']}
      />
    );

    expect(screen.queryByText('Test Recipe')).not.toBeInTheDocument();
  });
  it('should show label and ingredients when open', () => {
    render(
      <IngredientsModal
        open={true}
        onClose={() => {}}
        label='Test Recipe'
        ingredients={['ingredient 1', 'ingredient 2']}
      />
    );

    expect(screen.queryByText('Test Recipe')).toBeInTheDocument();
    expect(
      screen.queryByText('ingredient 1, ingredient 2')
    ).toBeInTheDocument();
  });
});

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useLazyGetReipcesQuery } from './appSlice';

interface IngredientsModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  ingredients: string[];
}

const IngredientsModal: React.FC<IngredientsModalProps> = ({
  open,
  onClose,
  label,
  ingredients,
}) => {
  //   const label = recipes.map(recipe => recipe.label);
  //   const ingredients = recipes.map(recipe => recipe.ingredients);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>{ingredients}</DialogContent>
    </Dialog>
  );
};

export default IngredientsModal;

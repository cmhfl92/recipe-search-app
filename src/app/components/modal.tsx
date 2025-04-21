import { useState } from 'react';
import { useCreateRecipeMutation } from './appSlice';
import Button from './Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface RecipeModalProps {
  open: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ open, onClose }) => {
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [createRecipe] = useCreateRecipeMutation();

  const handleSave = async () => {
    if (label && image && difficulty)
      try {
        await createRecipe({ label, image, difficulty });
        onClose();
      } catch (err) {
        console.log('Failed to add new recipe');
      }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Recipe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Recipe Name'
          fullWidth
          variant='outlined'
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Image URL'
          fullWidth
          variant='outlined'
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Difficulty'
          fullWidth
          variant='outlined'
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button label='Save' onClick={handleSave} variant='primary' />
        <Button label='Cancel' onClick={onClose} variant='secondary' />
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;

import { useState } from 'react';
import { useCreateRecipeMutation } from './appSlice';
import Button from './Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  const [spice, setSpice] = useState('');
  const [createRecipe] = useCreateRecipeMutation();

  const handleSave = async () => {
    if (label && image && difficulty && spice)
      try {
        await createRecipe({ label, image, difficulty, spice });
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
          sx={{
            width: '30rem',
          }}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Image URL'
          fullWidth
          variant='outlined'
          value={image}
          onChange={e => setImage(e.target.value)}
          sx={{
            width: '30rem',
            padding: '5px 0',
          }}
        />
        <FormControl
          sx={{
            width: '30rem',
          }}
        >
          <InputLabel id='demo-simple-select-label'>Difficulty</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={difficulty}
            label='Difficulty'
            onChange={e => setDifficulty(e.target.value)}
          >
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'medium'}>Intermediate</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <div className='pb-3' />
        <FormControl
          sx={{
            width: '30rem',
          }}
        >
          {' '}
          <InputLabel id='demo-simple-select-label'>Spice Level</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={spice}
            label='Spice Level'
            onChange={e => setSpice(e.target.value)}
          >
            <MenuItem value={'no spice'}>No Spice</MenuItem>
            <MenuItem value={'mild'}>Mild</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'hot'}>Hot</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button label='Save' onClick={handleSave} variant='primary' />
        <Button label='Cancel' onClick={onClose} variant='secondary' />
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;

import { useState } from 'react';
import { useCreateRecipeMutation } from './appSlice';
import Button from './Button';

const RecipeModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [label, setLabel] = useState('');
  const [createRecipe] = useCreateRecipeMutation();

  const handleSave = async () => {
    if (label)
      try {
        await createRecipe({ label });
        closeModal();
      } catch (err) {
        console.log('Failed to add new recipe');
      }
  };

  if (!isOpen) return null;

  return (
    <div>
      <h2>Create New Recipe</h2>
      <input
        type='text'
        value={label}
        onChange={e => setLabel(e.target.value)}
        placeholder='Enter Recipe Name'
      />
      <div className='modal-actions'>
        <Button label='Save Recipe' onClick={handleSave} variant='primary' />
        <Button label='Cancel' onClick={closeModal} variant='secondary' />
      </div>
    </div>
  );
};

export default RecipeModal;

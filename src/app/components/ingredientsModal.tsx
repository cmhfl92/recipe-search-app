import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

interface IngredientsModalProps {
  open: boolean;
  onClose: () => void;
}

const IngredientsModal: React.FC<IngredientsModalProps> = ({
  open,
  onClose,
}) => {
  const [label, setLabel] = useState('Default Label');
  //   const [ingredients] = useCreateRecipeMutation();
  const [ingredients] = useState<string[]>([]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>Ingredients listed here.</DialogContent>
    </Dialog>
  );
};

export default IngredientsModal;

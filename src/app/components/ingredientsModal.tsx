import { Dialog, DialogContent, DialogTitle } from '@mui/material';

interface IngredientsModalProps {
  open: boolean;
  onClose: () => void;
  label?: string;
  ingredients?: string[];
}

const IngredientsModal: React.FC<IngredientsModalProps> = ({
  open,
  onClose,
  label,
  ingredients,
}) => {
  console.log('ingredients', ingredients);
  return (
    <Dialog open={open} onClose={onClose}>
      {' '}
      {/*I put id here and it didn't work*/}
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>{ingredients}</DialogContent>
    </Dialog>
  );
};

export default IngredientsModal;

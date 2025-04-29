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
  console.log('ingedients', ingredients);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='ingredients-dialog-title'
    >
      {' '}
      {/*I put id here and it didn't work*/}
      <DialogTitle id='ingredients-dialog-title'>{label}</DialogTitle>
      <DialogContent>
        <ul className='pl-5 list-disc'>
          {ingredients?.map((ingredient: string, index: any) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default IngredientsModal;

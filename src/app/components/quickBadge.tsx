const QuickBadge: React.FC<{ time: number }> = ({ time }) => {
  return time <= 15 ? (
    <span className='text-green-600' title='Quick Recipe'>
      🚀
    </span>
  ) : null;
};

export default QuickBadge;

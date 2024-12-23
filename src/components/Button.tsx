import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </Button>
  );
};

export default CustomButton;

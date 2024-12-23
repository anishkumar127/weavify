import React from 'react';
import { InputLabel, InputLabelProps } from '@mui/material';

interface CustomInputLabelProps extends InputLabelProps {
  required?: boolean;
  label: string;
  htmlFor: string;
  className?: string;
}

const CustomInputLabel: React.FC<CustomInputLabelProps> = ({
  htmlFor,
  required = false,
  className = '',
  label,
  ...props
}) => {
  return (
    <InputLabel htmlFor={htmlFor} required={required} className={`!font-semibold ${className}`} {...props}>
      {label}
    </InputLabel>
  );
};

export default CustomInputLabel;

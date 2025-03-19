import { InputLabel, InputLabelProps } from '@mui/material';
import React, { memo } from 'react';

interface LabelProps extends InputLabelProps {
  required?: boolean;
  label: string;
  htmlFor: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, required = false, className = '', label, ...props }) => {
  return (
    <InputLabel htmlFor={htmlFor} required={required} className={`!font-semibold ${className}`} {...props}>
      {label}
    </InputLabel>
  );
};

export default memo(Label);

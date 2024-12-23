import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  label?: string;
  placeholder?: string;
  type?: string;
}

export const Input = ({
  variant = 'outlined',
  fullWidth = true,
  size = 'medium',
  label,
  placeholder,
  type = 'text',
  ...props
}: InputProps) => {
  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      label={label}
      placeholder={placeholder}
      type={type}
      {...props}
    />
  );
};

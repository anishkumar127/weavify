
import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'small',
  onClick,
  children,
  startIcon,
  endIcon,
  disabled = false,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      sx={{ ...sx }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

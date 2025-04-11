import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  onClick: () => void;
  text: string;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  onClick,
  text,
  variant = 'contained',
  color = 'primary',
  className = '',
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={icon}
      className={`!rounded-none !bg-[#03838740] !text-sm !font-normal !text-[#026367] !shadow-none ${className}`}
      sx={{
        '.MuiButton-icon': {
          marginRight: '4px',
          marginTop: '1px',
        },
      }}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;

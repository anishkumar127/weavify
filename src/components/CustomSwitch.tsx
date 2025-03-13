import Switch from '@mui/material/Switch';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';

interface CustomSwitchProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSwitch = styled(({ className, ...props }: CustomSwitchProps & { className?: string }) => (
  <Switch disableRipple {...props} className={className} />
))<{
  trackColorOn?: string;
  trackColorOff?: string;
  thumbColorOn?: string;
  thumbColorOff?: string;
}>(
  ({
    theme,
    trackColorOn = '#026367',
    trackColorOff = '#E9E9EA',
    thumbColorOn = '#fff',
    thumbColorOff = '#333',
  }: {
    theme: Theme;
    trackColorOn?: string;
    trackColorOff?: string;
    thumbColorOn?: string;
    thumbColorOff?: string;
  }) => ({
    width: 40,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 4,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(18px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: trackColorOn,
          opacity: 1,
          border: 0,
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: thumbColorOn,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: trackColorOn,
        border: '4px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 12,
      height: 12,
      backgroundColor: thumbColorOff,
    },
    '& .MuiSwitch-track': {
      borderRadius: 10,
      backgroundColor: trackColorOff,
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }),
);

export default CustomSwitch;

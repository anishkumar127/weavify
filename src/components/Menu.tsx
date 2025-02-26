import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

export interface MenuPropsType {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface MenuProps {
  icon: React.ReactNode;
  menuItems: MenuPropsType[];
}

const CustomMenu: React.FC<MenuProps> = ({ icon, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>{icon}</IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              if (item.onClick) {
                item.onClick();
              }
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomMenu;

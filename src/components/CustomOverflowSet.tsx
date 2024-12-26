import { MoreVerticalRegular } from '@fluentui/react-icons';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface OverflowSetProps {
  children: React.ReactNode[];
  maxVisibleItems: number;
  containerStyles?: string;
}

const CustomOverflowSet: React.FC<OverflowSetProps> = ({ children, maxVisibleItems, containerStyles }) => {
  const [visibleItems, setVisibleItems] = useState<React.ReactNode[]>([]);
  const [overflowItems, setOverflowItems] = useState<React.ReactNode[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (children.length > maxVisibleItems) {
      setVisibleItems(children.slice(0, maxVisibleItems));
      setOverflowItems(children.slice(maxVisibleItems));
    } else {
      setVisibleItems(children);
      setOverflowItems([]);
    }
  }, [children, maxVisibleItems]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <div className={`flex items-center ${containerStyles}`}>
      {visibleItems.map((item, index) => (
        <div className="mr-1" key={index}>
          {item}
        </div>
      ))}

      {overflowItems.length > 0 && (
        <>
          <IconButton onClick={handleMenuOpen}>
            <MoreVerticalRegular />
          </IconButton>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
            {overflowItems.map((item, index) => (
              <MenuItem key={index} onClick={handleMenuClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};

export default CustomOverflowSet;

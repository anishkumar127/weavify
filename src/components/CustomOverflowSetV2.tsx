import { MoreVerticalRegular } from '@fluentui/react-icons';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface OverflowItem {
  key: string;
  content: React.ReactNode;
  onClick?: () => void;
  hideOnOverflow?: boolean;
}

interface OverflowSetProps {
  items: OverflowItem[];
  maxVisibleItems: number;
  containerStyles?: string;
}

const CustomOverflowSet: React.FC<OverflowSetProps> = ({ items, maxVisibleItems, containerStyles }) => {
  const [visibleItems, setVisibleItems] = useState<OverflowItem[]>([]);
  const [overflowItems, setOverflowItems] = useState<OverflowItem[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const alwaysVisible = items.filter((item) => !item.hideOnOverflow);
    const overflowCandidates = items.filter((item) => item.hideOnOverflow);

    if (alwaysVisible.length + overflowCandidates.length > maxVisibleItems) {
      setVisibleItems(alwaysVisible.slice(0, maxVisibleItems));
      setOverflowItems(alwaysVisible.slice(maxVisibleItems).concat(overflowCandidates));
    } else {
      setVisibleItems(alwaysVisible.concat(overflowCandidates));
      setOverflowItems([]);
    }
  }, [items, maxVisibleItems]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box className={`flex items-center ${containerStyles}`}>
      {visibleItems.map((item) => (
        <Box key={item.key} className="mr-1">
          <div onClick={item.onClick}>{item.content}</div>
        </Box>
      ))}

      {overflowItems.length > 0 && (
        <>
          <IconButton onClick={handleMenuOpen}>
            <MoreVerticalRegular />
          </IconButton>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
            {overflowItems.map((item) => (
              <MenuItem
                key={item.key}
                onClick={() => {
                  item.onClick?.();
                  handleMenuClose();
                }}
              >
                {item.content}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default React.memo(CustomOverflowSet);

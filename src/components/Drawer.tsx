/**
 * CustomDrawer Component
 *
 * A flexible and customizable drawer component based on Material-UI's Drawer.
 * It supports different sizes, types, and customizable content. Ideal for creating side panels or slide-out menus.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {boolean} isOpen - Controls whether the drawer is open or closed.
 * @param {function} onClose - Function to close the drawer when the user clicks the close button or outside the drawer.
 * @param {string} headerTitle - Title to display in the drawer's header.
 * @param {React.ReactNode} bodyContent - Content to display inside the drawer body.
 * @param {string} [drawerStyles] - Custom CSS classes for styling the drawer container.
 * @param {string} [drawerBodyStyles] - Custom CSS classes for styling the drawer body content.
 * @param {string} [drawerHeaderStyles] - Custom CSS classes for styling the drawer header.
 * @param {'small' | 'medium' | 'large' | 'full'} size - Defines the size of the drawer. Can be 'small', 'medium', 'large', or 'full'.
 * @param {'temporary' | 'persistent' | 'permanent'} type - Defines the type of the drawer. Can be 'temporary', 'persistent', or 'permanent'.
 */
import { DismissRegular } from '@fluentui/react-icons';
import { Drawer, IconButton, Typography } from '@mui/material';
import * as React from 'react';

type DrawerSizePreset = 'small' | 'medium' | 'large' | 'full';
type DrawerSize = DrawerSizePreset | number;

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  headerTitle: string;
  bodyContent: React.ReactNode;
  // React.CSSProperties
  drawerStyles?: string;
  drawerBodyStyles?: string;
  drawerHeaderStyles?: string;
  size: DrawerSize;
  type: 'temporary' | 'persistent' | 'permanent';
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  headerTitle,
  bodyContent,
  drawerStyles,
  drawerBodyStyles,
  drawerHeaderStyles,
  size,
  type,
  ...props
}) => {
  const drawerSizeMap: Record<string, string> = {
    small: '300px',
    medium: '500px',
    large: '700px',
    full: '100%',
  };

  function getDrawerWidth(size: DrawerSize): string {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return drawerSizeMap[size];
  }

  return (
    <Drawer
      className={drawerStyles}
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant={type}
      {...props}
      sx={{
        width: getDrawerWidth(size) || '300px',
        height: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: getDrawerWidth(size) || '300px',
          // backgroundColor: '#929292',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <div className={drawerHeaderStyles}>
        <Typography variant="h6" sx={{ fontSize: '16px' }} className="!text-white">
          {headerTitle}
        </Typography>
        <IconButton sx={{ color: 'white' }} onClick={onClose} aria-label="close">
          <DismissRegular />
        </IconButton>
      </div>
      <div className={drawerBodyStyles}>{bodyContent}</div>
    </Drawer>
  );
};

export default React.memo(CustomDrawer);

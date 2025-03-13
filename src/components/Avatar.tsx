/**
 * CustomAvatar Component
 *
 * A reusable and customizable avatar component based on Material-UI's Avatar.
 * It supports various sizes, image sources, text fallbacks, and customizable styles.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {string} [imageUrl] - The source URL of the avatar image.
 * @param {string} [altText] - Alternate text for the image (used if the image fails to load).
 * @param {string} [fallbackText] - Fallback initials or text when no image is provided.
 * @param {string} [avatarStyles] - Custom CSS classes for styling the avatar container.
 * @param {string} size - Defines the size of the avatar. Can be 'small', 'medium', 'large', or 'extraLarge'.
 * @param {React.CSSProperties} [customStyles] - Inline styles for further customization.
 */

import { Avatar } from '@mui/material';
import * as React from 'react';

interface CustomAvatarProps {
  imageUrl?: string;
  altText?: string;
  fallbackText?: string;
  avatarStyles?: string;
  size: 'small' | 'medium' | 'large' | 'extraLarge';
  customStyles?: React.CSSProperties;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  imageUrl,
  altText = '',
  fallbackText = '',
  avatarStyles,
  size,
  customStyles,
}) => {
  const avatarSizeMap: Record<string, number> = {
    small: 30,
    medium: 50,
    large: 70,
    extraLarge: 100,
  };

  return (
    <Avatar
      src={imageUrl}
      alt={altText}
      className={avatarStyles}
      sx={{
        width: avatarSizeMap[size] || 50,
        height: avatarSizeMap[size] || 50,
        fontSize: `${avatarSizeMap[size] / 2.5}px`,
        backgroundColor: '#1976d2',
        color: '#fff',
        ...customStyles,
      }}
    >
      {imageUrl ? '' : fallbackText?.slice(0, 2).toUpperCase()}
    </Avatar>
  );
};

export default React.memo(CustomAvatar);

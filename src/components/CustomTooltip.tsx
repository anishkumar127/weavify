import React from 'react';
import { Tooltip, TooltipProps } from '@mui/material';

/**
 * CustomTooltip Component
 *
 * A reusable Tooltip component that can be customized with different icons and content.
 * The tooltip displays additional information when hovering over the icon.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {string} title - The text or content to display in the tooltip.
 * @param {React.ReactElement} icon - The icon or element to display with the tooltip, default is InfoRegular icon.
 * @param {TooltipProps} [tooltipProps] - Optional props to customize the Tooltip behavior.
 */
interface CustomTooltipProps extends TooltipProps {
  title: string;
  icon: React.ReactElement;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, icon, ...tooltipProps }) => {
  return (
    <Tooltip title={title} {...tooltipProps}>
      {icon}
    </Tooltip>
  );
};

export default CustomTooltip;

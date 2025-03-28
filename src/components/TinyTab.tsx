'use client';
import { Tab, TabProps, Tabs, TabsProps } from '@mui/material';
import { memo } from 'react';

interface TabItem {
  key: string;
  label: string | React.ReactNode;
  sx?: TabProps['sx'];
}

interface TinyTabProps extends Partial<TabsProps> {
  selectedPivot: string | null;
  setSelectedPivot: (value: string) => void;
  tabs: TabItem[];
  containerClassName?: string;
  childClassName?: string;
  disableDefaultContainerStyles?: boolean;
  disableDefaultTabStyles?: boolean;
  // sx?: TabProps['sx'];
}

const TinyTab: React.FC<TinyTabProps> = ({
  selectedPivot,
  setSelectedPivot,
  tabs,
  containerClassName = '',
  childClassName = '',
  disableDefaultContainerStyles = false,
  disableDefaultTabStyles = false,
  ...tabsProps
  // childSx,
}) => {
  const containerSx = disableDefaultContainerStyles
    ? tabsProps.sx
    : {
        minHeight: 'unset',
        height: '32px',
        '& .MuiTabs-indicator': {
          bottom: 0,
        },
        '& .MuiTabs-flexContainer': {
          gap: '5px',
        },
        ...tabsProps.sx,
      };
  return (
    <Tabs
      value={selectedPivot ?? tabs[0]?.key}
      aria-label="dynamic tiny tabs"
      {...tabsProps}
      sx={containerSx}
      className={containerClassName}
    >
      {tabs.map(({ key, label, sx }) => {
        const tabSx = disableDefaultTabStyles
          ? sx
          : {
              padding: 0,
              minHeight: 'unset',
              height: '32px',
              maxWidth: 'auto',
              minWidth: '65px',
              lineHeight: '32px',
              '&.Mui-selected': {
                borderBottom: 'none',
              },
              ...sx,
            };

        return (
          <Tab
            key={key}
            value={key}
            label={<span className="text-sm leading-none">{label}</span>}
            onClick={() => setSelectedPivot(key)}
            sx={tabSx}
            className={childClassName}
          />
        );
      })}
    </Tabs>
  );
};

export default memo(TinyTab);

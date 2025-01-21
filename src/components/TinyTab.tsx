import { Tab, TabProps, Tabs, TabsProps } from '@mui/material';

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
}

const TinyTab: React.FC<TinyTabProps> = ({
  selectedPivot,
  setSelectedPivot,
  tabs,
  containerClassName = '',
  ...tabsProps
}) => {
  return (
    <Tabs
      value={selectedPivot ?? tabs[0]?.key}
      aria-label="dynamic tabs"
      className={containerClassName}
      {...tabsProps}
      sx={{
        minHeight: 'unset',
        height: '32px',
        '& .MuiTabs-indicator': {
          bottom: 0,
        },
        '& .MuiTabs-flexContainer': {
          gap: '5px',
        },
        ...tabsProps.sx,
      }}
    >
      {tabs.map(({ key, label, sx }) => (
        <Tab
          key={key}
          value={key}
          label={<span className="text-sm leading-none">{label}</span>}
          onClick={() => setSelectedPivot(key)}
          sx={{
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
          }}
        />
      ))}
    </Tabs>
  );
};

export default TinyTab;

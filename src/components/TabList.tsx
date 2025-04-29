import { Tab, Tabs } from '@mui/material';

interface TabItem {
  key: string;
  label: string;
}

interface TabListProps {
  selectedPivot: string | null;
  setSelectedPivot: (value: string) => void;
  pivotCount?: Record<string, number>;
  tabs: TabItem[];
  trigger?: boolean;
  setTrigger?: React.Dispatch<React.SetStateAction<boolean>>;
  isTrigger?: boolean;
}

const TabList = ({
  selectedPivot,
  setSelectedPivot,
  pivotCount,
  tabs,
  trigger,
  setTrigger,
  isTrigger = false,
}: TabListProps) => {
  return (
    <Tabs
      value={selectedPivot ?? tabs[0]?.key}
      aria-label="dynamic tabs"
      sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
    >
      {tabs.map(({ key, label }) => (
        <Tab
          key={key}
          sx={{
            '&.Mui-selected': { borderBottom: 'none' },
            '& .MuiTabs-indicator': { display: 'none' },
          }}
          value={key}
          className={`!mr-0.5 !h-11 !min-h-11 ${selectedPivot === key ? '!bg-[#038387]' : '!bg-[#026367]'} !text-white`}
          label={
            <span className="flex items-center gap-2">
              <span className="text-sm leading-none">{label}</span>
              {pivotCount && pivotCount[key] > 0 ? (
                <span className="text-xl font-bold leading-none">{pivotCount[key]}</span>
              ) : (
                ''
              )}
            </span>
          }
          onClick={() => {
            setSelectedPivot(key);
            if (isTrigger) {
              if (trigger && setTrigger) {
                setTrigger(!trigger);
              }
            }
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabList;

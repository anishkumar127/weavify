import { Tab, Tabs } from '@mui/material';

interface TabItem {
  key: string;
  label: string;
}

interface TabListProps {
  selectedPivot: string | null;
  setSelectedPivot: (value: string) => void;
  pivotCount: Record<string, number>;
  tabs: TabItem[];
}

const TabList = ({ selectedPivot, setSelectedPivot, pivotCount, tabs }: TabListProps) => {
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
              {pivotCount[key] > 0 ? <span className="text-xl leading-none font-bold">{pivotCount[key]}</span> : ''}
            </span>
          }
          onClick={() => setSelectedPivot(key)}
        />
      ))}
    </Tabs>
  );
};

export default TabList;

import { Slider } from '@mui/material';
import { Column } from '@tanstack/react-table';
import { Input, Select } from '../../index';
import { CustomColumnMeta } from './types';

interface TableFilterProps<TData> {
  column: Column<TData, unknown>;
}

function TableFilter<TData>({ column }: TableFilterProps<TData>) {
  const meta = column.columnDef.meta as CustomColumnMeta<TData> | undefined;
  const { filterVariant } = meta ?? {};
  const filterValue = column.getFilterValue();
  const [min, max] = column.getFacetedMinMaxValues() ?? [0, 100];
  const placeholder = `${meta?.searchPlaceholder || column.columnDef.header || ''}`;

  // If filter is disabled, return nothing
  if (filterVariant === false) return null;

  // Numeric "range" filter example
  if (filterVariant === 'range') {
    return (
      <div className="px-1 pt-2">
        <Slider
          min={Number(min)}
          max={Number(max)}
          value={Array.isArray(filterValue) && filterValue.length === 2 ? filterValue : [min, max]}
          onChange={(_, val) => column.setFilterValue(val)}
        />
      </div>
    );
  }

  // "Select" filter example
  if (filterVariant === 'select') {
    const options: { label: string; value: string }[] = Array.from(column.getFacetedUniqueValues().keys()).map(
      (value: any) => ({
        label: String(value),
        value: String(value),
      }),
    );
    return (
      <Select
        value={(filterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e)}
        options={options}
        placeholder={`Select ${placeholder}`}
        wrapperStyle="mt-1 w-full"
      />
    );
  }

  // Default text filter
  return (
    <Input
      label="Filter"
      id={`filter-${String(column.id)}`}
      type="text"
      required={false}
      isLabelRequired={false}
      inputStyle="!w-full !bg-white"
      sx={{
        '.MuiOutlinedInput-root': {
          borderRadius: '0px',
        },
      }}
      placeholder={`Search ${placeholder}`}
      value={(filterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
}

export default TableFilter;

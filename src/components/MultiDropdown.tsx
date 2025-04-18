import { Autocomplete, Box, InputLabel, TextField } from '@mui/material';
import { memo } from 'react';

/**
 * MultiDropdown  Component
 *
 * A customizable multi-select dropdown based on Material-UI's Autocomplete.
 * It allows selecting multiple options and supports various configurations like size, placeholder, and styles.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @template T
 * @param {T[]} options - The list of options to display in the dropdown.
 * @param {string} label - The label displayed above the dropdown (optional).
 * @param {string} id - Unique identifier for the dropdown component.
 * @param {boolean} [isLabelRequired=false] - Determines whether the label is displayed.
 * @param {T[]} value - The current selected options.
 * @param {(event: any, value: T[]) => void} onChange - Callback function triggered when the selected options change.
 * @param {string} [placeholder='Select options'] - Placeholder text displayed when no option is selected.
 * @param {object} [sx] - Custom Material-UI styles for the dropdown container.
 * @param {'small' | 'medium'} [size='small'] - Size of the dropdown (small or medium).
 * @param {string} [searchStyle] - Additional CSS classes for styling the search box.
 * @param {string} [wrapperStyle] - Additional CSS classes for styling the dropdown wrapper.
 * @param {boolean} [required=false] - If true, marks the input as required.
 */

interface MultiDropdownProps<T extends { label: string; value: string | number }> {
  options: T[];
  label: string;
  sx?: object;
  id: string;
  size?: 'small' | 'medium';
  searchStyle?: string;
  placeholder?: string;
  isLabelRequired?: boolean;
  wrapperStyle?: string;
  required?: boolean;
  // Adjusted for multi-select
  value: T[];
  // Adjusted for multi-select
  onChange: (event: any, value: T[]) => void;
  disabled?: boolean;
  disableCloseOnSelect?: boolean;
  disableClearable?: boolean;
}

function MultiDropdown<T extends { label: string; value: string | number }>({
  id,
  options,
  label,
  sx,
  onChange,
  searchStyle,
  placeholder = 'Select options',
  size = 'small',
  isLabelRequired = false,
  wrapperStyle,
  required = false,
  value,
  disabled,
  disableCloseOnSelect = false,
  disableClearable = false,
  ...props
}: MultiDropdownProps<T>) {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}

      <Autocomplete
        multiple
        id={id}
        options={options}
        disableCloseOnSelect={disableCloseOnSelect}
        getOptionLabel={(o) => o.label}
        isOptionEqualToValue={(o, v) => o.value === v.value}
        onChange={onChange}
        value={value}
        size={size}
        disabled={disabled}
        disableClearable={disableClearable}
        sx={sx}
        className={searchStyle}
        renderTags={(selected) => {
          if (selected.length === 0) return null;
          const displayText = selected.map((x) => x.label).join(', ');
          return (
            <Box
              component="span"
              sx={{
                flex: 1,
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={displayText}
            >
              {displayText}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            placeholder={value?.length === 0 ? placeholder : ''}
            className={disabled ? 'bg-gray-300' : 'bg-white'}
            {...params}
            inputProps={{
              ...params.inputProps,
              style: {
                ...params.inputProps.style,
                flexGrow: 0,
                flexShrink: 1,
                width: value?.length === 0 ? 'auto' : '',
                minWidth: 0,
              },
            }}
            sx={{
              minHeight: 'auto',
              '& .MuiOutlinedInput-root': { height: 'auto' },
              backgroundColor: disabled ? '#dadada4a' : '#fff',
            }}
          />
        )}
        {...props}
      />
    </div>
  );
}

export default memo(MultiDropdown);

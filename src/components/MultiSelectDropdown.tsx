import { Autocomplete, InputLabel, TextField } from '@mui/material';
import { memo } from 'react';

/**
 * MultiSelectDropdown Component
 *
 * A customizable multi-select dropdown based on Material-UI's Autocomplete.
 * Supports multiple selections with customization options like size, placeholder, and styling.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @template T
 * @param {T[]} options - List of available options.
 * @param {string} label - Label displayed above the dropdown (optional).
 * @param {string} id - Unique identifier for the dropdown component.
 * @param {boolean} [isLabelRequired=false] - Determines whether the label is displayed.
 * @param {T[]} value - Currently selected options.
 * @param {(event: any, value: T[]) => void} onChange - Callback function when selection changes.
 * @param {string} [placeholder='Select options'] - Placeholder text for the dropdown.
 * @param {object} [sx] - Custom Material-UI styles for the dropdown container.
 * @param {'small' | 'medium'} [size='small'] - Size of the dropdown.
 * @param {string} [searchStyle] - Additional CSS classes for the search box.
 * @param {string} [wrapperStyle] - CSS classes for the dropdown wrapper.
 * @param {boolean} [required=false] - Marks the input as required.
 * @param {boolean} [disabled=false] - Disables the dropdown.
 * @param {boolean} [disableCloseOnSelect=false] - Keeps the dropdown open after selection.
 */

interface MultiSelectDropdownProps<T extends { label: string; value: string | number }> {
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
}

function MultiSelectDropdown<T extends { label: string; value: string | number }>({
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
  ...props
}: MultiSelectDropdownProps<T>) {
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
        // disablePortal
        options={options}
        disableCloseOnSelect={disableCloseOnSelect}
        getOptionLabel={(option) => option.label}
        // isOptionEqualToValue={(option, val) => option === val}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        onChange={onChange}
        value={value}
        // Fixes UI inconsistencies
        // renderTags={(selected) => {
        //   if (selected.length === 0) return null;
        //   const displayText = selected.map((item) => item.label).join(', ');
        //   return (
        //     <div
        //       style={{
        //         whiteSpace: 'nowrap',
        //         overflow: 'hidden',
        //         textOverflow: 'ellipsis',
        //         maxWidth: 'calc(100% - 40px)',
        //         display: 'block',
        //         padding: '5px',
        //       }}
        //       title={displayText}
        //     >
        //       {displayText}
        //     </div>
        //   );
        // }}
        renderInput={(params) => (
          <TextField
            placeholder={value.length === 0 ? placeholder : ''}
            sx={{
              minHeight: 'auto',
              '& .MuiOutlinedInput-root': {
                height: 'auto',
              },
              backgroundColor: disabled ? '#dadada4a' : '#fff',
            }}
            className={disabled ? 'bg-gray-300' : 'bg-white'}
            {...params}
          />
        )}
        disabled={disabled}
        size={size}
        sx={sx}
        className={searchStyle}
        {...props}
      />
    </div>
  );
}

export default memo(MultiSelectDropdown);

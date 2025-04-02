import { Autocomplete, InputLabel, TextField } from '@mui/material';
import { memo } from 'react';

interface DropdownProps<T> {
  options: T[];
  label: string;
  //   getOptionLabel: (option: T) => string;
  sx?: object;
  id: string;
  size?: 'small' | 'medium';
  searchStyle?: string;
  placeholder?: string;
  isLabelRequired?: boolean;
  wrapperStyle?: string;
  required?: boolean;
  // ! fix later
  value: any;
  //   onChange: (event: SyntheticEvent<Element, Event>, value: string) => void;
  // ! fix later
  onChange: any;
  disabled?: boolean;
  disableClearable?: boolean;
}

function Dropdown<T>({
  id,
  options,
  label,
  sx,
  onChange,
  searchStyle,
  placeholder = 'Select an option',
  size = 'small',
  isLabelRequired = false,
  wrapperStyle,
  required = false,
  value,
  disabled = false,
  disableClearable = false,
  ...props
}: DropdownProps<T>) {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <Autocomplete
        //        disablePortal
        options={options}
        onChange={onChange}
        // getOptionLabel={getOptionLabel}
        sx={sx}
        className={searchStyle}
        size={size}
        id={id}
        value={value}
        disableClearable={disableClearable}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            className={`${disabled} ? '!bg-gray-500' : 'bg-white`}
            sx={{
              backgroundColor: disabled ? '#dadada4a' : '#fff',
            }}
          />
        )}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}

export default memo(Dropdown);

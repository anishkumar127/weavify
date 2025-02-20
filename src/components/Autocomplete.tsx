import { Autocomplete, InputLabel, TextField } from '@mui/material';

interface AutocompleteProps<T> {
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
  value: any; // ! fix later
  //   onChange: (event: SyntheticEvent<Element, Event>, value: string) => void;
  onChange: any; // ! fix later
  disabled?: boolean;
}

function CustomAutocomplete<T>({
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
  ...props
}: AutocompleteProps<T>) {
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
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            className={`${disabled} ? '!bg-gray-500' : 'bg-white`}
            sx={{
              backgroundColor: disabled ? '#dadada4a' : '',
            }}
          />
        )}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}

export default CustomAutocomplete;

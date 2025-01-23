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
        renderInput={(params) => <TextField className="bg-white" {...params} placeholder={placeholder} />}
      />
    </div>
  );
}

export default CustomAutocomplete;

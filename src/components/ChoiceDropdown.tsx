
import { Autocomplete, InputLabel, TextField } from '@mui/material';

interface ChoiceDropdownProps<T> {
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
  value: T[]; // Adjusted for multi-select
  onChange: (event: any, value: T[]) => void; // Adjusted for multi-select
}

/**
 * ChoiceDropdown Component
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

function ChoiceDropdown<T>({
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
}: ChoiceDropdownProps<T>) {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <Autocomplete
        multiple
        disablePortal
        options={options}
        onChange={onChange}
        sx={sx}
        className={searchStyle}
        size={size}
        id={id}
        value={value}
        renderInput={(params) => (
          <TextField
            className="bg-white"
            {...params}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
}

export default ChoiceDropdown;

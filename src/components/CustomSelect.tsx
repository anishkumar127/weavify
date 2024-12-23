/**
 * CustomSelect Component
 *
 * A flexible and customizable select input component designed to work with Material UI.
 * It supports features like customizable labels, placeholders, size options, and more.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {string} value - The current selected value in the dropdown. This is controlled by the parent component.
 * @param {function} onChange - A callback function that gets called when the selected option changes.
 *                               It provides the updated value and the selected item.
 * @param {Array} options - An array of options to display in the dropdown. Each option should have a 'value' and 'label'.
 * @param {string} [label] - An optional label to display above the select input. If not provided, no label is shown.
 * @param {string} [placeholder='Select an option'] - A placeholder that appears when no option is selected.
 * @param {'small' | 'medium'} [size='small'] - The size of the select input. Can either be 'small' or 'medium'.
 * @param {string} [selectStyle] - A custom class name for additional styling of the select input.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - Any extra properties you want to pass to the underlying input element.
 * @param {boolean} [isLabelRequired=false] - Whether the label should be marked as required. This only affects the label display.
 * @param {string} [wrapperStyle] - A custom class name for the wrapper around the select component.
 * @param {string} [id] - An optional id for the select input element.
 * @param {boolean} [required=false] - If true, the select input is marked as required for form validation.
 */
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
interface Option {
  value: string | number;
  label: string;
}
interface CustomSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent, child: React.ReactNode) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium';
  selectStyle?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  isLabelRequired?: boolean;
  wrapperStyle?: string;
  id?: string;
  required?: boolean;
  //   renderValue?: (value: string | number) => React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option',
  size = 'small',
  selectStyle,
  inputProps,
  isLabelRequired = false,
  wrapperStyle,
  required = false,
  id,
  ...props
  //   renderValue,
}) => {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <Select
        size={size}
        labelId={id}
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={inputProps}
        className={selectStyle}
        {...props}
        // renderValue={renderValue}
        defaultValue=""
        renderValue={(value) => {
          if (!value) {
            return <span className="text-gray-500">{placeholder}</span>;
          }
          return value;
        }}
      >
        {(options as { value: string | number; label: string }[]).map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label || item.value}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export const selectWithRequiredProps = {
  isLabelRequired: true,
  required: true,
};
export const selectWithPlaceholderProps = {
  placeholder: 'Select an option',
};
export const selectStyleProps = {
  selectStyle: 'w-full !bg-white',
};
export default React.memo(CustomSelect);

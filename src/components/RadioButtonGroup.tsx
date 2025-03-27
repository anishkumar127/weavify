/**
 * RadioButtonGroup Component
 *
 * A reusable radio button group component that allows users to select from a set of options.
 * It supports custom alignment, label display, and required fields for form validation.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {string} label - The label for the radio button group.
 * @param {string} name - The name attribute for the radio button group, used to group the options.
 * @param {string} value - The current selected value in the group. Controlled by the parent component.
 * @param {function} onChange - Callback function to handle changes when a new option is selected.
 * @param {Array} options - Array of options to display in the radio button group. Each option has a 'value' and 'label'.
 * @param {string} [defaultValue] - Default value of the selected option, if no value is provided.
 * @param {'row' | 'column'} alignment - Defines the layout of the radio buttons, either 'row' or 'column'.
 * @param {boolean} [required=false] - If true, the radio button group is marked as required.
 * @param {boolean} [isLabelRequired=false] - If true, the label will be marked as required.
 * @param {string} id - Unique identifier for the radio button group.
 * @param {string} [wrapperStyle] - Custom styling for the wrapper around the radio button group.
 * @param {string} [radioStyle] - Custom styling for each radio button.
 */
import { FormControlLabel, InputLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface RadioButtonGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  defaultValue?: string;
  alignment: 'row' | 'column';
  required?: boolean;
  isLabelRequired?: boolean;
  id: string;
  wrapperStyle?: string;
  radioStyle?: string;
  disabled?: boolean;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  options,
  defaultValue,
  alignment,
  required = false,
  isLabelRequired = false,
  wrapperStyle,
  radioStyle,
  disabled,
  ...props
}) => {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <RadioGroup
        aria-labelledby={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        className="!flex-nowrap !overflow-x-auto"
        defaultValue={defaultValue}
        row={alignment === 'row'}
        {...props}
      >
        {options.map((option, idx: number) => (
          <FormControlLabel
            key={idx || option.value}
            className="!flex"
            value={option.value}
            control={<Radio className={radioStyle} />}
            label={option.label}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default React.memo(RadioButtonGroup);

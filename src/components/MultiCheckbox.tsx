/**
 * CustomCheckboxGroup Component
 *
 * A reusable checkbox group component that allows users to select multiple options.
 * It supports custom alignment, label display, and required fields for form validation.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {string} label - The label for the checkbox group.
 * @param {string} name - The name attribute for the checkbox group, used to group the options.
 * @param {string[]} value - The array of currently selected values.
 * @param {function} onChange - Callback function to handle changes when an option is selected/deselected.
 * @param {Array} options - Array of options to display in the checkbox group. Each option has a 'value' and 'label'.
 * @param {'row' | 'column'} alignment - Defines the layout of the checkboxes, either 'row' or 'column'.
 * @param {boolean} [required=false] - If true, the checkbox group is marked as required.
 * @param {boolean} [isLabelRequired=false] - If true, the label will be marked as required.
 * @param {string} id - Unique identifier for the checkbox group.
 * @param {string} [wrapperStyle] - Custom styling for the wrapper around the checkbox group.
 * @param {string} [checkboxStyle] - Custom styling for each checkbox.
 */

import { cn } from '@/utils/utils';
import { Checkbox, FormControlLabel, FormGroup, InputLabel } from '@mui/material';
import { memo } from 'react';

interface Option {
  value: string;
  label: string;
  name: string;
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  value: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  alignment: 'row' | 'column';
  required?: boolean;
  isLabelRequired?: boolean;
  id: string;
  wrapperStyle?: string;
  checkboxStyle?: string;
  containerStyle?: string;
  levelStyle?: string;
  levelOneStyle?: string;
  levelTwoStyle?: string;
  levelThreeStyle?: string;
}

const MultiCheckbox: React.FC<CheckboxGroupProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  alignment,
  required = false,
  isLabelRequired = false,
  wrapperStyle,
  checkboxStyle,
  containerStyle,
  levelStyle,
  levelOneStyle,
  levelTwoStyle,
  levelThreeStyle,
  ...props
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange({
      ...event,
      target: { ...event.target, value: newValue },
    });
  };
  return (
    <div className={cn([containerStyle, wrapperStyle])}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className={cn(['mb-1 !font-semibold', levelStyle])}>
          {label}
        </InputLabel>
      )}
      <FormGroup row={alignment === 'row'} {...props} className={cn(['!flex-nowrap !overflow-x-auto', levelOneStyle])}>
        {options.map((option) => (
          <FormControlLabel
            key={option?.value}
            className={cn(['!flex', levelTwoStyle])}
            control={
              <Checkbox
                className={cn([levelThreeStyle, checkboxStyle])}
                checked={value?.includes(option?.value)}
                onChange={handleCheckboxChange}
                value={option?.value}
              />
            }
            label={option?.label}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default memo(MultiCheckbox);

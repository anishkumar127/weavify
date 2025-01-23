/**
 * CustomTextInput Component
 *
 * A flexible and customizable text input field based on Material UI's TextField component.
 * This component supports custom labels, placeholders, input styles, and more.
 *
 * Author: Anish Kumar
 * Email: anishbishnoi127@gmail.com
 *
 * @param {string} label - The label text for the input field.
 * @param {string} id - The unique identifier for the input field.
 * @param {string} [type='text'] - The type of the input field (e.g., 'text', 'password'). Defaults to 'text'.
 * @param {string} [placeholder=''] - A placeholder text that appears when the input is empty.
 * @param {boolean} [required=false] - If true, the input field is marked as required.
 * @param {boolean} [isLabelRequired=false] - If true, the label is displayed as required.
 * @param {string} [inputStyle] - A custom CSS class for styling the input field.
 * @param {string} [wrapperStyle] - A custom CSS class for styling the wrapper around the input field.
 */
import { InputLabel, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

interface TextInputProps extends Omit<TextFieldProps, 'label' | 'id' | 'type' | 'placeholder'> {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isLabelRequired?: boolean;
  inputStyle?: string;
  wrapperStyle?: string;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  required = false,
  isLabelRequired = false,
  wrapperStyle,
  inputStyle,
  ...props
}) => {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <TextField
        className={inputStyle}
        type={type}
        variant="outlined"
        id={id}
        size="small"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default React.memo(CustomTextInput);

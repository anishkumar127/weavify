import React, { useEffect, useRef, useState } from 'react';

export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  containerClassName?: string;
  selectBoxClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  containerClassName = '',
  selectBoxClassName = '',
  dropdownClassName = '',
  optionClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  return (
    <div className={`relative ${containerClassName}`} ref={selectRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`flex cursor-pointer items-center justify-between rounded border border-gray-300 px-3 py-2 ${selectBoxClassName}`}
        onClick={() => setOpen(!open)}
      >
        <span>{value ? options.find((option) => option.value === value)?.label : placeholder}</span>
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && (
        <ul
          className={`absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg ${dropdownClassName}`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${optionClassName}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

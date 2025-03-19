import {
  Autocomplete,
  Avatar,
  Chip,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import React, { memo, SyntheticEvent } from 'react';

interface Person {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface MultiPeoplePickerProps {
  options: Person[];
  value: Person[];
  onChange: (event: SyntheticEvent<Element, Event>, value: Person[]) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  isLabelRequired?: boolean;
  wrapperStyle?: string;
  id: string;
  disabled?: boolean;
}

const MultiPeoplePicker: React.FC<MultiPeoplePickerProps> = ({
  options,
  value,
  onChange,
  label = 'Select People',
  placeholder = 'Type to search...',
  required = false,
  isLabelRequired = false,
  wrapperStyle,
  id,
  disabled,
  ...props
}) => {
  return (
    <div className={`${wrapperStyle}`}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <Autocomplete
        multiple
        id={id}
        options={options}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        value={value}
        isOptionEqualToValue={(option, selected) => option.email === selected.email}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            placeholder={placeholder}
            sx={{
              minHeight: 'auto',
              '& .MuiOutlinedInput-root': {
                height: 'auto',
              },
              backgroundColor: disabled ? '#dadada4a' : '#fff',
            }}
            className={`${disabled} ? '!bg-gray-500' : 'bg-white`}
            {...params}
          />
        )}
        renderTags={(selected: Person[], getTagProps) =>
          selected.map((option, index) => (
            <Chip
              avatar={<Avatar src={option.avatar || ''} />}
              label={option.name}
              {...getTagProps({ index })}
              key={option.email}
            />
          ))
        }
        renderOption={(props, option) => (
          <ListItem {...props} key={option.email}>
            <ListItemAvatar>
              <Avatar src={option.avatar || ''} />
            </ListItemAvatar>
            <ListItemText primary={option.name} secondary={option.email} />
          </ListItem>
        )}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default memo(MultiPeoplePicker);

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
import React, { SyntheticEvent } from 'react';

interface Person {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface PeoplePickerProps {
  options: Person[];
  value: Person | null;
  onChange: (event: SyntheticEvent<Element, Event>, value: Person | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  isLabelRequired?: boolean;
  wrapperStyle?: string;
  id: string;
}

const PeoplePicker: React.FC<PeoplePickerProps> = ({
  options,
  value,
  onChange,
  label = 'Select People',
  placeholder = 'Type to search...',
  required = false,
  isLabelRequired = false,
  wrapperStyle,
  id,
}) => {
  return (
    <div className={wrapperStyle}>
      {isLabelRequired && (
        <InputLabel htmlFor={id} required={required} className="mb-1 !font-semibold">
          {label}
        </InputLabel>
      )}
      <Autocomplete
        id={id}
        options={options}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        value={value}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        onChange={onChange}
        renderInput={(params) => <TextField className="bg-white" {...params} placeholder={placeholder} />}
        renderTags={(value: Person[], getTagProps) =>
          value.map((option, index) => (
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
      />
    </div>
  );
};

export default PeoplePicker;

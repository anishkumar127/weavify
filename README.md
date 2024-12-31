Here’s a `README.md` section tailored for the `ChoiceDropdown` component within your existing `weavify` package. It focuses solely on `ChoiceDropdown` usage, similar to how popular libraries showcase specific components.

---

# `ChoiceDropdown` Component

The `ChoiceDropdown` is a multi-select dropdown component included in the `weavify` library. It is designed to offer a flexible and intuitive way to allow users to select multiple options, with built-in support for customization and Material-UI styling.

---

## Installation

First, install the `weavify` package if not already done:

```bash
npm install weavify
```

---

## Importing the Component

To use the `ChoiceDropdown` component, simply import it from the `weavify` library:

```tsx
import { ChoiceDropdown } from 'weavify';
```

---

## Basic Usage

Here’s an example of how to use the `ChoiceDropdown` component:

```tsx
import React, { useState } from 'react';
import { ChoiceDropdown } from 'weavify';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

function App() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: any, value: string[]) => {
    setSelectedOptions(value);
  };

  return (
    <ChoiceDropdown
      id="example-dropdown"
      options={options}
      label="Select Options"
      value={selectedOptions}
      onChange={handleChange}
      isLabelRequired={true}
      placeholder="Choose options"
    />
  );
}

export default App;
```

---

## Props

Here are the available props for the `ChoiceDropdown` component:

| Prop              | Type                               | Default            | Description                                                                   |
| ----------------- | ---------------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `options`         | `T[]`                              | **Required**       | The list of options to display in the dropdown.                               |
| `label`           | `string`                           | `undefined`        | The label displayed above the dropdown.                                       |
| `id`              | `string`                           | **Required**       | A unique identifier for the dropdown.                                         |
| `isLabelRequired` | `boolean`                          | `false`            | If `true`, the label is displayed above the dropdown.                         |
| `value`           | `T[]`                              | **Required**       | The currently selected options as an array.                                   |
| `onChange`        | `(event: any, value: T[]) => void` | **Required**       | Callback triggered when the selected options change.                          |
| `placeholder`     | `string`                           | `"Select options"` | Placeholder text displayed when no options are selected.                      |
| `sx`              | `object`                           | `undefined`        | Custom Material-UI styles for the dropdown container.                         |
| `size`            | `'small'` \| `'medium'`            | `'small'`          | Size of the dropdown, either 'small' or 'medium'.                             |
| `searchStyle`     | `string`                           | `undefined`        | Additional CSS classes for customizing the search box.                        |
| `wrapperStyle`    | `string`                           | `undefined`        | Additional CSS classes for styling the dropdown wrapper.                      |
| `required`        | `boolean`                          | `false`            | Marks the input as required, showing an asterisk (\*) in the label if `true`. |

---

## Advanced Example

Here’s an advanced usage example, including custom styling:

```tsx
import React, { useState } from 'react';
import { ChoiceDropdown } from 'weavify';

const options = ['Red', 'Blue', 'Green', 'Yellow'];

function App() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleColorChange = (event: any, value: string[]) => {
    setSelectedColors(value);
  };

  return (
    <ChoiceDropdown
      id="color-picker"
      options={options}
      label="Pick Colors"
      value={selectedColors}
      onChange={handleColorChange}
      placeholder="Select colors"
      size="medium"
      searchStyle="custom-search"
      wrapperStyle="custom-wrapper"
    />
  );
}
```

---

## TypeScript Example

If you’re using TypeScript, the `ChoiceDropdown` supports generics for type safety:

```tsx
interface Option {
  id: number;
  name: string;
}

const options: Option[] = [
  { id: 1, name: 'Option A' },
  { id: 2, name: 'Option B' },
  { id: 3, name: 'Option C' },
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleChange = (event: any, value: Option[]) => {
    setSelectedOptions(value);
  };

  return (
    <ChoiceDropdown
      id="type-safe-dropdown"
      options={options}
      label="Custom Options"
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Choose options"
    />
  );
}
```

---

## Customization

You can customize the appearance of `ChoiceDropdown` using the following:

- **`sx`**: Pass custom Material-UI styles.
- **`searchStyle`**: Add custom CSS classes to style the search box.
- **`wrapperStyle`**: Add custom CSS classes to style the dropdown wrapper.

Example:

```tsx
<ChoiceDropdown
  id="custom-styled-dropdown"
  options={['Item 1', 'Item 2']}
  value={[]}
  onChange={() => {}}
  placeholder="Styled Dropdown"
  sx={{ borderColor: 'blue' }}
  searchStyle="custom-search"
  wrapperStyle="custom-wrapper"
/>
```

---

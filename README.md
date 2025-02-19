# **Weavify - Reusable UI Components**

**Weavify** is a collection of reusable **React UI components** built with **Material-UI (MUI) and Tailwind CSS**. It is designed to accelerate development, improve consistency, and provide a seamless UI/UX experience.

---

## 📦 **Installation**

Install Weavify using npm:

```sh
npm install weavify
```

or with Yarn:

```sh
yarn add weavify
```

Ensure **Tailwind CSS** is set up in your project before using these components.

---

## 🛠️ **Usage**

Weavify provides a collection of prebuilt UI components. Import them as needed:

```tsx
import {
  CustomAutocomplete,
  CustomDrawer,
  ChoiceDropdown,
  Input,
  CustomInputLabel,
  ReusableModal,
  PeoplePicker,
  TabList,
  TinyTab,
} from 'weavify';
```

Each component follows the **Material-UI** structure and is enhanced with **Tailwind CSS** for styling.

---

## 🌟 **Components Overview**

### 1️⃣ **CustomAutocomplete**

A flexible **autocomplete input** with dynamic options.

#### **Props**

| Prop          | Type                  | Default              | Description                                     |
| ------------- | --------------------- | -------------------- | ----------------------------------------------- |
| `options`     | `array`               | `[]`                 | List of selectable options                      |
| `label`       | `string`              | `""`                 | Label displayed above the input                 |
| `size`        | `'small' \| 'medium'` | `'small'`            | Input size                                      |
| `placeholder` | `string`              | `'Select an option'` | Placeholder text                                |
| `onChange`    | `function`            | `-`                  | Callback function triggered on selection change |

#### **Example**

```tsx
<CustomAutocomplete
  id="demo-autocomplete"
  options={['Option 1', 'Option 2']}
  label="Choose an option"
  onChange={(event, value) => console.log(value)}
/>
```

---

### 2️⃣ **CustomDrawer**

A **side drawer** component used for navigation or overlays.

#### **Props**

| Prop          | Type                                         | Default       | Description                          |
| ------------- | -------------------------------------------- | ------------- | ------------------------------------ |
| `isOpen`      | `boolean`                                    | `false`       | Controls drawer visibility           |
| `onClose`     | `function`                                   | `-`           | Function to close the drawer         |
| `headerTitle` | `string`                                     | `""`          | Title displayed in the drawer header |
| `size`        | `'small' \| 'medium' \| 'large' \| 'full'`   | `'medium'`    | Drawer size                          |
| `type`        | `'temporary' \| 'persistent' \| 'permanent'` | `'temporary'` | Drawer behavior                      |

#### **Example**

```tsx
<CustomDrawer isOpen={true} onClose={() => console.log('Closed')} headerTitle="My Drawer">
  <p className="p-4">Drawer Content</p>
</CustomDrawer>
```

---

### 3️⃣ **ChoiceDropdown**

A **multi-select dropdown** powered by MUI's Autocomplete.

#### **Props**

| Prop          | Type       | Default            | Description                            |
| ------------- | ---------- | ------------------ | -------------------------------------- |
| `options`     | `array`    | `[]`               | List of available options              |
| `value`       | `array`    | `[]`               | Selected values                        |
| `onChange`    | `function` | `-`                | Callback triggered on selection change |
| `placeholder` | `string`   | `'Select options'` | Placeholder text                       |

#### **Example**

```tsx
<ChoiceDropdown
  id="multi-dropdown"
  options={['Item 1', 'Item 2']}
  value={['Item 1']}
  onChange={(event, value) => console.log(value)}
/>
```

---

### 4️⃣ **Input**

A customizable **text input** with Tailwind styling.

#### **Props**

| Prop          | Type                                   | Default      | Description         |
| ------------- | -------------------------------------- | ------------ | ------------------- |
| `variant`     | `'outlined' \| 'filled' \| 'standard'` | `'outlined'` | Input style variant |
| `label`       | `string`                               | `""`         | Label for the input |
| `placeholder` | `string`                               | `""`         | Placeholder text    |
| `type`        | `string`                               | `'text'`     | Input type          |

#### **Example**

```tsx
<Input label="Your Name" placeholder="Enter your name" />
```

---

### 5️⃣ **ReusableModal**

A **popup modal** with customizable content.

#### **Props**

| Prop      | Type        | Default | Description                            |
| --------- | ----------- | ------- | -------------------------------------- |
| `open`    | `boolean`   | `false` | Controls modal visibility              |
| `onClose` | `function`  | `-`     | Callback function to close the modal   |
| `title`   | `string`    | `""`    | Modal title                            |
| `content` | `ReactNode` | `""`    | Content displayed in the modal body    |
| `actions` | `ReactNode` | `""`    | Buttons or actions in the modal footer |

#### **Example**

```tsx
<ReusableModal open={true} onClose={() => console.log('Closed')} title="My Modal">
  <p className="p-4">This is a modal.</p>
</ReusableModal>
```

---

### 6️⃣ **PeoplePicker**

A **searchable contact picker** with avatar support.

#### **Props**

| Prop       | Type       | Default | Description                                |
| ---------- | ---------- | ------- | ------------------------------------------ |
| `options`  | `array`    | `[]`    | List of people `{id, name, email, avatar}` |
| `value`    | `object`   | `null`  | Selected person object                     |
| `onChange` | `function` | `-`     | Callback triggered on selection change     |

#### **Example**

```tsx
<PeoplePicker
  id="people-picker"
  options={[{ id: 1, name: 'John Doe', email: 'john@example.com' }]}
  value={null}
  onChange={(event, value) => console.log(value)}
/>
```

---

### 7️⃣ **TabList**

A **dynamic tab navigation** component.

#### **Props**

| Prop               | Type       | Default | Description                       |
| ------------------ | ---------- | ------- | --------------------------------- |
| `tabs`             | `array`    | `[]`    | List of tabs `{key, label}`       |
| `selectedPivot`    | `string`   | `""`    | Active tab key                    |
| `setSelectedPivot` | `function` | `-`     | Callback to change the active tab |

#### **Example**

```tsx
<TabList
  tabs={[
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
  ]}
  selectedPivot="tab1"
  setSelectedPivot={(value) => console.log(value)}
/>
```

---

### 6️⃣ **PeoplePicker**

A **searchable contact picker** with avatar support, allowing users to select a single person.

#### **Props**

| Prop              | Type                                       | Default               | Description                         |
| ----------------- | ------------------------------------------ | --------------------- | ----------------------------------- | ----------------------------------------------- |
| `options`         | `Person[]` (`{ id, name, email, avatar }`) | `[]`                  | List of selectable people           |
| `value`           | `Person \| null`                           | `null`                | Selected person                     |
| `onChange`        | `(event: SyntheticEvent, value: Person     | null) => void`        | `-`                                 | Callback function triggered on selection change |
| `label`           | `string`                                   | `'Select People'`     | Label displayed above the input     |
| `placeholder`     | `string`                                   | `'Type to search...'` | Placeholder text                    |
| `required`        | `boolean`                                  | `false`               | Marks the field as required         |
| `isLabelRequired` | `boolean`                                  | `false`               | Determines whether to show a label  |
| `wrapperStyle`    | `string`                                   | `""`                  | Custom CSS class for the wrapper    |
| `id`              | `string`                                   | `""`                  | Unique identifier for the component |
| `disabled`        | `boolean`                                  | `false`               | Disables the input                  |

#### **Example Usage**

```tsx
<PeoplePicker
  id="people-picker"
  options={[
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]}
  value={null}
  onChange={(event, value) => console.log(value)}
  label="Select a Person"
  placeholder="Search for a person"
  required
  isLabelRequired
/>
```

---

### 7️⃣ **GroupPeoplePicker**

A **multi-select** component that allows users to pick multiple people from a list.

#### **Props**

| Prop              | Type                                               | Default               | Description                                     |
| ----------------- | -------------------------------------------------- | --------------------- | ----------------------------------------------- |
| `options`         | `Person[]` (`{ id, name, email, avatar }`)         | `[]`                  | List of selectable people                       |
| `value`           | `Person[]`                                         | `[]`                  | Selected people                                 |
| `onChange`        | `(event: SyntheticEvent, value: Person[]) => void` | `-`                   | Callback function triggered on selection change |
| `label`           | `string`                                           | `'Select People'`     | Label displayed above the input                 |
| `placeholder`     | `string`                                           | `'Type to search...'` | Placeholder text                                |
| `required`        | `boolean`                                          | `false`               | Marks the field as required                     |
| `isLabelRequired` | `boolean`                                          | `false`               | Determines whether to show a label              |
| `wrapperStyle`    | `string`                                           | `""`                  | Custom CSS class for the wrapper                |
| `id`              | `string`                                           | `""`                  | Unique identifier for the component             |

#### **Example Usage**

```tsx
<GroupPeoplePicker
  id="group-people-picker"
  options={[
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]}
  value={[]}
  onChange={(event, value) => console.log(value)}
  label="Select People"
  placeholder="Search for a person"
  required
  isLabelRequired
/>
```

---

## 📚 **Contributing**

We welcome contributions! Feel free to:

- Submit issues for bugs or enhancements 🐞
- Create pull requests to improve existing components ✨
- Suggest new features that align with the project goals 🚀

---

## 📝 **License**

Weavify is licensed under the **MIT License**.

---

### 🚀 **Get Started with Weavify Today!**

Start integrating **MUI + Tailwind components** into your React projects with **Weavify**. 🚀✨

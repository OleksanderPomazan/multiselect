# Multiselect Component

### Peer Dependencies

This package requires React as a peer dependency:

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectDropdown,
  SelectSearch,
  SelectListBox,
  SelectItem,
  SearchMatchText,
} from "multiselect";

const options = [
  { id: "option-1", text: "Option 1" },
  { id: "option-2", text: "Option 2" },
  { id: "option-3", text: "Option 3" },
];

const MyComponent = () => {
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <Select
      onSelect={setValue}
      multiple
      value={value}
      placeholder="Select options"
    >
      <SelectTrigger>
        <SelectValue
          onRemove={(val) =>
            Array.isArray(value) && setValue(value.filter((v) => v !== val))
          }
        />
      </SelectTrigger>

      <SelectDropdown>
        <SelectSearch />
        <SelectListBox>
          {options.map((option) => (
            <SelectItem key={option.id} id={option.id} textValue={option.text}>
              {({ textValue }) => (
                <SearchMatchText
                  text={textValue}
                  renderMatch={(match) => (
                    <span className="bg-green-500">{match}</span>
                  )}
                />
              )}
            </SelectItem>
          ))}
        </SelectListBox>
      </SelectDropdown>
    </Select>
  );
};
```

## API Reference

### Components

#### Select

The main wrapper component that provides context for all child components.

**Props:**

- `multiple?: boolean` - Enable multiple selection
- `value: string | string[] | null` - Current selected value(s)
- `onSelect: (value: string | string[] | null) => void` - Selection change handler
- `placeholder?: string` - Placeholder text when no selection

#### SelectTrigger

Button that opens/closes the dropdown.

#### SelectValue

Displays the selected value(s). For multiple selections, renders as chips with optional remove functionality.

**Props:**

- `onRemove?: (value: string) => void` - Handler for removing individual selections

#### SelectDropdown

Container for the dropdown content.

#### SelectSearch

Optional search input for filtering options.

#### SelectListBox

Container for the list of selectable options.

#### SelectItem

Individual selectable option.

**Props:**

- `id: string` - Unique identifier
- `textValue?: string` - Text value for searching (required if children is not a string)
- `children: React.ReactNode | ({ textValue: string }) => React.ReactNode`

#### SearchMatchText

Utility component for highlighting search matches.

**Props:**

- `text: string` - Text to search within
- `renderMatch?: (match: string) => React.ReactNode` - Custom match renderer

### Headless Components

For custom styling, use the headless variants:

```tsx
import {
  HeadlessSelect,
  HeadlessSelectTrigger,
  HeadlessSelectValue,
  HeadlessSelectDropdown,
  HeadlessSelectSearch,
  HeadlessSelectListBox,
  HeadlessSelectItem,
  HeadlessSearchMatchText,
} from "multiselect";
```

### Types

```tsx
import type {
  Option,
  SingleSelection,
  MultipleSelection,
  SelectContextType,
} from "multiselect";
```

## Styling

The default components come with Tailwind CSS classes. You can:

1. **Override with CSS classes** - Pass `className` props to components
2. **Use headless components** - Build your own styled components
3. **CSS-in-JS** - Use styled-components or emotion with headless components

## Using as a Git Dependency

You can also install this package directly from a Git repository in your Create React App project:

```bash
# Install from GitHub
npm install git+https://github.com/your-username/multiselect.git

# Or install from a specific branch/tag
npm install git+https://github.com/your-username/multiselect.git#main
```

Then use it in your React components:

```tsx
import { Select, SelectTrigger, SelectValue } from "multiselect";
```

## Development

If you want to run this project locally:

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm/yarn

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd multiselect
```

2. Install dependencies:

```bash
pnpm install
```

## Development

### Start Development Server

Run the development server with hot reload:

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## Storybook

Storybook provides an interactive environment to develop and test components in isolation.

### Start Storybook Development Server

```bash
pnpm storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006)

### Build Storybook

Build a static version of Storybook:

```bash
pnpm build-storybook
```

### Serve Built Storybook

Serve the built Storybook locally:

```bash
pnpm serve-storybook
```

## Testing

This project uses Vitest integrated with Storybook for testing.

### Run Tests

```bash
pnpm test
```

Tests are configured to run against Storybook stories using the browser testing environment with Playwright.

## Building

### Build for Production

```bash
pnpm build
```

This will:

1. Run TypeScript compilation (`tsc -b`)
2. Build the application with Vite

### Preview Production Build

```bash
pnpm preview
```

The production build will be available at [http://localhost:4173](http://localhost:4173)

## Usage Example

```tsx
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectDropdown,
  SelectSearch,
  SelectListBox,
  SelectItem,
  SearchMatchText,
} from "./Select/Select";

const options = [
  { id: "option-1", text: "Option 1" },
  { id: "option-2", text: "Option 2" },
  { id: "option-3", text: "Option 3" },
];

const MultiselectDemo = () => {
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <Select
      onSelect={setValue}
      multiple
      value={value}
      placeholder="Select an option"
    >
      <SelectTrigger>
        <SelectValue
          onRemove={(val) =>
            Array.isArray(value) && setValue(value.filter((v) => v !== val))
          }
        />
      </SelectTrigger>

      <SelectDropdown>
        <SelectSearch />
        <SelectListBox>
          {options.map((option) => (
            <SelectItem key={option.id} id={option.id} textValue={option.text}>
              {({ textValue }) => (
                <SearchMatchText
                  text={textValue}
                  renderMatch={(match) => (
                    <span className="bg-green-500">{match}</span>
                  )}
                />
              )}
            </SelectItem>
          ))}
        </SelectListBox>
      </SelectDropdown>
    </Select>
  );
};
```

## Project Structure

```
src/
├── Select/
│   ├── headless/          # Headless component logic
│   │   ├── Select.tsx     # Main select component
│   │   ├── SelectContext.tsx
│   │   ├── SelectDropdown.tsx
│   │   ├── SelectListBox.tsx
│   │   ├── SelectSearch.tsx
│   │   ├── SelectTrigger.tsx
│   │   └── SelectValue.tsx
│   ├── ChipItem.tsx       # Styled chip component
│   └── Select.tsx         # Styled select components
├── stories/               # Storybook stories
└── App.tsx               # Demo application
```

## Scripts Reference

| Command                | Description                |
| ---------------------- | -------------------------- |
| `pnpm dev`             | Start development server   |
| `pnpm build`           | Build for production       |
| `pnpm preview`         | Preview production build   |
| `pnpm lint`            | Run ESLint                 |
| `pnpm storybook`       | Start Storybook dev server |
| `pnpm build-storybook` | Build Storybook            |
| `pnpm serve-storybook` | Serve built Storybook      |
| `pnpm test`            | Run tests                  |

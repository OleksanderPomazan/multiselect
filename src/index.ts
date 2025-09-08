// Main Select components with styling
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectDropdown,
  SelectSearch,
  SelectListBox,
  SelectItem,
  SearchMatchText,
} from "./Select/Select";

// Headless components for custom styling
export { Select as HeadlessSelect } from "./Select/headless/Select";
export { SelectTrigger as HeadlessSelectTrigger } from "./Select/headless/SelectTrigger";
export { SelectValue as HeadlessSelectValue } from "./Select/headless/SelectValue";
export { SelectDropdown as HeadlessSelectDropdown } from "./Select/headless/SelectDropdown";
export { SelectSearch as HeadlessSelectSearch } from "./Select/headless/SelectSearch";
export {
  SelectListBox as HeadlessSelectListBox,
  SelectItem as HeadlessSelectItem,
  SearchMatchText as HeadlessSearchMatchText,
} from "./Select/headless/SelectListBox";
export { SelectLabel as HeadlessSelectLabel } from "./Select/headless/SelectLabel";

// Context and hooks
export {
  SelectContext,
  useSelectContext,
} from "./Select/headless/SelectContext";

// Additional components
export { ChipItem } from "./Select/ChipItem";

// Utility function
export { cn } from "./cn";

// Types
export type {
  Option,
  SingleSelection,
  MultipleSelection,
  MultipleSelectContext,
  SingleSelectContext,
  SelectContextType,
} from "./Select/headless/SelectContext";

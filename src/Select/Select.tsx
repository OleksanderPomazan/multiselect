import { useState } from "react";
import {
  type MultipleSelection,
  type SingleSelection,
  SelectContext,
} from "./SelectContext";

type SelectProps<Multiple extends boolean = false> = {
  children: React.ReactNode;
  multiple?: Multiple;
  placeholder?: string;
} & (Multiple extends true ? MultipleSelection : SingleSelection);

export const Select = <Multiple extends boolean = false>(
  props: SelectProps<Multiple>
) => {
  const {
    children,
    onSelect,
    multiple = false,
    value,
    placeholder = "",
  } = props;

  const [open, setOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [dropdownEl, setDropdownEl] = useState<HTMLElement | null>(null);

  const selectionProps = { onSelect, value } as Multiple extends true
    ? MultipleSelection
    : SingleSelection;

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        multiple,
        triggerEl,
        setTriggerEl,
        dropdownEl,
        setDropdownEl,
        placeholder,
        ...selectionProps,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

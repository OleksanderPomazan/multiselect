import { Children, isValidElement, useState, type ComponentProps } from "react";
import {
  type MultipleSelectContext,
  type MultipleSelection,
  type SingleSelectContext,
  type SingleSelection,
  SelectContext,
} from "./SelectContext";
import {
  extractListBoxOptions,
  findListBox,
  SelectItem,
  type SelectItemProps,
} from "./SelectListBox";

const extractOptions = (children: React.ReactNode) => {
  const listBox = findListBox(children);
  return new Map(
    extractListBoxOptions(listBox?.props.children).map((option) => {
      const textValue =
        typeof option.props.children === "string"
          ? option.props.children
          : option.props.textValue ?? null;

      if (textValue === null && option.props.textValue === "undefined") {
        console.warn(
          "SelectItem missing textValue prop. Either provide a textValue prop or a string child."
        );
      }
      return [
        option.props.id,
        { id: option.props.id, textValue: textValue ?? "" },
      ];
    })
  );
};

type SelectProps<Multiple extends boolean = false> = {
  children: React.ReactNode;
  multiple?: Multiple;
  placeholder?: string;
} & Omit<ComponentProps<"div">, "onSelect" | "value"> &
  (Multiple extends true ? MultipleSelection : SingleSelection);

export const Select = <Multiple extends boolean = false>(
  props: SelectProps<Multiple>
) => {
  const {
    children,
    onSelect,
    multiple = false,
    value,
    placeholder = "",
    ...attributes
  } = props;

  const [open, setOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [dropdownEl, setDropdownEl] = useState<HTMLElement | null>(null);

  const options = extractOptions(children);

  const selectionProps = { onSelect, value } as Multiple extends true
    ? MultipleSelection
    : SingleSelection;

  return (
    <SelectContext.Provider
      value={
        {
          open,
          setOpen,
          multiple,
          triggerEl,
          setTriggerEl,
          dropdownEl,
          setDropdownEl,
          placeholder,
          options,
          ...selectionProps,
        } as Multiple extends true ? MultipleSelectContext : SingleSelectContext
      }
    >
      <div {...attributes}>{children}</div>
    </SelectContext.Provider>
  );
};

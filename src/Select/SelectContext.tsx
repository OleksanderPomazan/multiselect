import { createContext, useContext } from "react";

export type MultipleSelection = {
  onSelect: (value: string[] | null) => void;
  value: string[] | null;
};

export type SingleSelection = {
  onSelect: (value: string | null) => void;
  value: string | null;
};

type SelectContextType = {
  placeholder?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  multiple: boolean;
  triggerEl: HTMLElement | null;
  setTriggerEl: (el: HTMLElement | null) => void;
  dropdownEl: HTMLElement | null;
  setDropdownEl: (el: HTMLElement | null) => void;
} & (MultipleSelection | SingleSelection);

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectState must be used within a Select");
  }
  return context;
};

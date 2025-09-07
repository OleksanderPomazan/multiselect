import { createContext, useContext } from "react";

type BaseSelectContext = {
  placeholder?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerEl: HTMLElement | null;
  setTriggerEl: (el: HTMLElement | null) => void;
  dropdownEl: HTMLElement | null;
  setDropdownEl: (el: HTMLElement | null) => void;
  options: Map<Option["id"], Option>;
};

export type Option = {
  id: string;
  textValue: string;
};

export type SingleSelection = {
  onSelect: (value: string | null) => void;
  value: string | null;
};

export type MultipleSelection = {
  onSelect: (value: string[] | null) => void;
  value: string[] | null;
};

export type MultipleSelectContext = BaseSelectContext &
  MultipleSelection & {
    multiple: true;
  };

export type SingleSelectContext = BaseSelectContext &
  SingleSelection & {
    multiple: false;
  };

export type SelectContextType = MultipleSelectContext | SingleSelectContext;

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectState must be used within a Select");
  }
  return context;
};

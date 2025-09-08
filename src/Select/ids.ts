import { useSelectContext } from "./SelectContext";

export const idFor = {
  label: (baseId: string) => `${baseId}-label`,
  trigger: (baseId: string) => `${baseId}-trigger`,
  dropdown: (baseId: string) => `${baseId}-dropdown`,
  search: (baseId: string) => `${baseId}-search`,
  listbox: (baseId: string) => `${baseId}-listbox`,
} as const;

export const useIdFor = (element: keyof typeof idFor) => {
  const { baseId } = useSelectContext();
  return idFor[element](baseId);
};

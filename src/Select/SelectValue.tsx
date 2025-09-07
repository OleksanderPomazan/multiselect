import type { ComponentProps } from "react";
import { useSelectContext } from "./SelectContext";

export const SelectValue = (props: ComponentProps<"span">) => {
  const { value, placeholder } = useSelectContext();

  const displayedValue = Array.isArray(value) ? value.join(", ") : value;

  return <span {...props}>{displayedValue || placeholder}</span>;
};

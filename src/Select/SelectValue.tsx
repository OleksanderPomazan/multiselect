import type { ComponentProps } from "react";
import { useSelectContext } from "./SelectContext";

export const SelectValue = (props: ComponentProps<"span">) => {
  const { value, placeholder, options } = useSelectContext();

  const isPlaceholder = value === null;

  const displayedValue = isPlaceholder
    ? placeholder
    : Array.isArray(value)
    ? value.map((v) => options.get(v)?.textValue).join(", ")
    : options.get(value)?.textValue;

  return (
    <span data-placeholder={isPlaceholder} {...props}>
      {displayedValue}
    </span>
  );
};

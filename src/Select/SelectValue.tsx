import type { ComponentProps } from "react";
import { useSelectContext } from "./SelectContext";

type SelectValueRenderProps = {
  value: string[] | string | null;
  defaultChildren: React.ReactNode;
};

type SelectValueProps = Omit<ComponentProps<"span">, "children"> & {
  children?: (props: SelectValueRenderProps) => React.ReactNode;
};

export const SelectValue = ({ children, ...props }: SelectValueProps) => {
  const { value, placeholder, options } = useSelectContext();

  const isPlaceholder =
    value === null || (Array.isArray(value) && value.length === 0);

  const displayedValue = isPlaceholder
    ? placeholder
    : Array.isArray(value)
    ? value.map((v) => options.get(v)?.textValue).join(", ")
    : options.get(value)?.textValue;

  const defaultChildren = (
    <span data-placeholder={isPlaceholder} {...props}>
      {displayedValue}
    </span>
  );

  if (typeof children === "function") {
    return children({ value, defaultChildren: defaultChildren });
  }

  return defaultChildren;
};

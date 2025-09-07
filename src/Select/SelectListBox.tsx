import { type ComponentProps, Children, isValidElement } from "react";
import { useSelectContext } from "./SelectContext";

export const SelectListBox = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  const { open } = useSelectContext();

  if (!open) return null;

  const optionsChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === SelectItem
  );

  return <div {...props}>{children}</div>;
};

export const SelectItem = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};

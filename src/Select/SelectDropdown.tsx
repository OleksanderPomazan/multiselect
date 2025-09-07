import mergeRefs from "merge-refs";
import type { ComponentProps, Ref } from "react";
import { usePopper } from "react-popper";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";

export const SelectDropdown = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  const { dropdownEl, triggerEl, open, setDropdownEl } = useSelectContext();

  const {
    styles,
    attributes: { popper: popperAttributes = {} },
  } = usePopper(triggerEl, dropdownEl);

  if (!open) return null;

  return (
    <div
      {...mergeProps(
        props,
        { style: styles.popper },
        popperAttributes as ComponentProps<"div">
      )}
      ref={mergeRefs(setDropdownEl, props.ref) as Ref<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

import mergeRefs from "merge-refs";
import type { ComponentProps, Ref } from "react";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";

export const SelectTrigger = (props: ComponentProps<"button">) => {
  const { open, setOpen, setTriggerEl } = useSelectContext();

  return (
    <button
      ref={mergeRefs(setTriggerEl, props.ref) as Ref<HTMLButtonElement>}
      {...mergeProps(
        {
          onClick: () => {
            setOpen(!open);
          },
          type: "button",
        } as const,
        props
      )}
    >
      {props.children}
    </button>
  );
};

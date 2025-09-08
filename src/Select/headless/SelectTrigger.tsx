import mergeRefs from "merge-refs";
import type { ComponentProps, Ref } from "react";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";
import { type PointerEvent } from "react";
import { useIdFor } from "./ids";
import { type KeyboardEvent } from "react";

export const SelectTrigger = (props: ComponentProps<"button">) => {
  const { open, setOpen, setTriggerEl, value, onSelect, multiple } =
    useSelectContext();
  const triggerId = useIdFor("trigger");
  const labelId = useIdFor("label");

  return (
    <button
      ref={mergeRefs(setTriggerEl, props.ref) as Ref<HTMLButtonElement>}
      {...mergeProps(
        {
          id: triggerId,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-labelledby": labelId,
          onClick: () => {
            if (!open) {
              setOpen(true);
            }
          },
          onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
            e.preventDefault();
          },
          onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
            if (multiple && e.key === "Backspace") {
              e.preventDefault();
              onSelect((value ?? []).slice(0, -1));
            }
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

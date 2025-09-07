import mergeRefs from "merge-refs";
import { useEffect, useRef, type ComponentProps, type Ref } from "react";
import { usePopper } from "react-popper";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";
import { useEventCallback } from "usehooks-ts";

function useOnClickOutside(
  element: HTMLElement | null,
  callback: (e: PointerEvent) => void
) {
  const ref = useRef<HTMLDivElement>(null);

  const handler = useEventCallback(callback);

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (!element?.contains(event.target as Node)) {
        handler(event);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [ref]);
}

export const SelectDropdown = ({
  children,
  ...props
}: ComponentProps<"div">) => {
  const { dropdownEl, triggerEl, open, setOpen, setDropdownEl } =
    useSelectContext();

  const {
    styles,
    attributes: { popper: popperAttributes = {} },
  } = usePopper(triggerEl, dropdownEl);

  useOnClickOutside(dropdownEl, () => setOpen(false));

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

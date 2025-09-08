import mergeRefs from "merge-refs";
import { useEffect, type ComponentProps, type Ref } from "react";
import { usePopper } from "react-popper";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";
import { useEventCallback } from "usehooks-ts";
import { useFocusWithin } from "ahooks";
import { cn } from "../cn";

function useOnClickOutside(
  element: HTMLElement | null,
  callback: (e: PointerEvent) => void
) {
  const handler = useEventCallback((event: PointerEvent) => {
    if (!element?.contains(event.target as Node)) {
      callback(event);
    }
  });

  useEffect(() => {
    document.addEventListener("pointerdown", handler);
    return () => {
      document.removeEventListener("pointerdown", handler);
    };
  }, [handler]);
}

export const SelectDropdown = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { dropdownEl, triggerEl, open, setOpen, setDropdownEl } =
    useSelectContext();

  const {
    styles,
    attributes: { popper: popperAttributes = {} },
  } = usePopper(triggerEl, dropdownEl);

  useOnClickOutside(dropdownEl, () => setOpen(false));

  const isDropdownFocused = useFocusWithin(dropdownEl, {
    onBlur: () => setOpen(false),
  });

  const keyboardHandler = useEventCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (isDropdownFocused) {
      document.addEventListener("keydown", keyboardHandler);
      return () => {
        document.removeEventListener("keydown", keyboardHandler);
      };
    }
  });

  if (!open) return null;

  return (
    <div
      {...mergeProps(
        { className: cn("outline-none z-[99999]", className) },
        props,
        { style: styles.popper },
        popperAttributes as ComponentProps<"div">,
        { tabIndex: 0 }
      )}
      ref={mergeRefs(setDropdownEl, props.ref) as Ref<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

import {
  type ComponentProps,
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";
import { cn } from "../cn";
import { useFocusWithin } from "ahooks";
import { useEventCallback } from "usehooks-ts";

const modN = (n: number, d: number) => {
  return ((n % d) + d) % d;
};

const ListBoxContext = createContext<{
  focusedKey: string | null;
  setFocusedKey: (key: string | null) => void;
  toggleItem: (id: string) => void;
  isSelected: (id: string) => boolean;
} | null>(null);

export const useListBoxContext = () => {
  const context = useContext(ListBoxContext);
  if (!context) {
    throw new Error("useListBoxContext must be used within a ListBox");
  }
  return context;
};

type SelectListBoxProps = ComponentProps<"div">;

export const SelectListBox = ({ children, ...props }: SelectListBoxProps) => {
  const { open, onSelect, multiple, value, dropdownEl, options } =
    useSelectContext();

  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  if (!open) return null;

  const isSelected = (id: string) => {
    if (multiple) {
      return value?.includes(id) ?? false;
    } else {
      return value === id;
    }
  };

  const toggleItem = (id: string) => {
    if (multiple) {
      if (value?.includes(id)) {
        onSelect(value.filter((v) => v !== id));
      } else {
        onSelect([...(value ?? []), id]);
      }
    } else {
      if (value === id) {
        onSelect(null);
      } else {
        onSelect(id);
      }
    }
  };

  const isDropdownFocused = useFocusWithin(dropdownEl);

  const optionsOrder = Array.from(options.keys());

  const keyboardNavigationHandler = useEventCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      const currentKeyIdx = optionsOrder.indexOf(focusedKey ?? "");
      const nextKeyIdx = modN(currentKeyIdx + 1, optionsOrder.length);
      setFocusedKey(optionsOrder[nextKeyIdx]);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const currentKeyIdx = optionsOrder.indexOf(focusedKey ?? "");
      const previousKeyIdx = modN(currentKeyIdx - 1, optionsOrder.length);
      setFocusedKey(optionsOrder[previousKeyIdx]);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      if (focusedKey) {
        toggleItem(focusedKey);
      }
      return;
    }
  });

  useEffect(() => {
    if (isDropdownFocused) {
      document.addEventListener("keydown", keyboardNavigationHandler);
      return () => {
        document.removeEventListener("keydown", keyboardNavigationHandler);
      };
    }
  }, [isDropdownFocused, keyboardNavigationHandler]);

  return (
    <ListBoxContext.Provider
      value={{ focusedKey, setFocusedKey, toggleItem, isSelected }}
    >
      <div {...props}>{children}</div>
    </ListBoxContext.Provider>
  );
};
/**
 * Recursively searches through a React children tree to find a SelectListBox component.
 * Performs a breadth-first traversal of all nested children until it finds the first
 * SelectListBox component.
 */
export const findListBox = (
  children: React.ReactNode
): React.ReactElement<SelectListBoxProps> | null => {
  if (!children) return null;

  const queue = [children];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const childrenArray = Children.toArray(current);

    for (const child of childrenArray) {
      if (isValidElement<{ children?: React.ReactNode }>(child)) {
        if (child.type === SelectListBox) {
          return child as React.ReactElement<SelectListBoxProps>;
        }
        if (child.props.children) {
          queue.push(child.props.children);
        }
      }
    }
  }

  return null;
};

export const extractListBoxOptions = (children: React.ReactNode) => {
  if (!children) return [];

  return Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === SelectItem
  ) as React.ReactElement<SelectItemProps>[];
};

export type SelectItemProps = ComponentProps<"div"> & {
  id: string;
  textValue?: string;
};

export const SelectItem = ({
  children,
  className,
  ...props
}: SelectItemProps) => {
  const { focusedKey, setFocusedKey, toggleItem, isSelected, options } =
    useListBoxContext();

  const isFocused = focusedKey === props.id;

  return (
    <div
      {...mergeProps(
        {
          "data-focused": isFocused,
          "data-selected": isSelected(props.id),
          onMouseOver: () => setFocusedKey(props.id),
          onClick: () => toggleItem(props.id),
          className: cn("cursor-default", className),
        },
        props
      )}
    >
      {children}
    </div>
  );
};

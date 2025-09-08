import {
  type ComponentProps,
  Children,
  createContext,
  Fragment,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelectContext } from "./SelectContext";
import mergeProps from "merge-props";
import { cn } from "../../cn";
import { useFocusWithin } from "ahooks";
import { useEventCallback } from "usehooks-ts";
import { useSelectSearchContext } from "./SelectSearch";
import { useIdFor } from "./ids";

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
  const { onSelect, multiple, value, dropdownEl, options, setOpen } =
    useSelectContext();

  const [focusedKey, setFocusedKey] = useState<string | null>(null);

  const { search } = useSelectSearchContext();

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

      // Close dropdown after select for single selection
      setOpen(false);
    }
  };

  const isDropdownFocused = useFocusWithin(dropdownEl);

  const filteredOptions = Array.from(options.values())
    .filter((option) =>
      option.textValue.toLowerCase().includes(search.toLowerCase())
    )
    .map((option) => option.id);

  const filteredChildren = Children.toArray(children).filter((child) => {
    if (isValidElement<SelectItemProps>(child) && child.type === SelectItem) {
      return filteredOptions.includes(child.props.id);
    }
    return true;
  });

  const optionsOrder = Array.from(filteredOptions);

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
      if (focusedKey && filteredOptions.includes(focusedKey)) {
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

  const listboxId = useIdFor("listbox");
  const labelId = useIdFor("label");

  return (
    <ListBoxContext.Provider
      value={{ focusedKey, setFocusedKey, toggleItem, isSelected }}
    >
      <div
        {...mergeProps(
          {
            id: listboxId,
            "aria-labelledby": labelId,
            role: "listbox",
            "aria-activedescendant": focusedKey ?? undefined,
          },
          props
        )}
      >
        {filteredChildren}
      </div>
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

export type SelectItemProps = Omit<ComponentProps<"div">, "children"> & {
  id: string;
  textValue?: string;
  children:
    | React.ReactNode
    | ((props: SelectItemRenderProps) => React.ReactNode);
};

type SelectItemRenderProps = {
  textValue: string;
  isFocused: boolean;
  isSelected: boolean;
};

export const SelectItem = ({
  children,
  className,
  textValue: textValueProp,
  ...props
}: SelectItemProps) => {
  const { focusedKey, setFocusedKey, toggleItem, isSelected } =
    useListBoxContext();

  const isFocused = focusedKey === props.id;

  const textValue =
    typeof children === "string" ? children : textValueProp ?? "";

  return (
    <div
      {...mergeProps(
        {
          role: "option",
          "aria-selected": isSelected(props.id),
          "data-focused": isFocused,
          "data-selected": isSelected(props.id),
          onMouseOver: () => setFocusedKey(props.id),
          onClick: () => toggleItem(props.id),
          className: cn("cursor-default", className),
        },
        props
      )}
    >
      {typeof children === "function"
        ? children({
            textValue,
            isFocused,
            isSelected: isSelected(props.id),
          })
        : children}
    </div>
  );
};

export const SearchMatchText = ({
  text,
  renderMatch = (match: string) => <span>{match}</span>,
}: {
  text: string;
  renderMatch: (match: string) => React.ReactNode;
}) => {
  const { search } = useSelectSearchContext();

  // If no search term, return the text as-is
  if (!search.trim()) {
    return <>{text}</>;
  }

  // Create a case-insensitive regex to find all matches
  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );

  // Split the text by the search term, keeping the separators (matches)
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches the search term (case-insensitive)
        const isMatch = part.toLowerCase() === search.toLowerCase();

        return isMatch ? (
          <Fragment key={index}>{renderMatch(part)}</Fragment>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </>
  );
};

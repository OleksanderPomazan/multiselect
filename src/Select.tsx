import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
  type ComponentProps,
  type Ref,
} from "react";
import mergeRefs from "merge-refs";
import mergeProps from "merge-props";
import { usePopper } from "react-popper";

type MultipleSelection = {
  onSelect: (value: string[] | null) => void;
  value: string[] | null;
};

type SingleSelection = {
  onSelect: (value: string | null) => void;
  value: string | null;
};

type SelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  multiple: boolean;
  triggerEl: HTMLElement | null;
  setTriggerEl: (el: HTMLElement | null) => void;
  dropdownEl: HTMLElement | null;
  setDropdownEl: (el: HTMLElement | null) => void;
} & (MultipleSelection | SingleSelection);

const SelectContext = createContext<SelectContextType | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectState must be used within a Select");
  }
  return context;
};

type SelectProps<Multiple extends boolean = false> = {
  children: React.ReactNode;
  multiple?: Multiple;
} & (Multiple extends true ? MultipleSelection : SingleSelection);

const Select = <Multiple extends boolean = false>(
  props: SelectProps<Multiple>
) => {
  const { children, onSelect, multiple = false, value } = props;

  const [open, setOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [dropdownEl, setDropdownEl] = useState<HTMLElement | null>(null);

  const selectionProps = { onSelect, value } as Multiple extends true
    ? MultipleSelection
    : SingleSelection;

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        multiple,
        triggerEl,
        setTriggerEl,
        dropdownEl,
        setDropdownEl,
        ...selectionProps,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

const SelectTrigger = (props: ComponentProps<"button">) => {
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
        },
        props
      )}
    >
      {props.children}
    </button>
  );
};

const SelectValue = (props: ComponentProps<"span">) => {
  const { value } = useSelectContext();

  const displayedValue = Array.isArray(value) ? value.join(", ") : value;

  return <span {...props}>{displayedValue}</span>;
};

const SelectDropdown = ({ children, ...props }: ComponentProps<"div">) => {
  const { dropdownEl, triggerEl, open, setDropdownEl } = useSelectContext();

  const { styles, attributes } = usePopper(triggerEl, dropdownEl);

  if (!open) return null;

  return (
    <div
      {...mergeProps(props, { style: styles.popper }, attributes.popper)}
      ref={mergeRefs(setDropdownEl, props.ref) as Ref<HTMLDivElement>}
    >
      {children}
    </div>
  );
};

const SelectListBox = ({ children, ...props }: ComponentProps<"div">) => {
  const { open } = useSelectContext();

  if (!open) return null;

  const optionsChildren = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === SelectItem
  );

  return <div {...props}>{children}</div>;
};

const SelectItem = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};

export const SelectDemo = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select onSelect={setValue} value={value}>
      <SelectTrigger className="border border-gray-300 rounded-md p-2">
        Demo
        <SelectValue />
      </SelectTrigger>
      <SelectDropdown className="bg-white rounded-md p-2 border border-gray-300 shadow-md">
        <SelectListBox>
          <SelectItem>Option 1</SelectItem>
          <SelectItem>Option 2</SelectItem>
          <SelectItem>Option 3</SelectItem>
        </SelectListBox>
      </SelectDropdown>
    </Select>
  );
};

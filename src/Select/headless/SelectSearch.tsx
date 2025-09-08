import mergeRefs from "merge-refs";
import {
  createContext,
  useContext,
  useEffect,
  type ComponentProps,
} from "react";

export const SelectSearchContext = createContext<{
  search: string;
  setSearch: (search: string) => void;
  setSearchRef: (ref: HTMLInputElement | null) => void;
} | null>(null);
import mergeProps from "merge-props";

export const useSelectSearchContext = () => {
  const context = useContext(SelectSearchContext);
  if (!context) {
    throw new Error(
      "useSelectSearchContext must be used within a SelectSearch"
    );
  }
  return context;
};

type SelectSearchRenderProps = {
  search: string;
  setSearch: (search: string) => void;
  inputProps: ComponentProps<"input">;
};

type SelectSearchProps = Omit<ComponentProps<"input">, "children"> & {
  children?:
    | React.ReactNode
    | ((props: SelectSearchRenderProps) => React.ReactNode);
};

export const SelectSearch = ({ children, ...props }: SelectSearchProps) => {
  const { search, setSearch, setSearchRef } = useSelectSearchContext();

  useEffect(() => {
    return () => setSearch("");
  }, [setSearch]);

  const inputProps = mergeProps(
    {
      ref: mergeRefs(props.ref, setSearchRef),
      type: "text",
      value: search,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value),
    },
    props
  );

  const defaultChildren = <input {...inputProps} />;

  return typeof children === "function"
    ? children({
        search,
        setSearch,
        inputProps,
      })
    : defaultChildren;
};

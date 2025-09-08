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

export const useSelectSearchContext = () => {
  const context = useContext(SelectSearchContext);
  if (!context) {
    throw new Error(
      "useSelectSearchContext must be used within a SelectSearch"
    );
  }
  return context;
};

export const SelectSearch = (props: ComponentProps<"input">) => {
  const { search, setSearch, setSearchRef } = useSelectSearchContext();

  useEffect(() => {
    return () => setSearch("");
  }, [setSearch]);

  return (
    <input
      ref={mergeRefs(props.ref, setSearchRef)}
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      {...props}
    />
  );
};

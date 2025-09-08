import { SelectDropdown as HeadlessSelectDropdown } from "./headless/SelectDropdown";
import {
  SearchMatchText,
  SelectItem,
  SelectListBox,
} from "./headless/SelectListBox";
import { SelectTrigger as HeadlessSelectTrigger } from "./headless/SelectTrigger";
import { SelectValue as HeadlessSelectValue } from "./headless/SelectValue";
import { Select } from "./headless/Select";
import { SelectSearch as HeadlessSelectSearch } from "./headless/SelectSearch";
import { cn } from "../cn";
import { ChipItem } from "./ChipItem";
import { Search, XCircle } from "lucide-react";
import type { ComponentProps } from "react";

export { SelectListBox, SelectItem, SearchMatchText, Select };

export const SelectValue = ({
  onRemove,
}: {
  onRemove?: (value: string) => void;
}) => {
  return (
    <HeadlessSelectValue>
      {({ value, defaultChildren, textValue }) => {
        if (
          value === null ||
          typeof value === "string" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return defaultChildren;
        }

        if (textValue === null || !Array.isArray(textValue)) {
          return defaultChildren;
        }

        return (
          <ul className="flex flex-wrap items-center gap-2">
            {value.map((val, i) => (
              <li key={val}>
                <ChipItem onRemove={() => onRemove?.(val)}>
                  {textValue[i]}
                </ChipItem>
              </li>
            ))}
          </ul>
        );
      }}
    </HeadlessSelectValue>
  );
};

export const SelectTrigger = ({
  children,
  className,
  ...props
}: ComponentProps<typeof HeadlessSelectTrigger>) => (
  <HeadlessSelectTrigger
    {...props}
    className={cn(
      "border border-gray-300 rounded-md p-2 min-w-2xs text-start",
      className
    )}
  >
    {children}
  </HeadlessSelectTrigger>
);

export const SelectSearch = () => {
  return (
    <HeadlessSelectSearch>
      {({ search, setSearch, inputProps }) => (
        <div className="px-2 mx-2 flex items-center text-gray-800 justify-between  border-b-2 gap-2 border-b-green-200 focus-within:border-b-green-400">
          <Search className="size-4 shrink-0" />
          <input
            {...inputProps}
            className={cn(
              inputProps.className,
              "px-2 w-full  outline-none mb-2  "
            )}
          />

          {search && (
            <button
              type="button"
              className="shrink-0 text-gray-400"
              onClick={() => setSearch("")}
            >
              <span className="sr-only">Clear</span>
              <XCircle className="size-4" />
            </button>
          )}
        </div>
      )}
    </HeadlessSelectSearch>
  );
};

export const SelectDropdown = ({ children }: { children: React.ReactNode }) => (
  <HeadlessSelectDropdown className="w-[var(--trigger-width)] bg-white rounded-md py-2 border border-gray-300 shadow-md">
    {children}
  </HeadlessSelectDropdown>
);

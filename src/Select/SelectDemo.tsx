import { useState } from "react";
import { SelectDropdown } from "./SelectDropdown";
import { SearchMatchText, SelectItem, SelectListBox } from "./SelectListBox";
import { SelectTrigger } from "./SelectTrigger";
import { SelectValue } from "./SelectValue";
import { Select } from "./Select";
import { SelectSearch } from "./SelectSearch";
import { cn } from "../cn";

const options = [
  { id: "option-1", text: "Option 1" },
  { id: "option-2", text: "Option 2" },
  { id: "option-3", text: "Option 3" },
];

export const SelectDemo = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select onSelect={setValue} value={value} placeholder="Select an option">
      <SelectTrigger className="border border-gray-300 rounded-md p-2 min-w-2xs text-start">
        <SelectValue />
      </SelectTrigger>

      <SelectDropdown className="w-[var(--trigger-width)] bg-white rounded-md py-2 border border-gray-300 shadow-md">
        <SelectSearch>
          {({ search, setSearch, inputProps }) => (
            <div className="px-2 mx-2 flex items-center justify-between  border-b-2 gap-2 border-b-green-200 focus-within:border-b-green-400">
              <input
                {...inputProps}
                className={cn(
                  inputProps.className,
                  "px-2 w-full  outline-none mb-2  "
                )}
              />

              {search && (
                <button type="button" onClick={() => setSearch("")}>
                  Clear
                </button>
              )}
            </div>
          )}
        </SelectSearch>

        <SelectListBox>
          {options.map((option) => (
            <SelectItem
              key={option.id}
              id={option.id}
              textValue={option.text}
              className="px-2 data-[selected=true]:bg-green-200 data-[focused=true]:bg-gray-200"
            >
              {({ textValue }) => (
                <SearchMatchText
                  text={textValue}
                  renderMatch={(match) => (
                    <span className="bg-green-500">{match}</span>
                  )}
                />
              )}
            </SelectItem>
          ))}
        </SelectListBox>
      </SelectDropdown>
    </Select>
  );
};

export const SelectDemoMultiple = () => {
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <Select
      onSelect={setValue}
      value={value}
      multiple
      placeholder="Select an option"
    >
      <SelectTrigger className="border border-gray-300 rounded-md p-2">
        <SelectValue />
      </SelectTrigger>

      <SelectDropdown className="bg-white rounded-md py-2 border border-gray-300 shadow-md">
        <SelectSearch>
          {({ search, setSearch, defaultChildren }) => (
            <div>
              {defaultChildren}

              {search && (
                <button type="button" onClick={() => setSearch("")}>
                  Clear
                </button>
              )}
            </div>
          )}
        </SelectSearch>
        <SelectListBox>
          <SelectItem
            id="option-1"
            textValue="Option 1"
            className="px-2 data-[selected=true]:bg-green-200 data-[focused=true]:bg-gray-200"
          >
            {({ textValue }) => (
              <SearchMatchText
                text={textValue}
                renderMatch={(match) => (
                  <span className="bg-green-500">{match}</span>
                )}
              />
            )}
          </SelectItem>
          <SelectItem
            id="option-2"
            textValue="Option 2"
            className="px-2 data-[selected=true]:bg-green-200 data-[focused=true]:bg-gray-200"
          >
            {({ textValue }) => (
              <SearchMatchText
                text={textValue}
                renderMatch={(match) => (
                  <span className="bg-green-500">{match}</span>
                )}
              />
            )}
          </SelectItem>
          <SelectItem
            id="option-3"
            textValue="Option 3"
            className="px-2 data-[selected=true]:bg-green-200 data-[focused=true]:bg-gray-200"
          >
            {({ textValue }) => (
              <SearchMatchText
                text={textValue}
                renderMatch={(match) => (
                  <span className="bg-green-500">{match}</span>
                )}
              />
            )}
          </SelectItem>
        </SelectListBox>
      </SelectDropdown>
    </Select>
  );
};

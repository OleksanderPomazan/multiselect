import { useState } from "react";
import { SelectDropdown } from "./SelectDropdown";
import { SearchMatchText, SelectItem, SelectListBox } from "./SelectListBox";
import { SelectTrigger } from "./SelectTrigger";
import { SelectValue } from "./SelectValue";
import { Select } from "./Select";
import { SelectSearch } from "./SelectSearch";

export const SelectDemo = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select onSelect={setValue} value={value} placeholder="Select an option">
      <SelectTrigger className="border border-gray-300 rounded-md p-2 min-w-2xs text-start">
        <SelectValue />
      </SelectTrigger>

      <SelectDropdown className="w-[var(--trigger-width)] bg-white rounded-md py-2 border border-gray-300 shadow-md">
        <div className="px-2">
          <SelectSearch className=" px-2 w-full box-border mb-2" />
        </div>

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
        <SelectSearch />
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

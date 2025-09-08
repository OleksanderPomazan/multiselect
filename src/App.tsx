import { useState } from "react";

import {
  SelectTrigger,
  SelectValue,
  SelectListBox,
  SelectItem,
  SearchMatchText,
  SelectDropdown,
  SelectSearch,
  Select,
} from "./Select/Select";

const options = [
  { id: "option-1", text: "Option 1" },
  { id: "option-2", text: "Option 2" },
  { id: "option-3", text: "Option 3" },
];

const MultiselectDemo = () => {
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <Select
      onSelect={setValue}
      multiple
      value={value}
      placeholder="Select an option"
    >
      <SelectTrigger>
        <SelectValue
          onRemove={(val) =>
            Array.isArray(value) && setValue(value.filter((v) => v !== val))
          }
        />
      </SelectTrigger>

      <SelectDropdown>
        <SelectSearch />

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

export const App = () => {
  return (
    <div>
      <MultiselectDemo />
    </div>
  );
};

export default App;

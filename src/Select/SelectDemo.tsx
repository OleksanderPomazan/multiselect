import { useState } from "react";
import { SelectDropdown } from "./SelectDropdown";
import { SelectItem, SelectListBox } from "./SelectListBox";
import { SelectTrigger } from "./SelectTrigger";
import { SelectValue } from "./SelectValue";
import { Select } from "./Select";

export const SelectDemo = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select onSelect={setValue} value={value} placeholder="Select an option">
      <SelectTrigger className="border border-gray-300 rounded-md p-2">
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

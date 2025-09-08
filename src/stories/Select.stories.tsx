import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { expect, within, userEvent } from "storybook/test";
import {
  SelectTrigger,
  SelectValue,
  SelectListBox,
  SelectItem,
  SearchMatchText,
  SelectDropdown,
  SelectSearch,
  Select,
} from "../Select/Select";
import { createPortal } from "react-dom";

const meta = {
  title: "Select",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SimpleSelect: Story = {
  name: "Simple Select",
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const options = [
      { id: "aardvark", text: "Aardvark" },
      { id: "cat", text: "Cat" },
      { id: "dog", text: "Dog" },
      { id: "kangaroo", text: "Kangaroo" },
      { id: "panda", text: "Panda" },
      { id: "snake", text: "Snake" },
    ];

    return (
      <Select onSelect={setValue} value={value} placeholder="Select an option">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectDropdown>
          <SelectListBox>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                id={option.id}
                className="px-4 py-2 data-[selected=true]:bg-green-100 data-[focused=true]:bg-green-100"
              >
                {option.text}
              </SelectItem>
            ))}
          </SelectListBox>
        </SelectDropdown>
      </Select>
    );
  },
};

export const WithSearch: Story = {
  name: "With search",
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const options = [
      { id: "aardvark", text: "Aardvark" },
      { id: "cat", text: "Cat" },
      { id: "dog", text: "Dog" },
      { id: "kangaroo", text: "Kangaroo" },
      { id: "panda", text: "Panda" },
      { id: "snake", text: "Snake" },
    ];

    return (
      <Select onSelect={setValue} value={value} placeholder="Select an option">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectDropdown>
          <SelectSearch />

          <SelectListBox>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                id={option.id}
                textValue={option.text}
                className="px-4 py-2 data-[selected=true]:bg-green-100 data-[focused=true]:bg-green-100"
              >
                {({ textValue }) => (
                  <SearchMatchText
                    text={textValue}
                    renderMatch={(match) => (
                      <span className="bg-green-300 rounded-sm">{match}</span>
                    )}
                  />
                )}
              </SelectItem>
            ))}
          </SelectListBox>
        </SelectDropdown>
      </Select>
    );
  },
};

export const WithPortal: Story = {
  name: "With react portal",
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const options = [
      { id: "aardvark", text: "Aardvark" },
      { id: "cat", text: "Cat" },
      { id: "dog", text: "Dog" },
      { id: "kangaroo", text: "Kangaroo" },
      { id: "panda", text: "Panda" },
      { id: "snake", text: "Snake" },
    ];

    return (
      <Select onSelect={setValue} value={value} placeholder="Select an option">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        {createPortal(
          <SelectDropdown>
            <SelectSearch />

            <SelectListBox>
              {options.map((option) => (
                <SelectItem
                  key={option.id}
                  id={option.id}
                  textValue={option.text}
                  className="px-4 py-2 data-[selected=true]:bg-green-100 data-[focused=true]:bg-green-100"
                >
                  {({ textValue }) => (
                    <SearchMatchText
                      text={textValue}
                      renderMatch={(match) => (
                        <span className="bg-green-300 rounded-sm">{match}</span>
                      )}
                    />
                  )}
                </SelectItem>
              ))}
            </SelectListBox>
          </SelectDropdown>,
          document.body
        )}
      </Select>
    );
  },
};

export const WithMultipleSelection: Story = {
  name: "With multiple selection",
  render: () => {
    const [value, setValue] = useState<string[] | null>(null);

    const options = [
      { id: "aardvark", text: "Aardvark" },
      { id: "cat", text: "Cat" },
      { id: "dog", text: "Dog" },
      { id: "kangaroo", text: "Kangaroo" },
      { id: "panda", text: "Panda" },
      { id: "snake", text: "Snake" },
    ];

    return (
      <Select
        onSelect={setValue}
        multiple
        value={value}
        placeholder="Select an option"
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectDropdown>
          <SelectSearch />

          <SelectListBox>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                id={option.id}
                textValue={option.text}
                className="px-4 py-2 data-[selected=true]:bg-green-100 data-[focused=true]:bg-green-100"
              >
                {({ textValue }) => (
                  <SearchMatchText
                    text={textValue}
                    renderMatch={(match) => (
                      <span className="bg-green-300 rounded-sm">{match}</span>
                    )}
                  />
                )}
              </SelectItem>
            ))}
          </SelectListBox>
        </SelectDropdown>
      </Select>
    );
  },
};

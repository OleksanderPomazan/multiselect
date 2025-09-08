import type { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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

const Portal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
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

        <Portal>
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
        </Portal>
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

// Test Stories for Basic Selection Behaviors
export const BasicSelectionBehaviors: Story = {
  name: "Test: Basic Selection Behaviors",
  render: () => {
    const [singleValue, setSingleValue] = useState<string | null>(null);
    const [multipleValue, setMultipleValue] = useState<string[] | null>(null);

    const options = [
      { id: "cat", text: "Cat" },
      { id: "dog", text: "Dog" },
      { id: "bird", text: "Bird" },
    ];

    return (
      <div className="space-y-8">
        <div data-testid="single-select-container">
          <h3 className="text-lg font-medium mb-2">Single Selection</h3>
          <Select
            onSelect={setSingleValue}
            value={singleValue}
            placeholder="Select an animal"
            data-testid="single-select"
          >
            <SelectTrigger data-testid="single-trigger">
              <SelectValue />
            </SelectTrigger>

            <SelectDropdown>
              <SelectListBox data-testid="single-listbox">
                {options.map((option) => (
                  <SelectItem
                    key={option.id}
                    id={option.id}
                    data-testid={`single-option-${option.id}`}
                    className="px-4 py-2 data-[selected=true]:bg-blue-100 data-[focused=true]:bg-gray-100"
                  >
                    {option.text}
                  </SelectItem>
                ))}
              </SelectListBox>
            </SelectDropdown>
          </Select>
          <p
            className="mt-2 text-sm text-gray-600"
            data-testid="single-selection-display"
          >
            Single Selected: {singleValue || "None"}
          </p>
        </div>

        <div data-testid="multiple-select-container">
          <h3 className="text-lg font-medium mb-2">Multiple Selection</h3>
          <Select
            onSelect={setMultipleValue}
            multiple
            value={multipleValue}
            placeholder="Select animals"
            data-testid="multiple-select"
          >
            <SelectTrigger data-testid="multiple-trigger">
              <SelectValue
                onRemove={(value) => {
                  setMultipleValue(
                    (prev) => prev?.filter((v) => v !== value) || null
                  );
                }}
              />
            </SelectTrigger>

            <SelectDropdown>
              <SelectListBox data-testid="multiple-listbox">
                {options.map((option) => (
                  <SelectItem
                    key={option.id}
                    id={option.id}
                    data-testid={`multiple-option-${option.id}`}
                    className="px-4 py-2 data-[selected=true]:bg-blue-100 data-[focused=true]:bg-gray-100"
                  >
                    {option.text}
                  </SelectItem>
                ))}
              </SelectListBox>
            </SelectDropdown>
          </Select>
          <p
            className="mt-2 text-sm text-gray-600"
            data-testid="multiple-selection-display"
          >
            Multiple Selected: {multipleValue?.join(", ") || "None"}
          </p>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Single Selection: Click to select one option
    const singleTrigger = canvas.getByTestId("single-trigger");
    await userEvent.click(singleTrigger);

    // Wait for dropdown to open
    await expect(canvas.getByTestId("single-listbox")).toBeInTheDocument();

    // Select "Cat"
    const catOption = canvas.getByTestId("single-option-cat");
    await userEvent.click(catOption);

    // Verify selection and dropdown closes
    await expect(
      canvas.getByTestId("single-selection-display")
    ).toHaveTextContent("Single Selected: cat");

    // Verify dropdown closed after single selection
    await expect(
      canvas.queryByTestId("single-listbox")
    ).not.toBeInTheDocument();

    // 2. Single Selection: Click trigger to reopen, then click same option to deselect
    await userEvent.click(singleTrigger);

    // Wait for dropdown to open
    await expect(canvas.getByTestId("single-listbox")).toBeInTheDocument();

    // Click the already selected "Cat" option to deselect it
    const catOptionAgain = canvas.getByTestId("single-option-cat");
    await userEvent.click(catOptionAgain);

    // Verify deselection
    await expect(
      canvas.getByTestId("single-selection-display")
    ).toHaveTextContent("Single Selected: None");

    // 3. Selection State Persistence: Select, close, reopen, verify still selected
    await userEvent.click(singleTrigger);
    await userEvent.click(canvas.getByTestId("single-option-dog"));

    // Close dropdown by clicking outside
    await userEvent.click(document.body);

    // Reopen and verify "Dog" is still selected
    await userEvent.click(singleTrigger);
    const dogOption = canvas.getByTestId("single-option-dog");
    await expect(dogOption).toHaveAttribute("data-selected", "true");

    // Close dropdown for next test
    await userEvent.click(document.body);

    // 4. Multiple Selection: Click to add multiple options
    const multipleTrigger = canvas.getByTestId("multiple-trigger");
    await userEvent.click(multipleTrigger);

    // Wait for dropdown to open
    await expect(canvas.getByTestId("multiple-listbox")).toBeInTheDocument();

    // Select "Cat"
    const multipleCatOption = canvas.getByTestId("multiple-option-cat");
    await userEvent.click(multipleCatOption);

    // Verify first selection (dropdown should stay open)
    await expect(
      canvas.getByTestId("multiple-selection-display")
    ).toHaveTextContent("Multiple Selected: cat");
    await expect(canvas.getByTestId("multiple-listbox")).toBeInTheDocument();

    // Select "Dog" (add to selection)
    const multipleDogOption = canvas.getByTestId("multiple-option-dog");
    await userEvent.click(multipleDogOption);

    // Verify multiple selection
    await expect(
      canvas.getByTestId("multiple-selection-display")
    ).toHaveTextContent("Multiple Selected: cat, dog");

    // 5. Multiple Selection: Click selected item to remove it
    await userEvent.click(multipleCatOption);

    // Verify "Cat" was removed
    await expect(
      canvas.getByTestId("multiple-selection-display")
    ).toHaveTextContent("Multiple Selected: dog");

    // 6. Selection State Persistence for multiple selection
    // Close dropdown
    await userEvent.click(document.body);

    // Reopen and verify "Dog" is still selected
    await userEvent.click(multipleTrigger);
    const reopenedDogOption = canvas.getByTestId("multiple-option-dog");
    await expect(reopenedDogOption).toHaveAttribute("data-selected", "true");

    // Add another selection to test persistence
    const multipleBirdOption = canvas.getByTestId("multiple-option-bird");
    await userEvent.click(multipleBirdOption);

    // Close and reopen to verify both are persisted
    await userEvent.click(document.body);
    await userEvent.click(multipleTrigger);

    await expect(canvas.getByTestId("multiple-option-dog")).toHaveAttribute(
      "data-selected",
      "true"
    );
    await expect(canvas.getByTestId("multiple-option-bird")).toHaveAttribute(
      "data-selected",
      "true"
    );
  },
};

export const InitialValueHandling: Story = {
  name: "Test: Initial Value Handling",
  render: () => {
    // Test pre-selected single value
    const [singleValue, setSingleValue] = useState<string | null>("dog");
    // Test pre-selected multiple values
    const [multipleValue, setMultipleValue] = useState<string[] | null>([
      "cat",
      "bird",
    ]);

    const options = [
      { id: "cat", text: "Cat" },
      { id: "dog", text: "Dog" },
      { id: "bird", text: "Bird" },
      { id: "fish", text: "Fish" },
    ];

    return (
      <div className="space-y-8">
        <div data-testid="initial-single-container">
          <h3 className="text-lg font-medium mb-2">
            Single Selection (Pre-selected: Dog)
          </h3>
          <Select
            onSelect={setSingleValue}
            value={singleValue}
            placeholder="Select an animal"
            data-testid="initial-single-select"
          >
            <SelectTrigger data-testid="initial-single-trigger">
              <SelectValue />
            </SelectTrigger>

            <SelectDropdown>
              <SelectListBox data-testid="initial-single-listbox">
                {options.map((option) => (
                  <SelectItem
                    key={option.id}
                    id={option.id}
                    data-testid={`initial-single-option-${option.id}`}
                    className="px-4 py-2 data-[selected=true]:bg-blue-100 data-[focused=true]:bg-gray-100"
                  >
                    {option.text}
                  </SelectItem>
                ))}
              </SelectListBox>
            </SelectDropdown>
          </Select>
        </div>

        <div data-testid="initial-multiple-container">
          <h3 className="text-lg font-medium mb-2">
            Multiple Selection (Pre-selected: Cat, Bird)
          </h3>
          <Select
            onSelect={setMultipleValue}
            multiple
            value={multipleValue}
            placeholder="Select animals"
            data-testid="initial-multiple-select"
          >
            <SelectTrigger data-testid="initial-multiple-trigger">
              <SelectValue
                onRemove={(value) => {
                  setMultipleValue(
                    (prev) => prev?.filter((v) => v !== value) || null
                  );
                }}
              />
            </SelectTrigger>

            <SelectDropdown>
              <SelectListBox data-testid="initial-multiple-listbox">
                {options.map((option) => (
                  <SelectItem
                    key={option.id}
                    id={option.id}
                    data-testid={`initial-multiple-option-${option.id}`}
                    className="px-4 py-2 data-[selected=true]:bg-blue-100 data-[focused=true]:bg-gray-100"
                  >
                    {option.text}
                  </SelectItem>
                ))}
              </SelectListBox>
            </SelectDropdown>
          </Select>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Verify single selection shows pre-selected value
    await expect(canvas.getByText("Dog")).toBeInTheDocument();

    // 2. Open dropdown and verify correct option is selected
    const singleTrigger = canvas.getByTestId("initial-single-trigger");
    await userEvent.click(singleTrigger);

    const dogOption = canvas.getByTestId("initial-single-option-dog");
    await expect(dogOption).toHaveAttribute("data-selected", "true");

    // Verify other options are not selected
    const catOption = canvas.getByTestId("initial-single-option-cat");
    await expect(catOption).toHaveAttribute("data-selected", "false");

    // Close dropdown
    await userEvent.click(document.body);

    // Test Multiple Selection Initial Value
    // 3. Verify multiple selection shows pre-selected chips
    const multipleTrigger = canvas.getByTestId("initial-multiple-trigger");

    // Should show chips for Cat and Bird
    await expect(canvas.getByText("Cat")).toBeInTheDocument();
    await expect(canvas.getByText("Bird")).toBeInTheDocument();

    // 4. Open dropdown and verify correct options are selected
    await userEvent.click(multipleTrigger);

    const multipleCatOption = canvas.getByTestId("initial-multiple-option-cat");
    const multipleBirdOption = canvas.getByTestId(
      "initial-multiple-option-bird"
    );
    const multipleFishOption = canvas.getByTestId(
      "initial-multiple-option-fish"
    );

    await expect(multipleCatOption).toHaveAttribute("data-selected", "true");
    await expect(multipleBirdOption).toHaveAttribute("data-selected", "true");
    await expect(multipleFishOption).toHaveAttribute("data-selected", "false");
  },
};

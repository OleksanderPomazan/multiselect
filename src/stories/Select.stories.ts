import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { expect, within, userEvent } from "storybook/test";

import { SelectDemo } from "../Select/SelectDemo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Select",
  component: SelectDemo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // SelectDemo doesn't take props, but we can document the internal Select component
  },
} satisfies Meta<typeof SelectDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Main story showcasing the SelectDemo component
export const Default: Story = {
  args: {},
};

// Story with interaction test
export const WithInteraction: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const triggerButton = canvas.getByRole("button");

    // Verify initial state
    await expect(triggerButton).toBeInTheDocument();
    await expect(triggerButton).toHaveTextContent("Demo");

    // Verify dropdown is initially closed (options should not be visible)
    await expect(canvas.queryByText("Option 1")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Option 2")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Option 3")).not.toBeInTheDocument();

    // Test clicking the trigger to open dropdown
    await userEvent.click(triggerButton);

    // Verify dropdown is now open (options should be visible)
    await expect(canvas.getByText("Option 1")).toBeInTheDocument();
    await expect(canvas.getByText("Option 2")).toBeInTheDocument();
    await expect(canvas.getByText("Option 3")).toBeInTheDocument();

    // Test clicking the trigger again to close dropdown
    await userEvent.click(triggerButton);

    // Verify dropdown is closed again (options should not be visible)
    await expect(canvas.queryByText("Option 1")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Option 2")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Option 3")).not.toBeInTheDocument();
  },
};

// Story for testing purposes
export const Playground: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for testing the Select component behavior.",
      },
    },
  },
};

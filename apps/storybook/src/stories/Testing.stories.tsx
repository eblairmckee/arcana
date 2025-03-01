import type { Meta, StoryObj } from "@storybook/react";
import { Testing, type TestingProps } from "@theblairwitch/arcana-ui";

const meta: Meta<TestingProps> = {
  title: "Components/Testing",
  component: Testing,
  tags: ["autodocs"],
  parameters: {},
  args: {
    name: "Testing"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Testing"
  }
};

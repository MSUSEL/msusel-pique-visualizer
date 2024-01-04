import type { Meta, StoryObj } from "@storybook/react";

import { TreeDisplayProto } from "./TreeDisplayProto";
import { ReactFlowProvider } from "reactflow";
// Import sample data
import sampleData from "../../assets/PIQUE_json_files/compact_output.json";

// We need to define some metadata for our story first.
// This is a required step, but typically you only need to
// set title and component. The other fields are optional.
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "TreeDisplayProto",
  component: TreeDisplayProto,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },

  // For the TreeDisplayProto component, we need to wrap the component
  // inside ReactFlowProvider, and also place it in a div with a fixed height and
  // width. You probably **don't** need to do this for your component.
  decorators: [
    (Story) => (
      <ReactFlowProvider>
        <div style={{ height: "100vh", width: "100vw" }}>
          <Story />
        </div>
      </ReactFlowProvider>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof TreeDisplayProto>;

// Boilerplate
export default meta;
type Story = StoryObj<typeof meta>;

// This is where we define our stories. We can have multiple stories for a component.
// For each story, simply set the arguments, typically this is where you pass in the sample data.
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    data: sampleData.factors,
  },
};

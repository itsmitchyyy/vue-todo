import TextInput from "./TextInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "atoms/TextInput",
  component: TextInput,
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => ({
  components: { TextInput },
  setup() {
    return { args };
  },
  template: '<TextInput v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = { type: "text" };

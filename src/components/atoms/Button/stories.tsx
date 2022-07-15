import BButton from "./BButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "atoms/Button",
  component: BButton,
} as Meta<typeof BButton>;

const Template: StoryFn<typeof BButton> = (args) => ({
  components: { BButton },
  setup() {
    return { args };
  },
  template: '<BButton v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = { label: "Button" };

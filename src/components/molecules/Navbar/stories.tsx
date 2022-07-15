import Navbar from "./Navbar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "molecules/Navbar",
  component: Navbar,
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) => ({
  components: { Navbar },
  setup() {
    return { args };
  },
  template: '<Navbar v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

import Register from "./Register.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/Register",
  component: Register,
} as Meta<typeof Register>;

const Template: StoryFn<typeof Register> = (args) => ({
  components: { Register },
  setup() {
    return { args };
  },
  template: '<Register v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

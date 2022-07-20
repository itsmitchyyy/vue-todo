import Login from "./Login.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/Login",
  component: Login,
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = (args) => ({
  components: { Login },
  setup() {
    return { args };
  },
  template: '<Login v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

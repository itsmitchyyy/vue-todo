import LoginForm from "./LoginForm.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "organisms/LoginForm",
  component: LoginForm,
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => ({
  components: { LoginForm },
  setup() {
    return { args };
  },
  template: '<LoginForm v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

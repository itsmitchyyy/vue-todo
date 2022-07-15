import RegisterForm from "./RegisterForm.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "organisms/RegisterForm",
  component: RegisterForm,
} as Meta<typeof RegisterForm>;

const Template: StoryFn<typeof RegisterForm> = (args) => ({
  components: { RegisterForm },
  setup() {
    return { args };
  },
  template: '<RegisterForm v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

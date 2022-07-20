import AddProject from "./AddProject.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/AddProject",
  component: AddProject,
} as Meta<typeof AddProject>;

const Template: StoryFn<typeof AddProject> = (args) => ({
  components: { AddProject },
  setup() {
    return { args };
  },
  template: '<AddProject v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

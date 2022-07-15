import ProjectForm from "./ProjectForm.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "organisms/ProjectForm",
  component: ProjectForm,
} as Meta<typeof ProjectForm>;

const Template: StoryFn<typeof ProjectForm> = (args) => ({
  components: { ProjectForm },
  setup() {
    return { args };
  },
  template: '<ProjectForm v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

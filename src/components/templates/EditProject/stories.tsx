import EditProject from "./EditProject.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/EditProject",
  component: EditProject,
} as Meta<typeof EditProject>;

const Template: StoryFn<typeof EditProject> = (args) => ({
  components: { EditProject },
  setup() {
    return { args };
  },
  template: '<EditProject v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

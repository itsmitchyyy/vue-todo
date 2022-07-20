import ProjectList from "./ProjectList.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/ProjectList",
  component: ProjectList,
} as Meta<typeof ProjectList>;

const Template: StoryFn<typeof ProjectList> = (args) => ({
  components: { ProjectList },
  setup() {
    return { args };
  },
  template: '<ProjectList v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

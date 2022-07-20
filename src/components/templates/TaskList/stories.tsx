import TaskList from "./TaskList.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/TaskList",
  component: TaskList,
} as Meta<typeof TaskList>;

const Template: StoryFn<typeof TaskList> = (args) => ({
  components: { TaskList },
  setup() {
    return { args };
  },
  template: '<TaskList v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

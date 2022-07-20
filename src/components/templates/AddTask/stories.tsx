import AddTask from "./AddTask.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/AddTask",
  component: AddTask,
} as Meta<typeof AddTask>;

const Template: StoryFn<typeof AddTask> = (args) => ({
  components: { AddTask },
  setup() {
    return { args };
  },
  template: '<AddTask v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

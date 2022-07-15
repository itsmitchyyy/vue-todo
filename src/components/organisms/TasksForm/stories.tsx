import TasksForm from "./TasksForm.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "organisms/TasksForm",
  component: TasksForm,
} as Meta<typeof TasksForm>;

const Template: StoryFn<typeof TasksForm> = (args) => ({
  components: { TasksForm },
  setup() {
    return { args };
  },
  template: '<TasksForm v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  task: { title: "Test", description: "Test", projectId: 0 },
};

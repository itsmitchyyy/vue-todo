import EditTask from "./EditTask.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "templates/EditTask",
  component: EditTask,
} as Meta<typeof EditTask>;

const Template: StoryFn<typeof EditTask> = (args) => ({
  components: { EditTask },
  setup() {
    return { args };
  },
  template: '<EditTask v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {};

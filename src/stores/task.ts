import type { Task } from "@/domain/task";
import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    setTasks(tasks: Task[]) {
      this.tasks = tasks;
    },
    addTask(task: Task) {
      this.tasks.push(task);
    },
  },
});

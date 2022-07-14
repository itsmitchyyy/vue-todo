import type { Task } from "@/domain/task";
import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [] as Task[],
    task: {} as Task,
  }),
  getters: {
    taskList: (state) => state.tasks,
  },
  actions: {
    setTask(task: Task) {
      this.task = task;
    },
    setTasks(tasks: Task[]) {
      this.tasks = tasks;
    },
    addTask(task: Task) {
      this.tasks.push(task);
    },
    updateTask(task: Task) {
      const index = this.tasks.findIndex((taskUs) => taskUs.id === task.id);
      this.task = task;
      this.tasks[index] = task;
    },
    deleteTask(id: number) {
      const index = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(index, 1);
    },
  },
});

import type { AddTask, Task } from "@/domain/task";

export type TasksHooks = {
  useAddTask: () => {
    addTask: (task: AddTask) => Promise<void>;
  };
  useFetchTasks: () => {
    fetchTasks: () => Promise<Task[]>;
    fetchTask: (id: number) => Promise<Task>;
  };
  useDeleteTask: () => {
    deleteTask: (id: number) => Promise<void>;
  };
  useUpdateTask: () => {
    updateTask: (task: AddTask & { id: number }) => Promise<Task>;
  };
};

import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddTask, Task } from "@/domain/task";

export type TasksHooks = {
  useAddTask: () => {
    addTask: (task: AddTask) => Promise<void>;
  };
  useFetchTasks: () => {
    fetchTasks: (
      search?: string,
      paginateParams?: PaginationRequest,
    ) => Promise<{ data: Task[]; pagination: PaginationQuery }>;
    fetchTask: (id: number) => Promise<Task>;
  };
  useDeleteTask: () => {
    deleteTask: (id: number) => Promise<void>;
  };
  useUpdateTask: () => {
    updateTask: (task: AddTask & { id: number }) => Promise<Task>;
  };
};

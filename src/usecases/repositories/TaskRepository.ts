import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddTask, Task } from "@/domain/task";

export default interface TaskRepository {
  fetchTasks: (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => Promise<{ data: Task[]; pagination: PaginationQuery }>;
  fetchTask: (id: number) => Promise<Task>;
  addTask: (task: AddTask) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (task: AddTask & { id: number }) => Promise<Task>;
}

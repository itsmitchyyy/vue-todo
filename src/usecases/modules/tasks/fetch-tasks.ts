import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { Task } from "@/domain/task";
import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type fetchTasksUseCase = (
  search?: string,
  paginateParams?: PaginationRequest,
) => Promise<{ data: Task[]; pagination: PaginationQuery }>;

export const buildFetchTasks = (dependencies: {
  taskRepository: TaskRepository;
}): fetchTasksUseCase => {
  const { taskRepository } = dependencies;

  const fetchTasks: fetchTasksUseCase = (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => taskRepository.fetchTasks(search, paginateParams);

  return fetchTasks;
};

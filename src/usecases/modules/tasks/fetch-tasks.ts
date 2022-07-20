import type { Task } from "@/domain/task";
import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type fetchTasksUseCase = (search?: string) => Promise<Task[]>;

export const buildFetchTasks = (dependencies: {
  taskRepository: TaskRepository;
}): fetchTasksUseCase => {
  const { taskRepository } = dependencies;

  const fetchTasks: fetchTasksUseCase = (search?: string) =>
    taskRepository.fetchTasks(search);

  return fetchTasks;
};

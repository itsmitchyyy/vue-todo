import type { Task } from "@/domain/task";
import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type fetchTasksUseCase = () => Promise<Task[]>;

export const buildFetchTasks = (dependencies: {
  taskRepository: TaskRepository;
}): fetchTasksUseCase => {
  const { taskRepository } = dependencies;

  const fetchTasks: fetchTasksUseCase = () => taskRepository.fetchTasks();

  return fetchTasks;
};

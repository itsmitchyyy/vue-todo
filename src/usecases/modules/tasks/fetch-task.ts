import type { Task } from "@/domain/task";
import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type fetchTaskUseCase = (id: number) => Promise<Task>;

export const buildFetchTask = (dependencies: {
  taskRepository: TaskRepository;
}): fetchTaskUseCase => {
  const { taskRepository } = dependencies;

  const fetchTask: fetchTaskUseCase = (id) => taskRepository.fetchTask(id);

  return fetchTask;
};

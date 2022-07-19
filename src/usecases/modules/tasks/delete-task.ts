import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type deleteTaskUseCase = (id: number) => Promise<void>;

export const buildDeleteTask = (dependencies: {
  taskRepository: TaskRepository;
}): deleteTaskUseCase => {
  const { taskRepository } = dependencies;

  const deleteTask: deleteTaskUseCase = (id) => taskRepository.deleteTask(id);

  return deleteTask;
};

import type { AddTask, Task } from "@/domain/task";
import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type updateTaskUseCase = (
  task: AddTask & { id: number },
) => Promise<Task>;

export const buildUpdateTask = (dependencies: {
  taskRepository: TaskRepository;
}): updateTaskUseCase => {
  const { taskRepository } = dependencies;

  const updateTask: updateTaskUseCase = (task) =>
    taskRepository.updateTask(task);

  return updateTask;
};

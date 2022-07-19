import type { AddTask, Task } from "@/domain/task";
import type TaskRepository from "@/usecases/repositories/TaskRepository";

export type addTaskUseCase = (task: AddTask) => Promise<void>;

export const buildAddTask = (dependencies: {
  taskRepository: TaskRepository;
}): addTaskUseCase => {
  const { taskRepository } = dependencies;

  const addTask: addTaskUseCase = (task) => taskRepository.addTask(task);

  return addTask;
};

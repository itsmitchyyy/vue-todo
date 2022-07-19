import type TaskRepository from "@/usecases/repositories/TaskRepository";
import { buildAddTask, type addTaskUseCase } from "./add-task";
import { buildDeleteTask, type deleteTaskUseCase } from "./delete-task";
import { buildFetchTask, type fetchTaskUseCase } from "./fetch-task";
import { buildFetchTasks, type fetchTasksUseCase } from "./fetch-tasks";
import { buildUpdateTask, type updateTaskUseCase } from "./update-task";

export default (dependencies: {
  taskRepository: TaskRepository;
}): {
  addTask: addTaskUseCase;
  fetchTasks: fetchTasksUseCase;
  deleteTask: deleteTaskUseCase;
  fetchTask: fetchTaskUseCase;
  updateTask: updateTaskUseCase;
} => {
  const { taskRepository } = dependencies;

  const addTask = buildAddTask({ taskRepository });
  const fetchTasks = buildFetchTasks({ taskRepository });
  const deleteTask = buildDeleteTask({ taskRepository });
  const fetchTask = buildFetchTask({ taskRepository });
  const updateTask = buildUpdateTask({ taskRepository });

  return {
    addTask,
    fetchTasks,
    deleteTask,
    fetchTask,
    updateTask,
  };
};

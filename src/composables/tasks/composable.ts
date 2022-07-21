import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddTask, Task } from "@/domain/task";
import type { TasksHooks } from ".";
import { taskInteractor } from "../dependencies";

export const useAddTask: TasksHooks["useAddTask"] = (): {
  addTask: (task: AddTask) => Promise<void>;
} => {
  const addTask = async (task: AddTask) => {
    return await taskInteractor.addTask(task);
  };

  return { addTask };
};

export const useFetchTasks: TasksHooks["useFetchTasks"] = (): {
  fetchTasks: (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => Promise<{ data: Task[]; pagination: PaginationQuery }>;
  fetchTask: (id: number) => Promise<Task>;
} => {
  const fetchTasks = async (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => {
    return await taskInteractor.fetchTasks(search, paginateParams);
  };

  const fetchTask = async (id: number) => {
    return await taskInteractor.fetchTask(id);
  };

  return { fetchTasks, fetchTask };
};

export const useDeleteTask: TasksHooks["useDeleteTask"] = (): {
  deleteTask: (id: number) => Promise<void>;
} => {
  const deleteTask = async (id: number) => {
    return await taskInteractor.deleteTask(id);
  };

  return { deleteTask };
};

export const useUpdateTask: TasksHooks["useUpdateTask"] = (): {
  updateTask: (task: AddTask & { id: number }) => Promise<Task>;
} => {
  const updateTask = async (task: AddTask & { id: number }) => {
    return await taskInteractor.updateTask(task);
  };

  return { updateTask };
};

import type { AddTask, Task } from "@/domain/task";
import type { URLsType } from "@/constants/urls";
import type TaskRepository from "@/usecases/repositories/TaskRepository";
import type { HttpAdapter } from "@/usecases/repositories/HttpAdapter";
import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";

export default class TaskRepositoryImpl implements TaskRepository {
  httpAdapter: HttpAdapter;
  urls: URLsType["task"];

  constructor(httpAdapter: HttpAdapter, urls: URLsType["task"]) {
    this.httpAdapter = httpAdapter;
    this.urls = urls;
  }

  fetchTask = async (id: number): Promise<Task> => {
    const response = await this.httpAdapter.get(this.urls.task(id), {});

    return response.data.data;
  };

  updateTask = async (task: AddTask & { id: number }): Promise<Task> => {
    const { projectId, ...payload } = task;
    const response = await this.httpAdapter.put(this.urls.task(task.id), {
      ...payload,
      project_id: projectId,
    });

    return response.data.data;
  };

  deleteTask = async (id: number): Promise<void> => {
    const response = await this.httpAdapter.delete(this.urls.task(id), {});

    return response.data.data;
  };

  fetchTasks = async (
    search?: string,
    paginateParams?: PaginationRequest,
  ): Promise<{ data: Task[]; pagination: PaginationQuery }> => {
    const response = await this.httpAdapter.get(this.urls.tasks, {
      params: { search, ...paginateParams },
    });

    return {
      data: response.data.data,
      pagination: response.data.meta,
    };
  };

  addTask = async (task: AddTask): Promise<void> => {
    const { projectId, ...payload } = task;

    const response = await this.httpAdapter.post(this.urls.tasks, {
      ...payload,
      project_id: projectId,
    });

    return response.data.data;
  };
}

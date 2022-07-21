import type { URLsType } from "@/constants/urls";
import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddProject, Project } from "@/domain/project";
import type { HttpAdapter } from "@/usecases/repositories/HttpAdapter";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export default class ProjectRepositoryImpl implements ProjectRepository {
  httpAdapter: HttpAdapter;
  urls: URLsType["project"];

  constructor(httpAdapter: HttpAdapter, urls: URLsType["project"]) {
    this.httpAdapter = httpAdapter;
    this.urls = urls;
  }

  fetchProject = async (id: number): Promise<Project> => {
    const response = await this.httpAdapter.get(this.urls.project(id), {});

    return response.data.data;
  };

  updateProject = async (project: Project): Promise<Project> => {
    const response = await this.httpAdapter.put(
      this.urls.project(project.id),
      project,
    );

    return response.data.data;
  };

  deleteProject = async (id: number): Promise<void> => {
    const response = await this.httpAdapter.delete(this.urls.project(id), {});

    return response.data.data;
  };

  fetchProjects = async (
    search?: string,
    paginateParams?: PaginationRequest,
  ): Promise<{ data: Project[]; pagination: PaginationQuery }> => {
    const response = await this.httpAdapter.get(this.urls.projects, {
      params: {
        search,
        ...paginateParams,
      },
    });

    return {
      data: response.data.data,
      pagination: response.data.meta,
    };
  };

  addProject = async (project: AddProject): Promise<void> => {
    const response = await this.httpAdapter.post(this.urls.projects, project);

    return response.data.data;
  };
}

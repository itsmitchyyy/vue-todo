import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddProject, Project } from "@/domain/project";

export default interface ProjectRepository {
  fetchProjects: (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => Promise<{ data: Project[]; pagination: PaginationQuery }>;
  fetchProject: (id: number) => Promise<Project>;
  addProject: (project: AddProject) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (project: Project) => Promise<Project>;
}

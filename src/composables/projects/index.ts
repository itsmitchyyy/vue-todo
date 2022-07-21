import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddProject, Project } from "@/domain/project";

export type ProjectsHooks = {
  useAddProject: () => {
    addProject: (Project: AddProject) => Promise<void>;
  };
  useFetchProjects: () => {
    fetchProjects: (
      search?: string,
      paginateParams?: PaginationRequest,
    ) => Promise<{ data: Project[]; pagination: PaginationQuery }>;
    fetchProject: (id: number) => Promise<Project>;
  };
  useDeleteProject: () => {
    deleteProject: (id: number) => Promise<void>;
  };
  useUpdateProject: () => {
    updateProject: (Project: Project) => Promise<Project>;
  };
};

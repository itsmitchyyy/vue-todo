import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { Project } from "@/domain/project";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type fetchProjectsUseCase = (
  search?: string,
  paginateParams?: PaginationRequest,
) => Promise<{ data: Project[]; pagination: PaginationQuery }>;

export const buildFetchProjects = (dependencies: {
  projectRepository: ProjectRepository;
}): fetchProjectsUseCase => {
  const { projectRepository } = dependencies;

  const fetchProject: fetchProjectsUseCase = (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => projectRepository.fetchProjects(search, paginateParams);

  return fetchProject;
};

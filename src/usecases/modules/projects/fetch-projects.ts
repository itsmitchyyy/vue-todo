import type { Project } from "@/domain/project";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type fetchProjectsUseCase = (search?: string) => Promise<Project[]>;

export const buildFetchProjects = (dependencies: {
  projectRepository: ProjectRepository;
}): fetchProjectsUseCase => {
  const { projectRepository } = dependencies;

  const fetchProject: fetchProjectsUseCase = (search?: string) =>
    projectRepository.fetchProjects(search);

  return fetchProject;
};

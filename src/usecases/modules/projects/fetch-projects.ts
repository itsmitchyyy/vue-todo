import type { Project } from "@/domain/project";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type fetchProjectsUseCase = () => Promise<Project[]>;

export const buildFetchProjects = (dependencies: {
  projectRepository: ProjectRepository;
}): fetchProjectsUseCase => {
  const { projectRepository } = dependencies;

  const fetchProject: fetchProjectsUseCase = () =>
    projectRepository.fetchProjects();

  return fetchProject;
};

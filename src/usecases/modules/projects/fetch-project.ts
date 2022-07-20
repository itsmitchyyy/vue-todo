import type { Project } from "@/domain/project";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type fetchProjectUseCase = (id: number) => Promise<Project>;

export const buildFetchProject = (dependencies: {
  projectRepository: ProjectRepository;
}): fetchProjectUseCase => {
  const { projectRepository } = dependencies;

  const fetchProject: fetchProjectUseCase = (id) =>
    projectRepository.fetchProject(id);

  return fetchProject;
};

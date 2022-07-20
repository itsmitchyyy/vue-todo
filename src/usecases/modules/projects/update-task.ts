import type { Project } from "@/domain/project";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type updateProjectUseCase = (project: Project) => Promise<Project>;

export const buildUpdateProject = (dependencies: {
  projectRepository: ProjectRepository;
}): updateProjectUseCase => {
  const { projectRepository } = dependencies;

  const updateProject: updateProjectUseCase = (project) =>
    projectRepository.updateProject(project);

  return updateProject;
};

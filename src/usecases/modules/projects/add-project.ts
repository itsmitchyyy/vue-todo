import type { AddProject } from "@/domain/project";
import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type addProjectUseCase = (project: AddProject) => Promise<void>;

export const buildAddProject = (dependencies: {
  projectRepository: ProjectRepository;
}): addProjectUseCase => {
  const { projectRepository } = dependencies;

  const addProject: addProjectUseCase = (project) =>
    projectRepository.addProject(project);

  return addProject;
};

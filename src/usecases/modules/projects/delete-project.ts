import type ProjectRepository from "@/usecases/repositories/ProjectRepository";

export type deleteProjectUseCase = (id: number) => Promise<void>;

export const buildDeleteProject = (dependencies: {
  projectRepository: ProjectRepository;
}): deleteProjectUseCase => {
  const { projectRepository } = dependencies;

  const deleteProject: deleteProjectUseCase = (id) =>
    projectRepository.deleteProject(id);

  return deleteProject;
};

import type ProjectRepository from "@/usecases/repositories/ProjectRepository";
import { buildAddProject, type addProjectUseCase } from "./add-project";
import {
  buildDeleteProject,
  type deleteProjectUseCase,
} from "./delete-project";
import { buildFetchProject, type fetchProjectUseCase } from "./fetch-project";
import {
  buildFetchProjects,
  type fetchProjectsUseCase,
} from "./fetch-projects";
import { buildUpdateProject, type updateProjectUseCase } from "./update-task";

export default (dependencies: {
  projectRepository: ProjectRepository;
}): {
  addProject: addProjectUseCase;
  fetchProjects: fetchProjectsUseCase;
  deleteProject: deleteProjectUseCase;
  fetchProject: fetchProjectUseCase;
  updateProject: updateProjectUseCase;
} => {
  const { projectRepository } = dependencies;

  const addProject = buildAddProject({ projectRepository });
  const fetchProjects = buildFetchProjects({ projectRepository });
  const deleteProject = buildDeleteProject({ projectRepository });
  const fetchProject = buildFetchProject({ projectRepository });
  const updateProject = buildUpdateProject({ projectRepository });

  return {
    addProject,
    fetchProjects,
    deleteProject,
    fetchProject,
    updateProject,
  };
};

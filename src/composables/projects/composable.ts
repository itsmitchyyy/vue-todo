import type { PaginationQuery, PaginationRequest } from "@/domain/pagination";
import type { AddProject, Project } from "@/domain/project";
import type { ProjectsHooks } from ".";
import { projectInteractor } from "../dependencies";

export const useAddProject: ProjectsHooks["useAddProject"] = (): {
  addProject: (Project: AddProject) => Promise<void>;
} => {
  const addProject = async (Project: AddProject) => {
    return await projectInteractor.addProject(Project);
  };

  return { addProject };
};

export const useFetchProjects: ProjectsHooks["useFetchProjects"] = (): {
  fetchProjects: (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => Promise<{ data: Project[]; pagination: PaginationQuery }>;
  fetchProject: (id: number) => Promise<Project>;
} => {
  const fetchProjects = async (
    search?: string,
    paginateParams?: PaginationRequest,
  ) => {
    return await projectInteractor.fetchProjects(search, paginateParams);
  };

  const fetchProject = async (id: number) => {
    return await projectInteractor.fetchProject(id);
  };

  return { fetchProjects, fetchProject };
};

export const useDeleteProject: ProjectsHooks["useDeleteProject"] = (): {
  deleteProject: (id: number) => Promise<void>;
} => {
  const deleteProject = async (id: number) => {
    return await projectInteractor.deleteProject(id);
  };

  return { deleteProject };
};

export const useUpdateProject: ProjectsHooks["useUpdateProject"] = (): {
  updateProject: (Project: Project) => Promise<Project>;
} => {
  const updateProject = async (Project: Project) => {
    return await projectInteractor.updateProject(Project);
  };

  return { updateProject };
};

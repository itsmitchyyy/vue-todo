import type { AddProject, Project } from "@/domain/project";

export type ProjectsHooks = {
  useAddProject: () => {
    addProject: (Project: AddProject) => Promise<void>;
  };
  useFetchProjects: () => {
    fetchProjects: (search?: string) => Promise<Project[]>;
    fetchProject: (id: number) => Promise<Project>;
  };
  useDeleteProject: () => {
    deleteProject: (id: number) => Promise<void>;
  };
  useUpdateProject: () => {
    updateProject: (Project: Project) => Promise<Project>;
  };
};

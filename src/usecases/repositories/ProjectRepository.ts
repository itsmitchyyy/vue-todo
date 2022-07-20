import type { AddProject, Project } from "@/domain/project";

export default interface ProjectRepository {
  fetchProjects: () => Promise<Project[]>;
  fetchProject: (id: number) => Promise<Project>;
  addProject: (project: AddProject) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (project: Project) => Promise<Project>;
}

import type { Project } from "@/domain/project";
import { defineStore } from "pinia";

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    projects: [] as Project[],
    project: {} as Project,
  }),
  getters: {
    getProjects: (state) => state.projects,
    getProject: (state) => state.project,
  },
  actions: {
    setProject(project: Project) {
      this.project = project;
    },
    setProjects(project: Project[]) {
      this.projects = project;
    },
    addProject(project: Project) {
      this.projects.push(project);
    },
    updateProject(project: Project) {
      const index = this.projects.findIndex((proj) => proj.id === project.id);
      this.projects[index] = project;
    },
    deleteProject(id: number) {
      const index = this.projects.findIndex((project) => project.id === id);
      this.projects.splice(index, 1);
    },
  },
});

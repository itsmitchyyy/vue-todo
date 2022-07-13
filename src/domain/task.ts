import type { BaseModel } from "./baseModel";
import type { Project } from "./project";

export type Task = {
  title: string;
  description?: string;
  project: Project;
} & BaseModel;

export type AddTask = {
  title: string;
  description?: string;
  projectId: number;
};

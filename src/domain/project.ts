import type { BaseModel } from "./baseModel";

export type Project = {
  title: string;
  description?: string;
} & BaseModel;

export type AddProject = {
  title: string;
  description?: string;
};

import type { BaseModel } from "./baseModel";

export type User = {
  name: string;
  email: string;
} & BaseModel;

export type UserDetails = {
  token: string;
  user: User;
};

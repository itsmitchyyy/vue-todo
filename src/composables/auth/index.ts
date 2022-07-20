import type { AddProject, Project } from "@/domain/project";
import type { UserDetails } from "@/domain/user";

export type AuthHooks = {
  useSignIn: () => {
    signIn: (email: string, password: string) => Promise<UserDetails>;
  };
  useSignUp: () => {
    signUp: (
      email: string,
      password: string,
      name: string,
    ) => Promise<UserDetails>;
  };
  useSignOut: () => {
    signOut: () => Promise<void>;
  };
};

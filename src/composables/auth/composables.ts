import type { UserDetails } from "@/domain/user";
import type { AuthHooks } from ".";
import { authInteractor } from "../dependencies";

export const useSignIn: AuthHooks["useSignIn"] = (): {
  signIn: (email: string, password: string) => Promise<UserDetails>;
} => {
  const signIn = async (email: string, password: string) => {
    return await authInteractor.signIn(email, password);
  };

  return { signIn };
};

export const useSignUp: AuthHooks["useSignUp"] = (): {
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<UserDetails>;
} => {
  const signUp = async (email: string, password: string, name: string) => {
    return await authInteractor.signUp(email, password, name);
  };

  return { signUp };
};

export const useSignOut: AuthHooks["useSignOut"] = (): {
  signOut: () => Promise<void>;
} => {
  const signOut = async () => {
    return await authInteractor.signOut();
  };

  return { signOut };
};

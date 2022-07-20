import type AuthService from "@/usecases/repositories/AuthService";
import { buildSignIn, type signInUseCase } from "./signin";
import { buildSignOut, type signOutUseCase } from "./signout";
import { buildSignUp, type signUpUseCase } from "./signup";

export default (dependencies: {
  authService: AuthService;
}): {
  signIn: signInUseCase;
  signUp: signUpUseCase;
  signOut: signOutUseCase;
} => {
  const { authService } = dependencies;

  const signIn = buildSignIn({ authService });
  const signUp = buildSignUp({ authService });
  const signOut = buildSignOut({ authService });

  return {
    signIn,
    signUp,
    signOut,
  };
};

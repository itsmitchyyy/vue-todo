import type { UserDetails } from "@/domain/user";
import type AuthService from "@/usecases/repositories/AuthService";

export type signInUseCase = (
  email: string,
  password: string,
) => Promise<UserDetails>;

export const buildSignIn = (dependencies: {
  authService: AuthService;
}): signInUseCase => {
  const { authService } = dependencies;

  const signIn: signInUseCase = (email, password) =>
    authService.signIn(email, password);

  return signIn;
};

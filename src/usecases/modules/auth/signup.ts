import type { UserDetails } from "@/domain/user";
import type AuthService from "@/usecases/repositories/AuthService";

export type signUpUseCase = (
  email: string,
  password: string,
  name: string,
) => Promise<UserDetails>;

export const buildSignUp = (dependencies: {
  authService: AuthService;
}): signUpUseCase => {
  const { authService } = dependencies;

  const signUp: signUpUseCase = (email, password, name) =>
    authService.signUp(email, password, name);

  return signUp;
};

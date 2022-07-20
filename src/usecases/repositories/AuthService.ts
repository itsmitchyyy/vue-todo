import type { UserDetails } from "@/domain/user";

export default interface AuthService {
  signIn(email: string, password: string): Promise<UserDetails>;
  signUp(email: string, password: string, name: string): Promise<UserDetails>;
  signOut(): Promise<void>;
}

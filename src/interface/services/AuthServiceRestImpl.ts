import type { URLsType } from "@/constants/urls";
import type { UserDetails } from "@/domain/user";
import type AuthService from "@/usecases/repositories/AuthService";
import type { HttpAdapter } from "@/usecases/repositories/HttpAdapter";

export default class AuthServiceRestImpl implements AuthService {
  httpAdapter: HttpAdapter;
  urls: URLsType["auth"];

  constructor(httpAdapter: HttpAdapter, urls: URLsType["auth"]) {
    this.httpAdapter = httpAdapter;
    this.urls = urls;
  }

  async signIn(email: string, password: string): Promise<UserDetails> {
    const response = await this.httpAdapter.post(this.urls.signin, {
      email,
      password,
    });

    return response.data.data;
  }

  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<UserDetails> {
    const response = await this.httpAdapter.post(this.urls.signup, {
      email,
      password,
      name,
      password_confirmation: password,
    });

    return response.data.data;
  }

  async signOut(): Promise<void> {
    return await this.httpAdapter.post(this.urls.logout, {});
  }
}

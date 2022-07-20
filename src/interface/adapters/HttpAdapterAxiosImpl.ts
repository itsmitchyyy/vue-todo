import type { HttpAdapter } from "@/usecases/repositories/HttpAdapter";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
} from "axios";

export default class HttpAdapterAxiosImpl implements HttpAdapter {
  axios: AxiosInstance;

  constructor(axios: AxiosStatic, baseURL?: string) {
    if (baseURL) {
      this.axios = axios.create({ baseURL });
    } else {
      this.axios = axios;
    }
  }

  checkAuthError = (error: AxiosError): AxiosError => {
    const statusCode = (error.response?.data as any)?.status_code;

    if (statusCode && statusCode === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return error;
  };

  get = (url: string, options: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
      return this.axios.get(url, options);
    } catch (err) {
      console.log("here");

      throw this.checkAuthError(err as AxiosError);
    }
  };

  post = async (
    url: string,
    body: Object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    try {
      return await this.axios.post(url, body, config);
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw Error("Network Error");
      } else {
        throw this.checkAuthError(error);
      }
    }
  };

  patch = (url: string, body: Object): Promise<AxiosResponse> => {
    try {
      return this.axios.patch(url, body);
    } catch (err) {
      throw this.checkAuthError(err as AxiosError);
    }
  };

  put = (url: string, body: Object): Promise<AxiosResponse> => {
    try {
      return this.axios.put(url, body);
    } catch (err) {
      throw this.checkAuthError(err as AxiosError);
    }
  };

  delete = (
    url: string,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse> => {
    try {
      return this.axios.delete(url, options);
    } catch (err) {
      throw this.checkAuthError(err as AxiosError);
    }
  };
}

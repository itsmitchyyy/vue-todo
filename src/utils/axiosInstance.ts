import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth/auth";
import axios, { type AxiosRequestConfig } from "axios";

axios.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const authStore = useAuthStore();
    const accessToken = authStore.user?.token || null;

    request.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };

    return request;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { useLogout } = useAuth();
    const { logout } = useLogout();
    if (error.response.status === 401) {
      await logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axios;

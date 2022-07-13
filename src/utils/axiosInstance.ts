import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import axios, { type AxiosRequestConfig } from "axios";
import { useRouter } from "vue-router";

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  const authStore = useAuthStore();
  const accessToken = authStore.getToken || null;

  request.headers = { Authorization: `Bearer ${accessToken}` };

  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const router = useRouter();
    const { useLogout } = useAuth();
    const { logout } = useLogout();
    if (error.response.status === 403 || error.response.status === 401) {
      logout();
      router.push({ name: "login" });
    }

    return Promise.reject(error);
  },
);

export default axios;

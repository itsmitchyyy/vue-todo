import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

const localStorage = useLocalStorage("user", { token: null, user: null });

const accessToken = localStorage.value.token || null;

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default axiosInstance;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/";
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/";

const urls = {
  auth: {
    csrf: `${BACKEND_URL}sanctum/csrf-cookie`,
    signin: `${API_URL}signin`,
    signup: `${API_URL}signup`,
    user: `${API_URL}user`,
    logout: `${API_URL}logout`,
    resendVerification: `${API_URL}email/verification-notification`,
  },
  project: {
    projects: `${API_URL}projects`,
    project: (id: number): string => `${API_URL}projects/${String(id)}`,
  },
  task: {
    tasks: `${API_URL}tasks`,
    task: (id: number): string => `${API_URL}tasks/${String(id)}`,
  },
};

export type URLsType = typeof urls;

export default urls;

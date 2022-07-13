const API_URL = import.meta.env.VITE_API_URL || "";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const urls = {
  auth: {
    csrf: `${BACKEND_URL}sanctum/csrf-cookie`,
    signin: `${API_URL}signin`,
    signup: `${API_URL}signup`,
    user: `${API_URL}user`,
    resendVerification: `${API_URL}email/verification-notification`,
  },
  project: {
    projects: `${API_URL}projects`,
    project: (id: number): string => `${API_URL}projects/${String(id)}`,
  },
};

export default urls;

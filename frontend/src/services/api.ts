import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 for authenticated API requests.
    // Do NOT redirect when login itself fails.
    const requestUrl = error.config?.url || "";

    const isLoginRequest = requestUrl.includes("/api/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Don't use window.location.href because it causes a full page reload.
      // Authentication state should be handled by AuthContext / ProtectedRoute.
    }

    return Promise.reject(error);
  }
);

export default api;
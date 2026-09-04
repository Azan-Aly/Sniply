import axios from "axios";

// If the app is accessed on any live production domain (like sniplyy.vercel.app),
// ALWAYS use relative path "" (same origin). Only use localhost when running on localhost.
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const API_BASE_URL = !isLocalhost
  ? ""
  : (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000");

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Request interceptor to attach Bearer token if available in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refreshing seamlessly on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt refresh on auth endpoints to prevent loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/v1/users/login") &&
      !originalRequest.url?.includes("/api/v1/users/register") &&
      !originalRequest.url?.includes("/api/v1/users/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await apiClient.get("/api/v1/users/refresh");
        const newAccessToken = refreshRes?.data?.data?.accessToken;
        if (newAccessToken && typeof window !== "undefined") {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// URL Service Methods
export const urlApi = {
  shorten: (data) => apiClient.post("/url/shorten", data),
  getRecent: () => apiClient.get("/url/recent"),
  deleteUrl: (shortId) => apiClient.delete(`/url/${shortId}`),
  getStats: () => apiClient.get("/url/stats"),
};

// User Service Methods
export const userApi = {
  register: (data) => apiClient.post("/api/v1/users/register", data),
  login: (data) => apiClient.post("/api/v1/users/login", data),
  logout: () => apiClient.post("/api/v1/users/logout"),
  getMe: () => apiClient.get("/api/v1/users/me"),
  refreshToken: () => apiClient.get("/api/v1/users/refresh"),
  updateAvatar: (formData) =>
    apiClient.post("/api/v1/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default apiClient;

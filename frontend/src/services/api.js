import axios from "axios";
import { clearStoredToken, getStoredToken } from "../utils/jwt";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredToken();
      window.dispatchEvent(new CustomEvent("auth:expired"));
    }

    return Promise.reject(error);
  }
);

export const authService = {
  login: (payload) => api.post("/auth/login", payload),
};

export const productService = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  delete: (id) => api.delete(`/products/${id}`),
};

export const orderService = {
  getMyOrders: () => api.get("/orders/my"),
  getAllOrders: () => api.get("/orders"),
  createOrder: (payload) => api.post("/orders", payload),
  cancelOrder: (id) => api.delete(`/orders/${id}`),
};

export const dashboardService = {
  getStats: () => api.get("/dashboard"),
};

export default api;

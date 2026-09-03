import axios from "axios";
import { getToken } from "../utils/token";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// ===============================
// AI AGENT
// ===============================

export const sendChatAPI = ({ message }) =>
  api.post("/agent/chat", {
    message,
  });

// ===============================
// INTERACTION CRUD
// ===============================

export const createInteraction = (data) =>
  api.post("/interactions", data);

export const getInteractions = () =>
  api.get("/interactions");

export const updateInteraction = (id, data) =>
  api.put(`/interactions/${id}`, data);

export const deleteInteraction = (id) =>
  api.delete(`/interactions/${id}`);

// ===============================
// SEARCH
// ===============================

export const searchInteractions = (query) =>
  api.get("/interactions/search/", {
    params: {
      q: query,
    },
  });

// ===============================
// DASHBOARD ANALYTICS
// ===============================

export const getDashboardStats = () =>
  api.get("/analytics/dashboard");
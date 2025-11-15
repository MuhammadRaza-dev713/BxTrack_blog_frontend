import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

// Optionally add request interceptor to attach token automatically
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;


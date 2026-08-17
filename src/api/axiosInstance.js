import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1300",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      // Later we will dispatch logout and redirect to /auth
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
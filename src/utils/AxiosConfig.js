// src/utils/axiosConfig.js
import axios from 'axios';
import authService from '~/services/AuthService';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  withCredentials: true, // Important: to send/receive cookies
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("haha")
//     const originalRequest = error.config;

//     // If error is 401 and we haven't tried to refresh yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await authService.refreshToken();
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed, redirect to login
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
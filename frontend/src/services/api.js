import axios from 'axios';
import { toast } from 'sonner';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    const { response, message } = error;
    
    // Log error
    console.error('❌ API Error:', {
      status: response?.status,
      statusText: response?.statusText,
      data: response?.data,
      message,
      url: error.config?.url
    });
    
    // Handle different error cases
    if (response?.status === 401) {
      // Unauthorized - clear tokens and redirect to login
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('driverId');
      
      if (window.location.pathname !== '/login' && window.location.pathname !== '/role-selection') {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/role-selection';
      }
    } else if (response?.status === 403) {
      toast.error('Access denied. You don\'t have permission to perform this action.');
    } else if (response?.status === 404) {
      toast.error('Resource not found.');
    } else if (response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else if (response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (!response) {
      toast.error('Network error. Please check your internet connection.');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updatePassword: (passwordData) => api.put('/auth/update-password', passwordData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export const driverAPI = {
  register: (driverData) => api.post('/driver/register', driverData),
  login: (credentials) => api.post('/driver/login', credentials),
  getProfile: () => api.get('/driver/profile'),
  updateProfile: (data) => api.put('/driver/profile', data),
};

export const ridesAPI = {
  getAllRides: (params) => api.get('/rides', { params }),
  createRide: (rideData) => api.post('/rides', rideData),
  getRideById: (id) => api.get(`/rides/${id}`),
  updateRide: (id, rideData) => api.put(`/rides/${id}`, rideData),
  deleteRide: (id) => api.delete(`/rides/${id}`),
  bookRide: (id, bookingData) => api.post(`/rides/${id}/book`, bookingData),
  getUserRides: () => api.get('/rides/user'),
  getDriverRides: () => api.get('/rides/driver'),
};

export const contactAPI = {
  sendMessage: (messageData) => api.post('/contact', messageData),
};

// Utility functions
export const handleApiError = (error) => {
  const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
  return message;
};

export const isApiError = (error) => {
  return error.response && error.response.data;
};

export default api;
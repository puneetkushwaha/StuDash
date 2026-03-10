import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const getAuthHeaders = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authService.getToken()}`
  }
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const studentService = {
  getProfile: () => axios.get(`${API_BASE_URL}/auth/profile`, getAuthHeaders()),
  getAcademicData: () => axios.get(`${API_BASE_URL}/student/academic-data`, getAuthHeaders()),
};

export const taskService = {
  getAll: () => axios.get(`${API_BASE_URL}/tasks`, getAuthHeaders()),
  create: (task) => axios.post(`${API_BASE_URL}/tasks`, task, getAuthHeaders()),
  update: (id, task) => axios.put(`${API_BASE_URL}/tasks/${id}`, task, getAuthHeaders()),
  delete: (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`, getAuthHeaders()),
};

export const announcementService = {
  getAnnouncements: () => axios.get(`${API_BASE_URL}/announcements`),
};

// Error interceptor for global handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Intercept every request and add the token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (user) => {
  try {
    const response = await api.post('/auth/register', user);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Register failed');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await api.post('/auth/authenticate', user);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token); // Store JWT token in local storage
      return response.data;
    }
    throw new Error('Login failed');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/users/getUserById/2');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove JWT token from local storage
};

export default api;

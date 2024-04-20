// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api'; // Update the base URL with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (user) => {
  try {
    const response = await api.post('/users/register', user);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Register failed');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const loginUser = async (user) => { // Define loginUser function
    try {
      const response = await api.post('/users/login', user);
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

export default api;

import axios from 'axios';

const API_URL = 'http://backend:8080/api'; // This should be your backend service URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Placeholder for authentication function
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    // Assuming the backend returns a token or user data
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default api;

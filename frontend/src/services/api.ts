import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song, Playlist } from '../types/models';

const API_URL = 'http://localhost:8080/api'; // This should be your backend service URL
const MUSIC_STREAM_BASE_URL = 'http://localhost:8080/music'; // Base URL for streaming music files

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/signin', { username, password });
    const { token, id, username: userUsername, roles } = response.data;
    await AsyncStorage.setItem('jwtToken', token);
    return { token, id, username: userUsername, roles };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getAllSongs = async (): Promise<Song[]> => {
  try {
    const response = await api.get<Song[]>('/songs');
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

export const getAllPlaylists = async (): Promise<Playlist[]> => {
  try {
    const response = await api.get<Playlist[]>('/playlists');
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const getSongStreamUrl = (filePath: string): string => {
  return `${MUSIC_STREAM_BASE_URL}/${filePath}`;
};

export default api;
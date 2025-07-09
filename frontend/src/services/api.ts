import axios from 'axios';
import { Song, Playlist } from '../types/models';

const API_URL = 'http://localhost:8080/api'; // This should be your backend service URL
const MUSIC_STREAM_BASE_URL = 'http://localhost:8080/music'; // Base URL for streaming music files

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

// Fetch all songs
export const getAllSongs = async (): Promise<Song[]> => {
  try {
    const response = await api.get<Song[]>('/songs');
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

// Fetch all playlists
export const getAllPlaylists = async (): Promise<Playlist[]> => {
  try {
    const response = await api.get<Playlist[]>('/playlists');
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

// Get the streaming URL for a song
export const getSongStreamUrl = (filePath: string): string => {
  // Assuming filePath is relative to the music storage path (e.g., "song.mp3" or "artist/album/song.mp3")
  return `${MUSIC_STREAM_BASE_URL}/${filePath}`;
};

export default api;

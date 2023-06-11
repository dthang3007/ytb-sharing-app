import axios from 'axios';
import { CreateVideoParams, Signin, Signup, VideoQuery } from '../types';
import { useAuthStore } from '../store/useAuthStore';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const { auth } = useAuthStore.getState();
  config.headers['ngrok-skip-browser-warning'] = true;
  if (auth?.accessToken) {
    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
  }

  return { ...config };
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    return Promise.reject(error?.response?.data);
  }
);

export const getVideos = <T>(params: VideoQuery): Promise<T> => api.get('/video', { params });

export const signup = (params: Signup) => api.post('/auth/signup', params);
export const signin = (params: Signin) => api.post('/auth/signin', params);
export const createVideo = (params: CreateVideoParams) => api.post('/video', params);
export const getNoti = <T>(): Promise<T> => api.get('/notification');
export const markReaded = (id: string) => api.patch(`/notification/${id}`);

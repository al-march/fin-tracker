import axios from 'axios';
import { appStorage } from '@app/services/storage';

export const http = axios.create({
  baseURL: '/api/v1/',
});

http.interceptors.request.use((config) => {
  const token = appStorage.get('token') || '';
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

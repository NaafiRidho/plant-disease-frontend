import axios from 'axios';
import { PredictionResponse, ClassesResponse, HealthResponse, AuthResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Interceptor untuk memasukkan token JWT secara otomatis
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Periksa apakah pesan error ada di struktur data backend (auth_routes biasanya menggunakan message atau error)
      const message = error.response.data?.message || error.response.data?.error || 'Terjadi kesalahan pada server';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error('Tidak dapat terhubung ke server. Pastikan backend Flask sedang berjalan.'));
    }
    return Promise.reject(error);
  }
);

/**
 * Predict penyakit dari gambar
 */
export async function predictDisease(imageFile: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post<PredictionResponse>('/api/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}

/**
 * Ambil daftar semua kelas penyakit
 */
export async function getClasses(): Promise<ClassesResponse> {
  const response = await api.get<ClassesResponse>('/api/classes');
  return response.data;
}

/**
 * Health check backend
 */
export async function checkHealth(): Promise<HealthResponse> {
  const response = await api.get<HealthResponse>('/api/health');
  return response.data;
}

/**
 * Ambil info detail satu penyakit
 */
export async function getDiseaseInfo(className: string) {
  const response = await api.get(`/api/disease/${className}`);
  return response.data;
}

/**
 * Registrasi pengguna baru
 */
export async function apiRegister(username: string, email: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/api/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
}

/**
 * Login pengguna
 */
export async function apiLogin(usernameOrEmail: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/api/auth/login', {
    username: usernameOrEmail, // data.get('username') or data.get('email') are checked
    password,
  });
  return response.data;
}

/**
 * Mendapatkan data profil pengguna yang login
 */
export async function apiGetProfile(): Promise<AuthResponse> {
  const response = await api.get<AuthResponse>('/api/auth/profile');
  return response.data;
}

/**
 * Logout pengguna
 */
export async function apiLogout(): Promise<{ message: string; status: number }> {
  const response = await api.post<{ message: string; status: number }>('/api/auth/logout');
  return response.data;
}


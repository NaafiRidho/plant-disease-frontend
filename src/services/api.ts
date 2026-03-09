import axios from 'axios';
import { PredictionResponse, ClassesResponse, HealthResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Interceptor untuk error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.error || 'Terjadi kesalahan pada server';
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

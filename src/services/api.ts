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

// ─── Dashboard API ──────────────────────────────────────────

import { DashboardData } from '@/types';

/** Mock data fallback for dashboard */
const MOCK_DASHBOARD: DashboardData = {
  stats: {
    totalScans: 3,
    alerts: 2,
    criticalAlerts: 2,
    healthIndex: 94,
  },
  scans: [
    {
      id: 1,
      name: 'Pothos N-Joy',
      status: 'healthy',
      statusLabel: 'HEALTHY',
      description: 'No pathogens detected...',
      timeAgo: '2 MINS AGO',
      emoji: '🌿',
      thumbBg: '#0a2a0a',
    },
    {
      id: 2,
      name: 'Ficus Lyrata',
      status: 'alert',
      statusLabel: 'ALERT',
      description: 'Early Blight Detected (74% confidence)',
      timeAgo: '18 MINS AGO',
      emoji: '🍃',
      thumbBg: '#1e180a',
    },
    {
      id: 3,
      name: 'System Calibration',
      status: 'system',
      statusLabel: 'SYSTEM',
      description: 'Sensor Node #124 recalibrated successfully.',
      timeAgo: '1 HOUR AGO',
      emoji: '🌱',
      thumbBg: '#0e0e22',
    },
  ],
  environmentals: {
    humidity: 68,
    temperature: 24.5,
    co2: 420,
    vpd: 0.95,
  },
  growthData: [
    { week: 'WEEK 01', value: 72 },
    { week: 'WEEK 02', value: 55 },
    { week: 'WEEK 03', value: 32 },
    { week: 'WEEK 04', value: 50 },
  ],
  monitor: {
    zone: 'A-04',
    plantName: 'Monstera Deliciosa Elite',
    photosynthesisRate: 98.2,
    stomataStatus: 'Optimal',
  },
  insightQuote:
    'Predicted biomass increase of 14.2% over the next 72 hours due to optimized nutrient injection in Zone A-04.',
};

export async function getDashboardData(): Promise<DashboardData> {
  return MOCK_DASHBOARD;
}

/**
 * Update profil pengguna yang sedang login
 */
export async function apiUpdateProfile(data: {
  username?: string;
  email?: string;
  fullname?: string;
  specialization?: string;
  location?: string;
  bio?: string;
  password?: string;
  old_password?: string;
}): Promise<AuthResponse> {
  const response = await api.put<AuthResponse>('/api/auth/profile', data);
  return response.data;
}

/**
 * Hapus satu riwayat deteksi berdasarkan ID
 */
export async function apiDeleteHistory(id: number): Promise<{ success: boolean; message: string }> {
  const response = await api.delete<{ success: boolean; message: string }>(`/api/detection-histories/${id}`);
  return response.data;
}

/**
 * Ambil daftar riwayat deteksi milik user (paginated)
 */
export async function apiGetHistories(params: {
  page?: number;
  per_page?: number;
  search?: string;
  plant_type?: string;
  is_healthy?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: string;
  order?: string;
}) {
  const response = await api.get('/api/detection-histories', { params });
  return response.data;
}

/**
 * Ambil statistik riwayat deteksi
 */
export async function apiGetHistoryStats() {
  const response = await api.get('/api/detection-histories/stats');
  return response.data;
}

/**
 * Ambil tren riwayat deteksi
 */
export async function apiGetHistoryTrend(period: string = 'monthly') {
  const response = await api.get('/api/detection-histories/trend', { params: { period } });
  return response.data;
}

/**
 * Ambil detail satu riwayat deteksi berdasarkan ID
 */
export async function apiGetHistoryDetail(id: number) {
  const response = await api.get(`/api/detection-histories/${id}`);
  return response.data;
}




// Tipe data untuk prediksi dari API
export interface PredictionItem {
  class: string;
  confidence: number;
  confidence_percent: number;
  name_id: string;
  plant: string;
  status: string;
  color: string;
}

export interface DiseaseInfo {
  name_id: string;
  plant: string;
  status: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  severity: string;
  color: string;
}

export interface PredictionResponse {
  success: boolean;
  predicted_class: string;
  confidence: number;
  confidence_percent: number;
  disease_info: DiseaseInfo;
  top_3: PredictionItem[];
  inference_time_ms: number;
  model_mode: "real" | "mock";
  mock_message?: string;
}

// Tipe untuk daftar kelas
export interface PlantClass {
  class_key: string;
  name_id: string;
  plant: string;
  status: string;
  severity: string;
  color: string;
}

export interface ClassesResponse {
  total: number;
  classes: PlantClass[];
}

// Tipe untuk health check
export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  model_mode: "real" | "mock";
  uptime_seconds: number;
  supported_classes: number;
  message: string;
}

// Status upload gambar
export type UploadStatus = "idle" | "uploading" | "success" | "error";

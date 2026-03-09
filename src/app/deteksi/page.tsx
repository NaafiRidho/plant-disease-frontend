'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, RotateCcw, AlertCircle } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import PredictionResult from '@/components/PredictionResult';
import DiseaseInfo from '@/components/DiseaseInfo';
import { predictDisease } from '@/services/api';
import { PredictionResponse } from '@/types';

export default function DeteksiPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Buat preview URL saat gambar dipilih
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [selectedImage]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    setError(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictDisease(selectedImage);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Gagal melakukan deteksi. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '4rem' }}>
      {/* Page header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(34,197,94,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(34,197,94,0.08)',
        padding: '2.5rem 0 2rem',
        marginBottom: '2.5rem',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Scan size={18} color="#4ade80" />
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
                <span className="gradient-text">Deteksi Penyakit</span> Tanaman
              </h1>
            </div>
            <p style={{ color: 'rgba(134,239,172,0.65)', fontSize: '0.9rem' }}>
              Upload foto daun tanaman untuk mendeteksi penyakit secara otomatis menggunakan AI
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1fr' : '600px',
          justifyContent: 'center',
          gap: '1.5rem',
          transition: 'all 0.3s ease',
        }}
          className="detection-grid"
        >
          {/* Kolom kiri: upload + kontrol */}
          <div>
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
                Upload Gambar Daun
              </h2>
              <ImageUploader
                onImageSelect={handleImageSelect}
                onClear={handleClear}
                selectedImage={selectedImage}
                previewUrl={previewUrl}
                isLoading={isLoading}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    color: '#f87171',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: '10px' }}
              >
                <button
                  id="detect-btn"
                  onClick={handleDetect}
                  disabled={isLoading}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.9rem' }}
                >
                  {isLoading ? (
                    <>
                      <span style={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Scan size={17} />
                      Deteksi Sekarang
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="btn-secondary"
                  style={{ padding: '0.9rem 1.25rem' }}
                >
                  <RotateCcw size={16} />
                </button>
              </motion.div>
            )}

            {/* Tips */}
            {!selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                style={{ padding: '1.25rem', marginTop: '1rem' }}
              >
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(134,239,172,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  Tips Foto Terbaik
                </p>
                {[
                  'Foto daun dengan pencahayaan yang cukup dan terang',
                  'Pastikan gambar fokus dan tidak buram',
                  'Ambil dari jarak dekat agar detail terlihat jelas',
                  'Gunakan latar belakang yang kontras jika memungkinkan',
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.8rem', color: 'rgba(240,253,244,0.55)' }}>
                    <span style={{ color: '#22c55e', fontSize: '0.6rem' }}>●</span>
                    {tip}
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Kolom kanan: hasil */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.4 }}
              >
                <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
                  Hasil Deteksi
                </h2>
                <PredictionResult result={result} />
                <div style={{ marginTop: '1.25rem' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
                    Informasi Penyakit
                  </h2>
                  <DiseaseInfo info={result.disease_info} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .detection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

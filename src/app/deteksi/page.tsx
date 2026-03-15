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
        background: 'linear-gradient(180deg, rgba(34,197,94,0.08) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(34,197,94,0.12)',
        padding: '3rem 0 2.5rem',
        marginBottom: '2.5rem',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: 'rgba(34,197,94,0.14)',
                border: '1px solid rgba(34,197,94,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px rgba(34,197,94,0.15)',
              }}>
                <Scan size={22} color="#4ade80" />
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 800, margin: 0 }}>
                <span className="gradient-text">Deteksi Penyakit</span> Tanaman
              </h1>
            </div>
            <p style={{ color: 'rgba(134,239,172,0.75)', fontSize: '0.95rem' }}>
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
            <div className="glass-card card-shine" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
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
                className="glass-card card-shine"
                style={{ padding: '1.35rem', marginTop: '1.25rem' }}
              >
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(134,239,172,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
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
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
                  Hasil Deteksi
                </h2>
                <PredictionResult result={result} />
                <div style={{ marginTop: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
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

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, RotateCcw, AlertCircle, Sparkles, LogIn, UserPlus, CheckCircle2, Database } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ImageUploader from '@/components/ImageUploader';
import PredictionResult from '@/components/PredictionResult';
import DiseaseInfo from '@/components/DiseaseInfo';
import { predictDisease } from '@/services/api';
import { PredictionResponse } from '@/types';
import { useAuth } from '@/components/AuthContext';

// ── Simpan gambar ke sessionStorage sebagai Base64 ──────────────────────────
function saveImageToSession(file: File): Promise<void> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        sessionStorage.setItem('pendingImage', reader.result as string);
        sessionStorage.setItem('pendingImageName', file.name);
        sessionStorage.setItem('pendingImageType', file.type);
      } catch (e) {
        // sessionStorage penuh — abaikan
      }
      resolve();
    };
    reader.readAsDataURL(file);
  });
}

// ── Ambil gambar dari sessionStorage ────────────────────────────────────────
async function loadImageFromSession(): Promise<File | null> {
  try {
    const b64 = sessionStorage.getItem('pendingImage');
    const name = sessionStorage.getItem('pendingImageName') || 'image.jpg';
    const type = sessionStorage.getItem('pendingImageType') || 'image/jpeg';
    if (!b64) return null;
    const res = await fetch(b64);
    const blob = await res.blob();
    return new File([blob], name, { type });
  } catch {
    return null;
  }
}

// ── Hapus gambar pending dari sessionStorage ─────────────────────────────────
function clearPendingImage() {
  sessionStorage.removeItem('pendingImage');
  sessionStorage.removeItem('pendingImageName');
  sessionStorage.removeItem('pendingImageType');
}

// ── Komponen utama halaman (inner — butuh Suspense karena useSearchParams) ───
function DeteksiPageInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const isRescan = searchParams.get('rescan') === '1';

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAutoScanning, setIsAutoScanning] = useState(false);

  const autoScanTriggered = useRef(false);

  // Buat preview URL saat gambar dipilih
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [selectedImage]);

  // ── Auto-rescan setelah login ────────────────────────────────────────────
  useEffect(() => {
    if (!isRescan || !user || autoScanTriggered.current) return;
    autoScanTriggered.current = true;

    async function doAutoRescan() {
      setIsAutoScanning(true);
      const file = await loadImageFromSession();
      if (!file) {
        setIsAutoScanning(false);
        return;
      }

      setSelectedImage(file);
      setError(null);
      setIsLoading(true);

      try {
        const data = await predictDisease(file);
        setResult(data);
        // Hapus pending image dari session setelah berhasil
        clearPendingImage();
      } catch (err: any) {
        setError(err.message || 'Gagal melakukan deteksi. Coba lagi.');
      } finally {
        setIsLoading(false);
        setIsAutoScanning(false);
      }
    }

    doAutoRescan();
  }, [isRescan, user]);

  const handleImageSelect = useCallback(async (file: File) => {
    setSelectedImage(file);
    setResult(null);
    setError(null);
    // Simpan gambar ke session untuk antisipasi login
    await saveImageToSession(file);
  }, []);

  const handleClear = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    clearPendingImage();
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictDisease(selectedImage);
      setResult(data);
      // Jika user sudah login, hapus pending image dari session
      if (user) clearPendingImage();
    } catch (err: any) {
      setError(err.message || 'Gagal melakukan deteksi. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <div style={{ backgroundColor: '#020b14', color: '#f0fdf4', minHeight: '100vh', paddingTop: '88px', paddingBottom: '4rem', fontFamily: 'sans-serif' }}>
      {/* Page header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(34,197,94,0.05) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
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
              {isAuthenticated && (
                <span style={{
                  marginLeft: '10px',
                  padding: '2px 10px',
                  borderRadius: 100,
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  fontSize: '0.78rem',
                  color: '#4ade80',
                  fontWeight: 600,
                }}>
                  ✓ Hasil tersimpan otomatis
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">

        {/* ── Banner auto-rescan sedang berjalan ── */}
        <AnimatePresence>
          {isAutoScanning && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                marginBottom: '1.5rem',
                borderRadius: 12,
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: '#4ade80',
                fontSize: '0.9rem',
              }}
            >
              <span style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
                animation: 'pulse-green 1.2s infinite',
                flexShrink: 0,
              }} />
              <span style={{ fontWeight: 600 }}>Memuat gambar Anda dan menjalankan deteksi ulang dengan akun terverifikasi...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Banner CTA untuk guest yang sudah punya hasil ── */}
        <AnimatePresence>
          {result && !isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginBottom: '1.75rem',
                padding: '1.25rem 1.5rem',
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(16,185,129,0.08))',
                border: '1px solid rgba(34,197,94,0.3)',
                boxShadow: '0 4px 24px rgba(34,197,94,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Sparkles size={20} color="#4ade80" />
                </div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f0fdf4', marginBottom: '6px' }}>
                    Prediksi selesai! Login untuk hasil lengkap
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                      'Lihat gejala, penanganan & info detail penyakit',
                      'Simpan riwayat deteksi ke akun Anda',
                      'Langsung tampil tanpa scan ulang',
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem', color: 'rgba(134,239,172,0.75)' }}>
                        <CheckCircle2 size={13} color="#22c55e" style={{ flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link
                    href="/login?returnUrl=/deteksi"
                    className="btn-primary"
                    style={{ padding: '9px 18px', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                  >
                    <LogIn size={15} />
                    Login & Lihat Detail
                  </Link>
                  <Link
                    href="/register"
                    className="btn-secondary"
                    style={{ padding: '9px 16px', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                  >
                    <UserPlus size={15} />
                    Daftar
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Badge tersimpan ke DB untuk user login ── */}
        <AnimatePresence>
          {result && isAuthenticated && result.detection_id && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                marginBottom: '1.5rem',
                borderRadius: 10,
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                fontSize: '0.82rem',
                color: '#4ade80',
              }}
            >
              <Database size={14} style={{ flexShrink: 0 }} />
              <span>Hasil deteksi tersimpan ke riwayat akun Anda (ID #{result.detection_id})</span>
            </motion.div>
          )}
        </AnimatePresence>

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

                {/* Info login untuk guest */}
                {!isAuthenticated && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'rgba(34,197,94,0.06)',
                    border: '1px solid rgba(34,197,94,0.15)',
                    fontSize: '0.78rem',
                    color: 'rgba(134,239,172,0.7)',
                    lineHeight: 1.5,
                  }}>
                    💡 <strong style={{ color: '#4ade80' }}>Tips:</strong> Login sebelum deteksi untuk menyimpan riwayat dan melihat detail penyakit lengkap.{' '}
                    <Link href="/login?returnUrl=/deteksi" style={{ color: '#4ade80', textDecoration: 'underline', fontWeight: 600 }}>
                      Login sekarang
                    </Link>
                  </div>
                )}
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
                {/* PredictionResult: top3 dikunci untuk guest */}
                <PredictionResult result={result} isAuthenticated={isAuthenticated} />
                <div style={{ marginTop: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f0fdf4' }}>
                    Informasi Penyakit
                  </h2>
                  {/* DiseaseInfo: detail dikunci untuk guest */}
                  <DiseaseInfo info={result.disease_info} isAuthenticated={isAuthenticated} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 900px) {
          .detection-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Export default dengan Suspense ────────────────────────────────────────────
export default function DeteksiPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#4ade80' }}>Memuat halaman deteksi...</span>
      </div>
    }>
      <DeteksiPageInner />
    </Suspense>
  );
}

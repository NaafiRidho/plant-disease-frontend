'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImagePlus, X, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
  selectedImage: File | null;
  previewUrl: string | null;
  isLoading: boolean;
}

export default function ImageUploader({
  onImageSelect,
  onClear,
  selectedImage,
  previewUrl,
  isLoading,
}: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('Ukuran file terlalu besar. Maksimum 10 MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024, // 10 MB
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div>
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          // Dropzone
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              {...getRootProps()}
              id="image-dropzone"
              style={{
                border: `2px dashed ${isDragActive ? 'rgba(74,222,128,0.6)' : 'rgba(34,197,94,0.28)'}`,
                borderRadius: 18,
                padding: '3rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragActive
                  ? 'rgba(34,197,94,0.08)'
                  : 'rgba(8,22,12,0.6)',
                transition: 'all 0.3s ease',
                outline: 'none',
                boxShadow: isDragActive ? '0 0 30px rgba(34,197,94,0.12)' : '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={(e) => {
                if (!isDragActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.5)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.06)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(34,197,94,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDragActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.28)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(8,22,12,0.6)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                }
              }}
            >
              <input {...getInputProps()} id="file-input" />

              {/* Icon */}
              <motion.div
                animate={{ y: isDragActive ? -8 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 0 30px rgba(34,197,94,0.1)',
                }}>
                  {isDragActive
                    ? <Upload size={32} color="#4ade80" />
                    : <ImagePlus size={32} color="#4ade80" />
                  }
                </div>
              </motion.div>

              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f0fdf4', marginBottom: '0.5rem' }}>
                {isDragActive ? 'Lepaskan gambar di sini...' : 'Seret & lepas gambar di sini'}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(134,239,172,0.6)', marginBottom: '1.25rem' }}>
                atau klik untuk memilih file
              </p>
              <span className="badge badge-green">JPG, PNG, WEBP • Maks. 10 MB</span>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '0.75rem',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171',
                    fontSize: '0.875rem',
                  }}
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Preview gambar
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(34,197,94,0.2)',
              background: '#0a1a0f',
              position: 'relative',
            }}>
              <img
                src={previewUrl}
                alt="Preview daun tanaman"
                id="image-preview"
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: 'block',
                  filter: isLoading ? 'brightness(0.5)' : 'none',
                  transition: 'filter 0.3s',
                }}
              />

              {/* Scanning overlay */}
              {isLoading && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}>
                  <div style={{
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
                    position: 'absolute',
                    animation: 'scan 2s ease-in-out infinite',
                  }} />
                  <div style={{
                    padding: '8px 16px',
                    background: 'rgba(5,14,8,0.9)',
                    border: '1px solid rgba(34,197,94,0.4)',
                    borderRadius: 100,
                    color: '#4ade80',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#22c55e',
                      display: 'inline-block',
                      animation: 'pulse-green 1.2s infinite',
                    }} />
                    Menganalisis gambar...
                  </div>
                </div>
              )}

              {/* Image info bar */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '10px 14px',
                background: 'linear-gradient(to top, rgba(5,14,8,0.95), transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(134,239,172,0.8)', fontWeight: 500 }}>
                  {selectedImage?.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(134,239,172,0.5)' }}>
                  {selectedImage ? `${(selectedImage.size / 1024).toFixed(0)} KB` : ''}
                </span>
              </div>
            </div>

            {/* Clear button */}
            {!isLoading && (
              <button
                onClick={onClear}
                id="clear-image-btn"
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(5,14,8,0.9)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#f87171',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(5,14,8,0.9)';
                }}
              >
                <X size={16} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

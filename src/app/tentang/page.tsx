'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Code2, HelpCircle } from 'lucide-react';
import { getClasses, checkHealth } from '@/services/api';
import { PlantClass, HealthResponse } from '@/types';

export default function TentangPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    checkHealth().then(setHealth).catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '88px', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(34,197,94,0.08) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(34,197,94,0.12)',
        padding: '3rem 0 2.5rem',
        marginBottom: '2.5rem',
      }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(34,197,94,0.12)' }}>
                <HelpCircle size={22} color="#4ade80" />
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 800, margin: 0 }}>
                <span className="gradient-text">Tentang</span> Sistem
              </h1>
            </div>
            <p style={{ color: 'rgba(134,239,172,0.75)', fontSize: '0.95rem' }}>
              Informasi sistem dan dataset yang digunakan
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="about-grid">

          {/* Kolom kiri */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Tentang sistem */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="glass-card card-shine" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Brain size={20} color="#4ade80" />
                <h2 style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>Tentang Sistem</h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(240,253,244,0.7)', lineHeight: 1.7, marginBottom: '1rem' }}>
                <strong style={{ color: '#f0fdf4' }}>PlantScan AI</strong> adalah sistem deteksi penyakit tanaman berbasis
                kecerdasan buatan yang menggunakan arsitektur <strong style={{ color: '#4ade80' }}>MobileNetV2</strong> dengan
                pendekatan <em>transfer learning</em>. Model dilatih menggunakan dataset PlantVillage yang berisi
                lebih dari 87.000 gambar daun tanaman dari berbagai kondisi.
              </p>
            </motion.div>

            {/* Dataset info */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Database size={20} color="#60a5fa" />
                <h2 style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>Dataset PlantVillage</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                {[
                  { label: 'Total Gambar', value: '87.000+' },
                  { label: 'Jumlah Kelas', value: '15 kelas' },
                  { label: 'Jenis Tanaman', value: '3 tanaman' },
                  { label: 'Format', value: 'JPG, RGB' },
                ].map((item) => (
                  <div key={item.label} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(134,239,172,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ fontSize: '0.95rem', color: '#f0fdf4', fontWeight: 700 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="glass-card card-shine" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Code2 size={20} color="#f472b6" />
                <h2 style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>Teknologi yang Digunakan</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { category: 'ML Model', tech: 'TensorFlow + MobileNetV2 (Transfer Learning)', color: '#f97316' },
                  { category: 'Backend', tech: 'Python + Flask + Flask-CORS', color: '#60a5fa' },
                  { category: 'Frontend', tech: 'Next.js 14 + TypeScript + Framer Motion', color: '#4ade80' },
                ].map((item) => (
                  <div key={item.category} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: item.color, minWidth: 70, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category}</span>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(240,253,244,0.7)' }}>{item.tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Kolom kanan: status server */}
          <div>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '1.25rem', position: 'sticky', top: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: health?.status === 'ok' ? '#22c55e' : '#ef4444',
                  boxShadow: health?.status === 'ok' ? '0 0 8px #22c55e' : '0 0 8px #ef4444',
                  animation: 'pulse-green 1.5s infinite',
                }} />
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>Status Server</h3>
              </div>

              {health ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'Status', value: health.status === 'ok' ? '✅ Online' : '❌ Offline' },
                    { label: 'Model', value: health.model_mode === 'real' ? '🟢 Terlatih' : '🟡 Mock' },
                    { label: 'Uptime', value: `${Math.floor(health.uptime_seconds / 60)} menit` },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 0', borderBottom: '1px solid rgba(34,197,94,0.08)' }}>
                      <span style={{ color: 'rgba(134,239,172,0.5)' }}>{item.label}</span>
                      <span style={{ color: '#f0fdf4', fontWeight: 600 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'rgba(134,239,172,0.4)' }}>Memuat status...</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
} 
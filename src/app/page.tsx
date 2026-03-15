'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Leaf, Scan, BookOpen, Shield, Zap, Camera,
  ArrowRight, CheckCircle, FlaskConical
} from 'lucide-react';

// ----- Data -----
const stats = [
  { value: '15', label: 'Jenis Penyakit', sub: 'yang dapat dideteksi' },
  { value: '3', label: 'Jenis Tanaman', sub: 'Paprika, Kentang, Tomat' },
  { value: '87K+', label: 'Gambar Dataset', sub: 'PlantVillage dataset' },
  { value: '95%+', label: 'Target Akurasi', sub: 'pada data validasi' },
];

const features = [
  {
    icon: <Camera size={22} color="#4ade80" />,
    title: 'Upload Mudah',
    desc: 'Drag & drop atau klik untuk upload. Mendukung JPG, PNG, dan WEBP hingga 10 MB.',
  },
  {
    icon: <Zap size={22} color="#facc15" />,
    title: 'Deteksi Instan',
    desc: 'Hasil prediksi penyakit dalam hitungan detik menggunakan model CNN MobileNetV2.',
  },
  {
    icon: <BookOpen size={22} color="#60a5fa" />,
    title: 'Info Lengkap',
    desc: 'Dapatkan gejala, deskripsi, dan panduan penanganan untuk setiap penyakit yang terdeteksi.',
  },
  {
    icon: <Shield size={22} color="#f472b6" />,
    title: 'Analisis Akurat',
    desc: 'Dilatih menggunakan ribuan gambar dari dataset PlantVillage yang diakui secara ilmiah.',
  },
];

const plants = [
  { name: 'Tomat', icon: '🍅', count: 10, diseases: ['Bacterial spot', 'Early blight', 'Late blight', 'Leaf Mold', '+6 lainnya'] },
  { name: 'Kentang', icon: '🥔', count: 3, diseases: ['Early blight', 'Late blight', 'Healthy'] },
  { name: 'Paprika', icon: '🫑', count: 2, diseases: ['Bacterial spot', 'Healthy'] },
];

function StatCard({ value, label, sub, index }: { value: string; label: string; sub: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card card-shine"
      style={{ padding: '1.75rem 1.5rem', textAlign: 'center' }}
    >
      <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }} className="gradient-text">
        {value}
      </div>
      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f0fdf4', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(134,239,172,0.55)' }}>{sub}</div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* ── HERO ── */}
      <section style={{
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }} className="grid-bg">
        <div className="hero-glow" aria-hidden />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,128,61,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.75rem' }}
            >
              <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '8px 16px', boxShadow: '0 0 20px rgba(34,197,94,0.15)' }}>
                <FlaskConical size={14} />
                &nbsp;Powered by MobileNetV2 + Transfer Learning
              </span>
            </motion.div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.75rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              Deteksi{' '}
              <span className="gradient-text">Penyakit Tanaman</span>
              <br />dengan Kecerdasan Buatan
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(134,239,172,0.78)',
              lineHeight: 1.75,
              maxWidth: 560,
              margin: '0 auto 2.5rem',
            }}>
              Upload foto daun tanaman kamu dan biarkan AI kami mendiagnosis penyakit secara instan.
              Dilengkapi informasi lengkap dan panduan penanganan.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/deteksi" className="btn-primary" style={{ fontSize: '1rem', padding: '0.95rem 2.1rem' }} id="hero-cta-detect">
                <Scan size={18} />
                Mulai Deteksi
                <ArrowRight size={16} />
              </Link>
              <Link href="/tentang" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.95rem 2.1rem' }}>
                <BookOpen size={16} />
                Pelajari Sistem
              </Link>
            </div>

            {/* Supported plants - pills */}
            <div style={{ marginTop: '2.75rem', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['🍅 Tomat', '🥔 Kentang', '🫑 Paprika'].map((plant, i) => (
                <motion.span
                  key={plant}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 100,
                    background: 'rgba(34,197,94,0.09)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    fontSize: '0.875rem',
                    color: 'rgba(134,239,172,0.85)',
                    fontWeight: 500,
                  }}
                >
                  {plant}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.1)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}>
            {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.06)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Fitur <span className="gradient-text">Unggulan</span>
            </h2>
            <p style={{ color: 'rgba(134,239,172,0.6)', maxWidth: 500, margin: '0 auto', fontSize: '0.95rem' }}>
              Teknologi terkini untuk membantu petani dan peneliti mendiagnosis penyakit tanaman
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card card-shine"
                style={{ padding: '1.75rem' }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(34,197,94,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem', color: '#f0fdf4' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(134,239,172,0.6)', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TANAMAN DIDUKUNG ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.06)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Tanaman yang <span className="gradient-text">Didukung</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {plants.map((plant, i) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card card-shine"
                style={{ padding: '1.75rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2.25rem' }}>{plant.icon}</span>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f0fdf4', marginBottom: '4px' }}>{plant.name}</h3>
                    <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>{plant.count} kelas</span>
                  </div>
                </div>
                {plant.diseases.map((d) => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', color: 'rgba(240,253,244,0.6)' }}>
                    <CheckCircle size={13} color="#22c55e" />
                    {d}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section style={{ padding: '5.5rem 0', borderTop: '1px solid rgba(34,197,94,0.08)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card card-shine"
            style={{
              padding: '4rem 2.5rem',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(12,28,18,0.95), rgba(8,20,12,0.98))',
              maxWidth: 660,
              margin: '0 auto',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem' }}>🌿</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 1.9rem)', marginBottom: '0.75rem' }}>
              Siap mendeteksi <span className="gradient-text">penyakit tanaman</span>?
            </h2>
            <p style={{ color: 'rgba(134,239,172,0.6)', marginBottom: '2rem', fontSize: '1rem' }}>
              Upload foto daun sekarang dan dapatkan diagnosis instan
            </p>
            <Link href="/deteksi" className="btn-primary" style={{ fontSize: '1rem', padding: '0.95rem 2.5rem' }} id="bottom-cta-detect">
              <Scan size={18} />
              Mulai Deteksi Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(34,197,94,0.1)',
        padding: '2.5rem 0',
        textAlign: 'center',
        background: 'rgba(3,10,5,0.5)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <Leaf size={18} color="#22c55e" />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#4ade80', fontSize: '1.05rem' }}>PlantScan AI</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(134,239,172,0.4)' }}>
            Sistem Deteksi Penyakit Tanaman • Dataset PlantVillage
          </p>
        </div>
      </footer>
    </div>
  );
}

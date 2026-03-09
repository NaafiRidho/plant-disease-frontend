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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card"
      style={{ padding: '1.5rem', textAlign: 'center' }}
    >
      <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }} className="gradient-text">
        {value}
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f0fdf4', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '0.75rem', color: 'rgba(134,239,172,0.5)' }}>{sub}</div>
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
        {/* Decorative glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}
            >
              <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                <FlaskConical size={12} />
                &nbsp;Powered by MobileNetV2 + Transfer Learning
              </span>
            </motion.div>

            {/* Heading */}
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Deteksi{' '}
              <span className="gradient-text">Penyakit Tanaman</span>
              <br />dengan Kecerdasan Buatan
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'rgba(134,239,172,0.7)',
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto 2.5rem',
            }}>
              Upload foto daun tanaman kamu dan biarkan AI kami mendiagnosis penyakit secara instan.
              Dilengkapi informasi lengkap dan panduan penanganan.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/deteksi" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }} id="hero-cta-detect">
                <Scan size={18} />
                Mulai Deteksi
                <ArrowRight size={16} />
              </Link>
              <Link href="/tentang" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
                <BookOpen size={16} />
                Pelajari Sistem
              </Link>
            </div>

            {/* Supported plants */}
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['🍅 Tomat', '🥔 Kentang', '🫑 Paprika'].map((plant) => (
                <span key={plant} style={{
                  padding: '6px 14px',
                  borderRadius: 100,
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.15)',
                  fontSize: '0.825rem',
                  color: 'rgba(134,239,172,0.7)',
                }}>
                  {plant}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.08)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.06)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Fitur <span className="gradient-text">Unggulan</span>
            </h2>
            <p style={{ color: 'rgba(134,239,172,0.55)', maxWidth: 480, margin: '0 auto' }}>
              Teknologi terkini untuk membantu petani dan peneliti mendiagnosis penyakit tanaman
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '1.5rem' }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#f0fdf4' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(134,239,172,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TANAMAN DIDUKUNG ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.06)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Tanaman yang <span className="gradient-text">Didukung</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {plants.map((plant, i) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card"
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{plant.icon}</span>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#f0fdf4', marginBottom: '2px' }}>{plant.name}</h3>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{plant.count} kelas</span>
                  </div>
                </div>
                {plant.diseases.map((d) => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.8rem', color: 'rgba(240,253,244,0.55)' }}>
                    <CheckCircle size={12} color="#22c55e" />
                    {d}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(34,197,94,0.06)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '3.5rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(15,30,18,0.9), rgba(10,20,14,0.95))',
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <h2 style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              Siap mendeteksi <span className="gradient-text">penyakit tanaman</span>?
            </h2>
            <p style={{ color: 'rgba(134,239,172,0.55)', marginBottom: '2rem' }}>
              Upload foto daun sekarang dan dapatkan diagnosis instan
            </p>
            <Link href="/deteksi" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }} id="bottom-cta-detect">
              <Scan size={18} />
              Mulai Deteksi Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(34,197,94,0.08)',
        padding: '2rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <Leaf size={16} color="#22c55e" />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#4ade80', fontSize: '1rem' }}>PlantScan AI</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(134,239,172,0.35)' }}>
            Sistem Deteksi Penyakit Tanaman • Dataset PlantVillage
          </p>
        </div>
      </footer>
    </div>
  );
}

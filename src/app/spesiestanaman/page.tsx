'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Activity } from 'lucide-react';
// Import Link dari Next.js untuk handling navigasi client-side
import Link from 'next/link';
import Image from 'next/image';
import { getClasses, checkHealth } from '@/services/api';
import { PlantClass, HealthResponse } from '@/types';

// IMPORT ASSET GAMBAR: Diambil langsung dari folder spesiestanaman yang sama
import imgPaprika from './bellpepper.png';
import imgKentang from './potato.png';
import imgTomat from './tomato.png';

export default function SpesiesTanamanPage() {
  const [classes, setClasses] = useState<PlantClass[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  useEffect(() => {
    getClasses().then((data) => setClasses(data.classes)).catch(() => {});
    checkHealth().then(setHealth).catch(() => {});
  }, []);

  const plants = ['Semua', 'Paprika', 'Kentang', 'Tomat'];
  const filtered = activeFilter === 'Semua'
    ? classes
    : classes.filter((c) => c.plant === activeFilter);

  const severityBadgeClass = (s: string) => {
    if (s === 'Sangat Tinggi' || s === 'Tinggi') return 'badge-red';
    if (s === 'Sedang') return 'badge-orange';
    if (s === 'Tidak ada') return 'badge-green';
    return 'badge-green';
  };

  // Menambahkan properti gambar dan warna tema kustom untuk efek pendaran (glow)
  const spesifikSpesies = [
    {
      nama: 'Tomat',
      latin: 'Solanum lycopersicum',
      deskripsi: 'Analisis mendalam terhadap sistem vaskular tanaman tomat untuk pencegahan penyakit dini dan pertumbuhan buah yang optimal.',
      glowColor: '#f87171', // Merah untuk Tomat
      gambar: imgTomat,
      href: '/spesiestanaman/tomat',
      iconStyle: {
        background: 'radial-gradient(circle, rgba(248,113,113,0.15) 0%, transparent 70%)',
        border: '1px solid rgba(248,113,113,0.3)',
      }
    },
    {
      nama: 'Kentang',
      latin: 'Solanum tuberosum',
      deskripsi: 'Monitor kualitas tuber dan kesehatan daun untuk memastikan ketahanan pangan melalui identifikasi patogen kentang yang cepat.',
      glowColor: '#eab308', // Amber/Kuning untuk Kentang
      gambar: imgKentang,
      href: '/spesiestanaman/kentang',
      iconStyle: {
        background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 70%)',
        border: '1px solid rgba(234,179,8,0.3)',
      }
    },
    {
      nama: 'Paprika',
      latin: 'Capsicum annuum',
      deskripsi: 'Sistem deteksi dini untuk hama kutu daun dan virus mosaik, memastikan hasil panen paprika yang berkualitas dan estetis.',
      glowColor: '#4ade80', // Hijau untuk Paprika
      gambar: imgPaprika,
      href: '/spesiestanaman/paprika',
      iconStyle: {
        background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)',
        border: '1px solid rgba(74,222,128,0.3)',
      }
    }
  ];

  return (
    <div style={{ backgroundColor: '#020b14', color: '#f0fdf4', minHeight: '100vh', paddingTop: '88px', paddingBottom: '4rem', fontFamily: 'sans-serif' }}>
      
      {/* Header bergaya PlantScan AI (Centered) */}
      <div style={{ padding: '4rem 0 2rem', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', padding: '4px 12px', borderRadius: '100px', marginBottom: '1rem' }}>
              <span style={{ width: 6, height: 6, backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Botanical Intelligence</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, margin: '0 0 1rem 0', color: '#ffffff' }}>
              3 Spesies Utama
            </h1>
            <p style={{ color: 'rgba(240,253,244,0.6)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Didukung oleh Database Terverifikasi, platform kami mengoptimalkan kesehatan tanaman melalui pemindaian AI real-time dengan akurasi tingkat tinggi.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* SEKSI 1: Tampilan 3 Kartu Spesies Utama Sesuai Gambar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {spesifikSpesies.map((spesies, idx) => (
            <motion.div
              key={spesies.nama}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              style={{
                background: 'linear-gradient(145deg, rgba(10,25,41,0.7) 0%, rgba(3,14,26,0.9) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ borderColor: 'rgba(34,197,94,0.3)', translateY: -5, boxShadow: '0 25px 50px rgba(34,197,94,0.08)' }}
            >
              {/* Telemetri Status Online Mini */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '3px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <Activity size={10} color={spesies.glowColor} />
                <span style={{ fontSize: '0.55rem', fontWeight: 800, color: spesies.glowColor, letterSpacing: '0.05em' }}>ONLINE</span>
              </div>

              {/* CONTAINER INTEGRASI GAMBAR REAL-TIME */}
              <div style={{ 
                width: '100%', 
                height: '180px', 
                borderRadius: '16px', 
                backgroundColor: 'rgba(2,11,20,0.4)',
                border: '1px solid rgba(255,255,255,0.03)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
              }}>
                {/* Efek Pendaran Dinamis di Belakang Tanaman */}
                <div style={{
                  position: 'absolute',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: spesies.glowColor,
                  opacity: 0.08,
                  filter: 'blur(30px)',
                  zIndex: 0
                }} />
                
                {/* Komponen Image Next.js */}
                <Image 
                  src={spesies.gambar}
                  alt={`Visualisasi data ${spesies.nama}`}
                  unoptimized
                  style={{
                    width: 'auto',
                    height: '85%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                    zIndex: 1
                  }}
                />
              </div>

              {/* Detail Teks Spesies */}
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: spesies.glowColor, margin: '0 0 0.25rem 0' }}>
                {spesies.nama}
              </h2>
              <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'rgba(240,253,244,0.4)', margin: '0 0 1.25rem 0', letterSpacing: '0.03em' }}>
                {spesies.latin}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,253,244,0.6)', lineHeight: 1.6, marginBottom: '2rem', minHeight: '70px' }}>
                {spesies.deskripsi}
              </p>

              {/* Tombol Pelajari Lebih Lanjut */}
              <Link href={spesies.href} passHref style={{ width: '100%', textDecoration: 'none', marginTop: 'auto' }}>
                <button style={{
                  width: '100%',
                  padding: '10px 0',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(240,253,244,0.7)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(34,197,94,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                  e.currentTarget.style.color = '#4ade80';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'rgba(240,253,244,0.7)';
                }}
                >
                  Pelajari Lebih Lanjut
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(34,197,94,0.1)', margin: '4rem 0' }} />
 
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        .container {
          width: 100%;
          max-width: 1200px;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem;
        }
      `}</style>
    </div>
  );
}
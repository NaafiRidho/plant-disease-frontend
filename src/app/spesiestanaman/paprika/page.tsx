'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Droplets, FlaskConical, AlertTriangle, Activity } from 'lucide-react';
import { getClasses, checkHealth } from '@/services/api';
import { PlantClass, HealthResponse } from '@/types';

// Pastikan file gambar paprika ada di folder yang sama
import gambarPaprika from './paprika.png';

export default function TentangPaprikaPage() {
  const [classes, setClasses] = useState<PlantClass[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [classesData, healthData] = await Promise.all([getClasses(), checkHealth()]);
        if (isMounted) {
          setClasses(classesData.classes);
          setHealth(healthData);
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ backgroundColor: '#020b14', color: '#f0fdf4', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem', fontFamily: 'sans-serif' }}>
      
      {/* HEADER UTAMA */}
      <div className="container" style={{ marginBottom: '2.5rem' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(180deg, rgba(20, 48, 6, 0.4) 0%, rgba(2, 11, 20, 0.9) 100%)', border: '1px solid rgba(74, 222, 128, 0.15)', borderRadius: '24px', padding: '3rem', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '340px' }}>
          
          <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: 'rgba(74, 222, 128, 0.05)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />
          
          <div style={{ zIndex: 1, maxWidth: '55%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', padding: '4px 12px', borderRadius: '100px', marginBottom: '1.25rem' }}>
              <span style={{ width: 6, height: 6, backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80' }}></span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium Bio-Analysis</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>Paprika</h1>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(240,253,244,0.4)', margin: '0 0 1.5rem 0' }}>Capsicum annuum</p>
          </div>

          <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(10, 25, 41, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4ade80' }}>89%</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Index Kesehatan</div>
          </div>

          <div style={{ zIndex: 1, width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ position: 'relative', width: '280px', height: '220px' }}>
              <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)', filter: 'blur(15px)', zIndex: 0 }} />
              <Image src={gambarPaprika} alt="Analisis Bio-Digital Paprika" width={280} height={220} style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} priority />
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEKSI UTAMA */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 2rem 0' }}><Leaf size={20} color="#4ade80" /> Profil Botani</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Asal Usul</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f0fdf4' }}>Meksiko & Amerika Tengah</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Klasifikasi</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f0fdf4' }}>Solanaceae / Capsicum</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Siklus Tumbuh</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4ade80' }}>14 - 18 Minggu</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,253,244,0.5)' }}>Tahap saat ini: Pembesaran Buah & Pematangan Warna.</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '2px solid #4ade80', borderRadius: '24px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 2rem 0' }}><Activity size={20} color="#4ade80" /> Analisis AI</h2>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Fase Saat Ini</span>
            <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 600 }}>Fruit Maturation</span>
          </div>
          {/* Metrik... */}
        </div>
      </div>

      {/* DIAGNOSTIK */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: '0 0 2rem 0' }}>Perpustakaan Diagnostik</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {['Anthracnose', 'Bacterial Spot', 'Aphids'].map((p, i) => (
              <div key={i}>
                <div style={{ width: '100%', height: '110px', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '10px' }} />
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{p}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#4ade80', marginBottom: '1.5rem' }}>Rekomendasi AI</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '10px' }}><Droplets size={18} color="#4ade80" /><span>Kontrol kelembaban udara untuk mencegah busuk buah.</span></div>
            <div style={{ display: 'flex', gap: '10px' }}><FlaskConical size={18} color="#4ade80" /><span>Tambahkan Magnesium untuk kesehatan daun.</span></div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
      `}</style>
    </div>
  );
}
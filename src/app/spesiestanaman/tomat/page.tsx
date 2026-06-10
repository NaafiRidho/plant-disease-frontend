'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Droplets, FlaskConical, AlertTriangle, Activity } from 'lucide-react';
import { getClasses, checkHealth } from '@/services/api';
import { PlantClass, HealthResponse } from '@/types';

// Mengimpor aset gambar tomat dari folder yang sama
import gambarTomat from './tomat.png';

export default function TentangPage() {
  const [classes, setClasses] = useState<PlantClass[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    getClasses().then((data) => setClasses(data.classes)).catch(() => {});
    checkHealth().then(setHealth).catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: '#020b14', color: '#f0fdf4', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem', fontFamily: 'sans-serif' }}>
      
      {/* HEADER UTAMA DASBOR */}
      <div className="container" style={{ marginBottom: '2.5rem' }}>
        <div style={{ position: 'relative', background: 'linear-gradient(180deg, rgba(6, 26, 48, 0.4) 0%, rgba(2, 11, 20, 0.9) 100%)', border: '1px solid rgba(34, 197, 94, 0.15)', borderRadius: '24px', padding: '3rem', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '340px' }}>
          
          {/* Latar Belakang Dekoratif / Info Pendaran */}
          <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: 'rgba(34, 197, 94, 0.05)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />
          
          <div style={{ zIndex: 1, maxWidth: '55%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', padding: '4px 12px', borderRadius: '100px', marginBottom: '1.25rem' }}>
              <span style={{ width: 6, height: 6, backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Premium Bio-Analysis</span>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#ffffff', letterSpacing: '-0.02em' }}>Tomat</h1>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(240,253,244,0.4)', margin: '0 0 1.5rem 0' }}>Solanum lycopersicum</p>
          </div>

          {/* Indeks Kesehatan Kanan Atas */}
          <div style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'rgba(10, 25, 41, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '12px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4ade80' }}>92%</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Index Kesehatan</div>
          </div>

          {/* FOKUS VISUAL: Menggunakan gambar tomat.png hasil generate dari asset folder */}
          <div style={{ zIndex: 1, width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.8 }} 
              style={{ position: 'relative', width: '280px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Efek pendaran neon di belakang objek gambar */}
              <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)', filter: 'blur(15px)', zIndex: 0 }} />
              
              <Image 
                src={gambarTomat} 
                alt="Analisis Bio-Digital Tomat"
                style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }}
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* SEKSI UTAMA: PROFIL BOTANI & ANALISIS AI */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* KARTU KIRI: PROFIL BOTANI */}
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 2rem 0' }}>
            <Leaf size={20} color="#22c55e" /> Profil Botani
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Asal Usul</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f0fdf4', marginBottom: '0.25rem' }}>Pegunungan Andes, Amerika Selatan</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Varian spesifik ini dioptimalkan untuk sistem hidroponik AI.</div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Klasifikasi</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f0fdf4', marginBottom: '0.25rem' }}>Solanaceae</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,253,244,0.5)' }}>Genus: Solanum<br />Spesies: lycopersicum</div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Siklus Tumbuh</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4ade80', marginBottom: '0.25rem' }}>9 - 12 Minggu</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,253,244,0.5)' }}>Tahap saat ini: Pembungaan & Pembuahan Awal.</div>
            </div>
          </div>
        </div>

        {/* KARTU KANAN: ANALISIS AI */}
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '2px solid #16a34a', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 2rem 0' }}>
              <Activity size={20} color="#22c55e" /> Analisis AI
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Fase Pertumbuhan</span>
              <span style={{ backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', color: '#4ade80', padding: '2px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>Fruiting (Optimal)</span>
            </div>

            {/* Metrik Slider - pH */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(240,253,244,0.5)', fontWeight: 600 }}>pH TANAH</span>
                <span style={{ color: '#4ade80', fontWeight: 700 }}>6.2 pH</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: '#22c55e', borderRadius: '10px' }} />
              </div>
            </div>

            {/* Metrik Slider - Kelembaban */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(240,253,244,0.5)', fontWeight: 600 }}>KELEMBABAN</span>
                <span style={{ color: '#4ade80', fontWeight: 700 }}>74%</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '74%', height: '100%', backgroundColor: '#22c55e', borderRadius: '10px' }} />
              </div>
            </div>

            {/* Metrik Slider - Intensitas Cahaya */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: 'rgba(240,253,244,0.5)', fontWeight: 600 }}>INTENSITAS CAHAYA</span>
                <span style={{ color: '#4ade80', fontWeight: 700 }}>850 PPFD</span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', backgroundColor: '#22c55e', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEKSI BAWAH: PERPUSTAKAAN DIAGNOSTIK & REKOMENDASI AI */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
        
        {/* PERPUSTAKAAN DIAGNOSTIK */}
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', margin: '0 0 2rem 0' }}>Perpustakaan Diagnostik</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '100%', height: '110px', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={32} color="#f43f5e" style={{ opacity: 0.4 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f43f5e', marginBottom: '2px' }}>Tomato Mosaic Virus</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Pola belang hijau tua dan muda pada permukaan daun tanaman.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '100%', height: '110px', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={32} color="#eab308" style={{ opacity: 0.4 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#eab308', marginBottom: '2px' }}>Early Blight</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Bercak lingkaran cokelat kehitaman menyerupai target pada daun tua.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ width: '100%', height: '110px', backgroundColor: '#020b14', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={32} color="#a855f7" style={{ opacity: 0.4 }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a855f7', marginBottom: '2px' }}>Whiteflies</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Hama kutu putih penghisap nutrisi utama pada membran daun bawah.</div>
              </div>
            </div>
          </div>
        </div>

        {/* REKOMENDASI AI */}
        <div style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Rekomendasi AI</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <Droplets size={18} color="#4ade80" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>Strategi Hidrasi</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Tingkatkan volume air sebesar 15% selama 48 jam ke depan untuk mendukung perkembangan buah.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <FlaskConical size={18} color="#4ade80" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>Optimalisasi Nutrisi</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Tambah rasio Kalsium (Ca) untuk mencegah penyakit busuk ujung pantat buah (Blossom End Rot).</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
              <AlertTriangle size={18} color="#f87171" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '2px' }}>Peringatan Kelembaban</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.5)', lineHeight: 1.4 }}>Deteksi micro-climate terlalu lembab. Waspada spora jamur penyebab hawa daun.</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="container" style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'between', fontSize: '0.75rem', color: 'rgba(240,253,244,0.3)' }}>
        <div>&copy; 2026 PlantScan AI. Botanical Intelligence Systems.</div>
      </div>

      <style jsx global>{`
        .container {
          width: 100%;
          max-width: 1200px;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem;
        }
        @media (max-width: 992px) {
          div.container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Data simulasi berdasarkan gambar Anda
const daftarPenyakit = [
  { nama: 'Early Blight', latin: 'Alternaria solani', desc: 'Bercak konsentris berwarna coklat tua pada daun tua, seringkali dikelilingi oleh halo...', match: '98%' },
  { nama: 'Late Blight', latin: 'Phytophthora infestans', desc: 'Bercak basah yang menyebar cepat, berubah menjadi coklat keunguan. Jamur putih halus...', match: '94%' },
  { nama: 'Bacterial Spot', latin: 'Xanthomonas vesicatoria', desc: 'Luka kecil menonjol pada buah dan bintik hitam kecil pada daun. Dapat menyebabkan buah...', match: '91%' },
  { nama: 'Powdery Mildew', latin: 'Podosphaera xanthii', desc: 'Lapisan putih bertepung pada permukaan daun, batang, dan bunga. Menghambat...', match: '87%' },
  { nama: 'Leaf Mold', latin: 'Passalora fulva', desc: 'Bercak hijau pucat di sisi atas daun, diikuti pertumbuhan jamur beludru di bawahnya.', match: '89%' },
  { nama: 'Septoria Leaf Spot', latin: 'Septoria lycopersici', desc: 'Bercak bulat kecil dengan pusat abu-abu dan pinggiran gelap. Biasanya dimulai dari...', match: '92%' },
  { nama: 'Spider Mites', latin: 'Tetranychidae', desc: 'Titik-titik putih halus (stippling) pada daun, disertai jaring laba-laba yang sangat...', match: '85%' },
  { nama: 'Target Spot', latin: 'Corynespora cassiicola', desc: 'Bercak coklat dengan lingkaran konsentris yang menyerupai papan sasaran...', match: '90%' },
];

export default function DaftarPenyakitPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filters = ['Semua', 'Tomat', 'Kentang', 'Paprika'];

  return (
    <div style={{ backgroundColor: '#020b14', color: '#f0fdf4', minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Filter & Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{ 
                  padding: '0.5rem 1.5rem', 
                  borderRadius: '20px', 
                  border: activeFilter === f ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.06)', 
                  backgroundColor: activeFilter === f ? 'rgba(34,197,94,0.15)' : 'rgba(6, 20, 36, 0.6)', 
                  color: activeFilter === f ? '#4ade80' : '#9ca3af', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <span style={{ color: 'rgba(240,253,244,0.4)', fontSize: '0.9rem' }}>Menampilkan 15 dari 142 hasil ⚙️</span>
        </div>

        {/* Grid Penyakit */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {daftarPenyakit.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -5, borderColor: 'rgba(34,197,94,0.3)' }} style={{ backgroundColor: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.2rem' }}>{item.nama}</h3>
              <p style={{ color: '#4ade80', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1rem' }}>{item.latin}</p>
              <p style={{ color: 'rgba(240,253,244,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{item.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{item.match} Match</span>
                <Link href="#" style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Detail <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
          <button style={{ background: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.5rem', borderRadius: '8px', color: '#fff' }}><ArrowLeft size={16}/></button>
          {[1, 2, 3].map(n => <button key={n} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: n === 1 ? '1px solid #4ade80' : 'none', backgroundColor: n === 1 ? 'rgba(34,197,94,0.15)' : 'rgba(6, 20, 36, 0.6)', color: n === 1 ? '#4ade80' : '#fff' }}>{n}</button>)}
          <button style={{ background: 'rgba(6, 20, 36, 0.6)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.5rem', borderRadius: '8px', color: '#fff' }}><ArrowRight size={16}/></button>
        </div>
      </div>
    </div>
  );
}
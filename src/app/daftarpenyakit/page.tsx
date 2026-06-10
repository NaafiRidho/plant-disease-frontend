'use client';

import { useEffect, useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Loader2 } from 'lucide-react';
import { getClasses, getDiseaseInfo } from '@/services/api';
import { PlantClass } from '@/types';

export default function DaftarPenyakitPage() {
  const [classes, setClasses] = useState<PlantClass[]>([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedClass, setSelectedClass] = useState<PlantClass | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    getClasses().then((data) => setClasses(data.classes)).catch(() => {});
  }, []);

  const filters = ['Semua', 'Tomat', 'Kentang', 'Paprika'];
  
  const filteredData = activeFilter === 'Semua'
    ? classes
    : classes.filter(c => c.plant === activeFilter);

  const handleOpenDetail = async (e: MouseEvent, cls: PlantClass) => {
    e.preventDefault();
    setSelectedClass(cls);
    setIsLoadingDetail(true);
    try {
      const fullInfo = await getDiseaseInfo(cls.class_key);
      // Update selectedClass with the full description from the API
      setSelectedClass(prev => prev ? { ...prev, description: fullInfo.description } : null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const closeModal = () => setSelectedClass(null);

  // Fungsi potong teks untuk deskripsi agar tidak terlalu panjang
  const truncateDesc = (text: string = '', length: number = 100) => {
    if (text && text.length <= length) return text;
    if (!text) return 'Deskripsi belum dimuat...';
    return text.slice(0, length).trim() + '...';
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#f0fdf4', minHeight: '100vh', padding: '100px 0 4rem 0', fontFamily: 'sans-serif' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
            Daftar <span style={{ color: '#4ade80' }}>Penyakit</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Ensiklopedia botani digital komprehensif untuk mendeteksi, memahami, dan memitigasi patogen tanaman melalui teknologi AI.
          </p>
        </motion.div>

        {/* Filter & Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{ 
                  padding: '8px 20px', 
                  borderRadius: '20px', 
                  border: activeFilter === f ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.06)', 
                  backgroundColor: activeFilter === f ? '#4ade80' : 'transparent', 
                  color: activeFilter === f ? '#0a0a0a' : '#9ca3af', 
                  cursor: 'pointer',
                  fontWeight: activeFilter === f ? 600 : 400,
                  transition: 'all 0.2s',
                  fontSize: '0.9rem'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Menampilkan {filteredData.length} dari {classes.length} hasil <span style={{ verticalAlign: 'middle', marginLeft: '5px' }}>=</span></span>
        </div>

        {/* Grid Penyakit (Desain Kartu) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredData.map((cls, i) => (
            <motion.div
              key={cls.class_key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s'
              }}
              whileHover={{ borderColor: 'rgba(74, 222, 128, 0.3)' }}
            >
              <h3 style={{ color: '#f9fafb', fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: 600 }}>{cls.name_id}</h3>
              <p style={{ color: '#4ade80', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                {cls.scientific_name || cls.class_key}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6, flex: 1 }}>
                {truncateDesc(cls.description, 100)}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ color: cls.color || '#4ade80', fontWeight: 600, fontSize: '0.85rem' }}>
                  {cls.severity === 'Tidak ada' ? 'Sehat' : `Bahaya: ${cls.severity}`}
                </span>
                <button 
                  onClick={(e) => handleOpenDetail(e, cls)} 
                  style={{ color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                >
                  Detail <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop Up / Modal Detail */}
      <AnimatePresence>
        {selectedClass && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={closeModal}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} 
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{ 
                position: 'relative', 
                backgroundColor: '#111111', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '20px', 
                padding: '2rem', 
                maxWidth: '500px', 
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <button 
                onClick={closeModal} 
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ 
                  display: 'inline-block', padding: '4px 10px', borderRadius: '8px', 
                  backgroundColor: `${selectedClass.color}22`, color: selectedClass.color, 
                  fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem' 
                }}>
                  {selectedClass.plant} • {selectedClass.severity === 'Tidak ada' ? 'Sehat' : 'Sakit'}
                </span>
                <h2 style={{ color: '#f9fafb', fontSize: '1.5rem', marginBottom: '0.25rem', fontWeight: 700 }}>
                  {selectedClass.name_id}
                </h2>
                <p style={{ color: '#4ade80', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {selectedClass.scientific_name || selectedClass.class_key}
                </p>
              </div>
              
              <div style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                {isLoadingDetail ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4ade80' }}>
                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Memuat informasi detail...</span>
                  </div>
                ) : selectedClass.description ? (
                  <p>{selectedClass.description}</p>
                ) : (
                  <p>Informasi detail mengenai penyakit ini belum tersedia. Silakan gunakan fitur pindai untuk mendiagnosis tanaman Anda secara langsung.</p>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={closeModal} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                  Tutup
                </button>
                {selectedClass.severity !== 'Tidak ada' && (
                  <button onClick={() => window.location.href = '/deteksi'} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#4ade80', color: '#000', cursor: 'pointer', fontWeight: 600 }}>
                    Mulai Scan
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
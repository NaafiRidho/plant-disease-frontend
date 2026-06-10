'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Camera, 
  RefreshCw, 
  Trash2, 
  FlaskConical, 
  Globe
} from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();

  // STATE MANAGEMENT UNTUK FORM DATA
  const [fullName, setFullName] = useState('Farhan');
  const [email, setEmail] = useState('john.farmer@botantech.ai');
  const [specialization, setSpecialization] = useState('Enterprise Botanical Researcher');
  const [location, setLocation] = useState('Global Operations');
  const [bio, setBio] = useState('Advancing the future of sustainable botany through cinematic precision and machine learning.');

  // Palet Warna Presisi & Konsisten Sesuai UI Utama
  const colors = {
    bgMain: '#0b0f10',         
    bgCard: '#14181a',         
    bgInput: '#101416',        
    primaryGreen: '#22c55e',   
    textMuted: '#8b949e',      
    textLabel: '#4ade80',      
    border: '#21262d',         
  };

  // FUNGSI HANDLER UNTUK SAVE CHANGES
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Data berhasil disimpan:', {
      fullName,
      email,
      specialization,
      location,
      bio
    });

    // Arahkan kembali ke halaman profile setelah menyimpan data
    router.push('/profile');
  };

  // FUNGSI HANDLER UNTUK CANCEL / BACK (Tanpa Menyimpan)
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah perilaku default browser jika ada
    router.push('/profile');
  };

  // Varian Animasi Stagger Effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    },
  };

  return (
    <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '4rem' }}>
      
      {/* KONTEN UTAMA DENGAN ANIMASI FADE IN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem' }}
      >
        
        {/* TOMBOL KEMBALI (BACK BUTTON FIXED) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <motion.button 
            type="button"
            onClick={handleCancel} // Diikat langsung ke elemen button mandiri
            whileHover={{ x: -4 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: '4px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none'
            }}
          >
            <ArrowLeft size={22} style={{ color: colors.textMuted, pointerEvents: 'none' }} />
          </motion.button>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Edit Profile</h1>
        </div>

        {/* KARTU FORM UTAMA */}
        <form onSubmit={handleSaveChanges} style={{ backgroundColor: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`, padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          
          {/* BAGIAN FOTO PROFIL */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', borderBottom: `1px solid ${colors.border}`, paddingBottom: '2.5rem' }}>
            <div style={{ position: 'relative', width: '130px', height: '130px', marginBottom: '1.25rem' }}>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{ 
                  width: '100%', height: '100%', borderRadius: '50%', 
                  border: `3px solid ${colors.primaryGreen}`, padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 15px rgba(34, 197, 150, 0.2)`, cursor: 'pointer'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </motion.div>

              <div style={{ position: 'absolute', bottom: '2px', right: '2px', backgroundColor: colors.primaryGreen, padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${colors.bgCard}`, boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                <Camera size={14} color="#ffffff" />
              </div>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#ffffff' }}>{fullName}</h2>
            <p style={{ color: colors.textMuted, fontSize: '0.85rem', margin: '0 0 1.25rem 0' }}>{specialization}</p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button type="button" style={{ background: 'none', border: 'none', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>
                <RefreshCw size={14} /> Change Photo
              </button>
              <button type="button" style={{ background: 'none', border: 'none', color: '#ff7b72', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>

          {/* INPUT FIELDS DENGAN EMISI ANIMASI BERURUTAN */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', marginBottom: '2rem' }}
          >
            {/* Input 1: Full Name */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>FULL NAME</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
              />
            </motion.div>

            {/* Input 2: Email Address */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>EMAIL ADDRESS</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
              />
            </motion.div>

            {/* Input 3: Specialization */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>SPECIALIZATION</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 2.5rem 0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
                />
                <FlaskConical size={15} style={{ position: 'absolute', right: '1rem', color: colors.textMuted }} />
              </div>
            </motion.div>

            {/* Input 4: Location */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>LOCATION</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 2.5rem 0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
                />
                <Globe size={15} style={{ position: 'absolute', right: '1rem', color: colors.textMuted }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Input 5: Professional Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}
          >
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>PROFESSIONAL BIO</label>
            <textarea 
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', resize: 'none', lineHeight: '1.5', transition: 'all 0.2s' }}
            />
          </motion.div>

          {/* SEPARATOR LINE */}
          <div style={{ height: '1px', backgroundColor: colors.border, marginBottom: '2rem' }} />

          {/* TOMBOL AKSI CANCEL & SAVE */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <motion.button 
              type="button"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel} // Fungsi kembali langsung tanpa simpan
              style={{ backgroundColor: 'transparent', color: '#ffffff', border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.75rem 2rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </motion.button>
            
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02, boxShadow: `0 0 20px rgba(34, 197, 94, 0.5)` }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundColor: colors.primaryGreen, color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.75rem 2.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: `0 0 15px rgba(34, 197, 94, 0.3)`, transition: 'box-shadow 0.2s' }}
            >
              Save Changes
            </motion.button>
          </div>

        </form>

      </motion.div>

      {/* CSS GLOBAL */}
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #0b0f10;
        }
        input:focus, textarea:focus {
          border-color: #22c55e !important;
          background-color: #12181b !important;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.15);
        }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
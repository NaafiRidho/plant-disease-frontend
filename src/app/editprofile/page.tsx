'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Camera, 
  KeyRound,
  User as UserIcon,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiGetProfile, apiUpdateProfile } from '@/services/api';

export default function EditProfilePage() {
  const router = useRouter();

  // STATE MANAGEMENT UNTUK FORM DATA
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  };

  // Palet Warna Presisi & Konsisten Sesuai UI Utama
  const colors = {
    bgMain: '#020b14',         
    bgCard: '#0a1929',         
    bgInput: '#030e1a',        
    primaryGreen: '#22c55e',   
    textMuted: 'rgba(240,253,244,0.6)',      
    textLabel: '#4ade80',      
    border: 'rgba(255,255,255,0.06)',         
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await apiGetProfile();
        if (res.user) {
          setEmail(res.user.email || '');
          setUsername(res.user.username || '');
        }
      } catch (err: any) {
        setError(err.message || 'Gagal memuat profil');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // FUNGSI HANDLER UNTUK SAVE CHANGES
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    if (!oldPassword) {
      const msg = 'Password lama wajib diisi untuk mengubah password.';
      setError(msg);
      showToast(msg, 'error');
      setSaving(false);
      return;
    }

    if (!password) {
      const msg = 'Password baru wajib diisi.';
      setError(msg);
      showToast(msg, 'error');
      setSaving(false);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Password baru dan konfirmasi password tidak cocok.';
      setError(msg);
      showToast(msg, 'error');
      setSaving(false);
      return;
    }

    try {
      const payload: any = {
        old_password: oldPassword,
        password: password,
      };
      await apiUpdateProfile(payload);
      const successMsgText = 'Kata sandi berhasil diperbarui!';
      setSuccessMsg(successMsgText);
      showToast(successMsgText, 'success');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err: any) {
      const errorMsgText = err.message || 'Gagal mengubah kata sandi';
      setError(errorMsgText);
      showToast(errorMsgText, 'error');
    } finally {
      setSaving(false);
    }
  };

  // FUNGSI HANDLER UNTUK CANCEL / BACK (Tanpa Menyimpan)
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/dashboard');
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

  if (loading) {
    return (
      <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: `3px solid ${colors.border}`, borderTopColor: colors.primaryGreen, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <span>Memuat data profil...</span>
        </div>
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '4rem', paddingTop: '80px' }}>
      
      {/* KONTEN UTAMA DENGAN ANIMASI FADE IN */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem 2rem' }}
      >
        
        {/* TOMBOL KEMBALI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <motion.button 
            type="button"
            onClick={handleCancel}
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
          
          {error && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', color: '#f87171', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', color: '#4ade80', fontSize: '0.9rem' }}>
              {successMsg}
            </div>
          )}

          {/* BAGIAN FOTO PROFIL */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', borderBottom: `1px solid ${colors.border}`, paddingBottom: '2.5rem' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '1.25rem' }}>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{ 
                  width: '100%', height: '100%', borderRadius: '50%', 
                  border: `3px solid ${colors.primaryGreen}`, padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 15px rgba(34, 197, 150, 0.2)`
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2.5rem',
                  fontWeight: 700
                }}>
                  {username ? username.substring(0, 1).toUpperCase() : '?'}
                </div>
              </motion.div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#ffffff' }}>{username}</h2>
            <p style={{ color: colors.textMuted, fontSize: '0.85rem', margin: 0 }}>{email}</p>
          </div>

          {/* INPUT FIELDS DENGAN EMISI ANIMASI BERURUTAN */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}
          >
            {/* Input 1: Username (Info saja) */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textMuted, fontFamily: 'monospace', letterSpacing: '0.05em' }}>USERNAME (HANYA INFORMASI)</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={username}
                  readOnly
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 2.5rem 0.85rem 1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', outline: 'none', cursor: 'not-allowed', opacity: 0.65 }}
                />
                <UserIcon size={15} style={{ position: 'absolute', right: '1rem', color: colors.textMuted, opacity: 0.5 }} />
              </div>
            </motion.div>

            {/* Input 2: Email Address (Info saja) */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textMuted, fontFamily: 'monospace', letterSpacing: '0.05em' }}>EMAIL ADDRESS (HANYA INFORMASI)</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="email" 
                  value={email}
                  readOnly
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 2.5rem 0.85rem 1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', outline: 'none', cursor: 'not-allowed', opacity: 0.65 }}
                />
                <Mail size={15} style={{ position: 'absolute', right: '1rem', color: colors.textMuted, opacity: 0.5 }} />
              </div>
            </motion.div>

            {/* Input 3: Password Lama */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>PASSWORD LAMA</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showOldPassword ? "text" : "password"} 
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan kata sandi lama"
                  required
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 3rem 0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: colors.textMuted, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Input 4: Password Baru */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>PASSWORD BARU</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi baru"
                  required
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 3rem 0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: colors.textMuted, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Input 5: Konfirmasi Password Baru */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.textLabel, fontFamily: 'monospace', letterSpacing: '0.05em' }}>KONFIRMASI PASSWORD BARU</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan kembali kata sandi baru"
                  required
                  style={{ width: '100%', backgroundColor: colors.bgInput, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.85rem 3rem 0.85rem 1rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: colors.textMuted, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* SEPARATOR LINE */}
          <div style={{ height: '1px', backgroundColor: colors.border, marginBottom: '2rem' }} />

          {/* TOMBOL AKSI CANCEL & SAVE */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <motion.button 
              type="button"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              onClick={handleCancel}
              style={{ backgroundColor: 'transparent', color: '#ffffff', border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.75rem 2rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </motion.button>
            
            <button 
              type="submit" 
              disabled={saving}
              style={{ backgroundColor: colors.primaryGreen, color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.75rem 2.5rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: `0 0 15px rgba(34, 197, 94, 0.3)`, transition: 'all 0.2s' }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>

      </motion.div>

      {/* CSS GLOBAL */}
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #020b14;
        }
        input:focus {
          border-color: #22c55e !important;
          background-color: #030e1a !important;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.15);
        }
      `}</style>

      {/* Floating Animated Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              zIndex: 9999,
              backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(239, 68, 68, 0.95)',
              border: `1px solid ${toast.type === 'success' ? '#22c55e' : '#ef4444'}`,
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(8px)',
              pointerEvents: 'auto',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{toast.type === 'success' ? '✓' : '⚠️'}</span>
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Jika sudah login, arahkan ke halaman utama / deteksi
  useEffect(() => {
    if (user) {
      router.push('/deteksi');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!usernameOrEmail.trim()) {
      setErrorMsg('Username atau Email wajib diisi');
      return;
    }
    if (!password) {
      setErrorMsg('Password wajib diisi');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login(usernameOrEmail.trim(), password);
      setSuccessMsg(response.message || 'Login berhasil! Mengalihkan...');
      setTimeout(() => {
        router.push('/deteksi');
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal masuk. Periksa kembali username dan password Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 1.5rem 40px',
      position: 'relative',
      overflow: 'hidden',
    }} className="grid-bg">
      {/* Glow Orbs */}
      <div className="hero-glow" style={{ top: '25%', opacity: 0.8 }} aria-hidden />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: 350,
        height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem 2.25rem',
          background: 'linear-gradient(145deg, rgba(12, 28, 18, 0.85), rgba(7, 16, 10, 0.95))',
          border: '1px solid rgba(34, 197, 94, 0.22)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), var(--glow-green-soft)',
        }}
      >
        {/* Header Form */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <motion.div
            initial={{ scale: 0.85, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)',
              marginBottom: '1.25rem',
            }}
          >
            <Leaf size={26} color="white" />
          </motion.div>
          
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.85rem',
            fontWeight: 800,
            color: '#f0fdf4',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}>
            Selamat <span className="gradient-text">Datang Kembali</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(134, 239, 172, 0.65)' }}>
            Masukkan akun PlantScan AI Anda untuk mendiagnosis tanaman
          </p>
        </div>

        {/* Notifikasi Alert */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#f87171',
                fontSize: '0.85rem',
                overflow: 'hidden',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              style={{
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#4ade80',
                fontSize: '0.85rem',
                overflow: 'hidden',
              }}
            >
              <CheckCircle size={16} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Input */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Input Username/Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="identifier" style={{
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'rgba(240, 253, 244, 0.8)',
              letterSpacing: '0.02em',
            }}>
              USERNAME ATAU EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(74, 222, 128, 0.5)',
                display: 'flex',
                alignItems: 'center',
              }}>
                <User size={18} />
              </div>
              <input
                id="identifier"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Masukkan username atau email..."
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.65rem',
                  background: 'rgba(3, 10, 5, 0.65)',
                  border: '1px solid rgba(34, 197, 94, 0.16)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.925rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                className="input-focus-glow"
              />
            </div>
          </div>

          {/* Input Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password" style={{
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'rgba(240, 253, 244, 0.8)',
                letterSpacing: '0.02em',
              }}>
                PASSWORD
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Hubungi administrator untuk mereset kata sandi Anda.'); }} style={{
                fontSize: '0.775rem',
                color: '#4ade80',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s',
              }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                Lupa Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(74, 222, 128, 0.5)',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem 2.65rem 0.85rem 2.65rem',
                  background: 'rgba(3, 10, 5, 0.65)',
                  border: '1px solid rgba(34, 197, 94, 0.16)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.925rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                className="input-focus-glow"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(74, 222, 128, 0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{
              marginTop: '0.75rem',
              padding: '0.9rem',
              justifyContent: 'center',
              fontSize: '0.975rem',
              letterSpacing: '0.02em',
              fontWeight: 700,
            }}
          >
            {isSubmitting ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="spinner" />
                <span>Memproses...</span>
              </div>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.875rem',
          color: 'rgba(134, 239, 172, 0.55)',
        }}>
          Belum punya akun?{' '}
          <Link href="/register" style={{
            color: '#4ade80',
            textDecoration: 'none',
            fontWeight: 600,
            marginLeft: '4px',
            borderBottom: '1px solid transparent',
            transition: 'all 0.2s',
          }} onMouseOver={(e) => {
            e.currentTarget.style.color = '#22c55e';
            e.currentTarget.style.borderBottomColor = '#22c55e';
          }} onMouseOut={(e) => {
            e.currentTarget.style.color = '#4ade80';
            e.currentTarget.style.borderBottomColor = 'transparent';
          }}>
            Daftar Gratis
          </Link>
        </div>
      </motion.div>

      {/* Global CSS Styles in page scope */}
      <style>{`
        .input-focus-glow:focus {
          border-color: var(--green-400) !important;
          box-shadow: 0 0 16px rgba(34, 197, 94, 0.22), inset 0 2px 4px rgba(0,0,0,0.1) !important;
          background: rgba(4, 15, 7, 0.8) !important;
        }
        
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

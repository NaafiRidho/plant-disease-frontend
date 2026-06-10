'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Lock, Mail, User, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function RegisterPage() {
  const { user, register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

    // Validasi form sisi klien
    if (!username.trim()) {
      setErrorMsg('Username wajib diisi');
      return;
    }
    if (username.trim().length < 3) {
      setErrorMsg('Username minimal 3 karakter');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Email wajib diisi');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Format email tidak valid');
      return;
    }
    if (!password) {
      setErrorMsg('Password wajib diisi');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password minimal harus 6 karakter');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi password tidak cocok');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await register(username.trim(), email.trim().toLowerCase(), password);
      setSuccessMsg(response.message || 'Pendaftaran berhasil! Mengalihkan ke halaman Login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Pendaftaran gagal. Hubungi administrator.');
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
      padding: '90px 1.5rem 50px',
      position: 'relative',
      overflow: 'hidden',
    }} className="grid-bg">
      {/* Glow Orbs */}
      <div className="hero-glow" style={{ top: '25%', opacity: 0.8 }} aria-hidden />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '10%',
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
          maxWidth: '480px',
          padding: '2.5rem 2.25rem',
          background: 'linear-gradient(145deg, rgba(10, 25, 41, 0.85), rgba(3, 14, 26, 0.95))',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), var(--glow-green-soft)',
        }}
      >
        {/* Header Form */}
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <motion.div
            initial={{ scale: 0.85, rotate: 15 }}
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
            Daftar Akun <span className="gradient-text">Baru</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(134, 239, 172, 0.65)' }}>
            Buat akun sekarang untuk mulai mendeteksi penyakit tanaman Anda
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          
          {/* Input Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="username" style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(240, 253, 244, 0.8)',
              letterSpacing: '0.02em',
            }}>
              USERNAME
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
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username Anda..."
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.65rem',
                  background: 'rgba(3, 14, 26, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                className="input-focus-glow"
              />
            </div>
          </div>

          {/* Input Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="email" style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(240, 253, 244, 0.8)',
              letterSpacing: '0.02em',
            }}>
              EMAIL
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
                <Mail size={18} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email aktif..."
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.65rem',
                  background: 'rgba(3, 14, 26, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.9rem',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="password" style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(240, 253, 244, 0.8)',
              letterSpacing: '0.02em',
            }}>
              PASSWORD
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
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 karakter..."
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.8rem 2.65rem 0.8rem 2.65rem',
                  background: 'rgba(3, 14, 26, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.9rem',
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

          {/* Input Konfirmasi Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="confirmPassword" style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(240, 253, 244, 0.8)',
              letterSpacing: '0.02em',
            }}>
              KONFIRMASI PASSWORD
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
                <Lock size={18} />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi..."
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.8rem 2.65rem 0.8rem 2.65rem',
                  background: 'rgba(3, 14, 26, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
                className="input-focus-glow"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              padding: '0.85rem',
              justifyContent: 'center',
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              fontWeight: 700,
            }}
          >
            {isSubmitting ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="spinner" />
                <span>Mendaftar...</span>
              </div>
            ) : (
              <>
                <span>Daftar Akun Baru</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.75rem',
          fontSize: '0.875rem',
          color: 'rgba(134, 239, 172, 0.55)',
        }}>
          Sudah punya akun?{' '}
          <Link href="/login" style={{
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
            Masuk Sekarang
          </Link>
        </div>
      </motion.div>

      {/* Global CSS Styles in page scope */}
      <style>{`
        .input-focus-glow:focus {
          border-color: var(--green-400) !important;
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.15), inset 0 2px 4px rgba(0,0,0,0.1) !important;
          background: rgba(3, 14, 26, 0.8) !important;
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

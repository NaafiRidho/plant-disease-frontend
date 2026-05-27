'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Stethoscope, Wrench, ChevronDown, Lock, LogIn, UserPlus } from 'lucide-react';
import { DiseaseInfo as DiseaseInfoType } from '@/types';
import Link from 'next/link';

interface DiseaseInfoProps {
  info: DiseaseInfoType;
  isAuthenticated?: boolean;
}

function Section({
  icon,
  title,
  children,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{
      border: '1px solid rgba(34,197,94,0.14)',
      borderRadius: 14,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 16px',
          background: isOpen ? 'rgba(34,197,94,0.07)' : 'rgba(10,26,15,0.6)',
          border: 'none',
          cursor: 'pointer',
          color: '#f0fdf4',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
      >
        <span style={{ color: '#4ade80', flexShrink: 0 }}>{icon}</span>
        <span style={{ fontWeight: 600, fontSize: '0.9rem', flex: 1 }}>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} color="rgba(134,239,172,0.5)" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '14px 16px', background: 'rgba(5,14,8,0.3)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DiseaseInfo({ info, isAuthenticated = true }: DiseaseInfoProps) {
  // ── Mode GUEST: tampilkan overlay terkunci ────────────────────────────────
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Pratinjau blur milik guest */}
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
          {/* Konten blur di belakang */}
          <div style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.4 }}>
            <div className="glass-card" style={{ padding: '1.6rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(134,239,172,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
                Tentang Penyakit
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(240,253,244,0.75)', lineHeight: 1.7 }}>
                {info.description.substring(0, 80)}...
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Gejala yang Terlihat', 'Cara Penanganan', 'Informasi Tambahan'].map((title) => (
                <div key={title} style={{
                  border: '1px solid rgba(34,197,94,0.14)',
                  borderRadius: 14,
                  padding: '14px 16px',
                  background: 'rgba(10,26,15,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: 'rgba(74,222,128,0.3)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0fdf4' }}>{title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay kunci */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(3,10,5,0.1) 0%, rgba(3,10,5,0.85) 40%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '1rem',
          }}>
            {/* Ikon kunci */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.1))',
                border: '2px solid rgba(34,197,94,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(34,197,94,0.2)',
              }}
            >
              <Lock size={26} color="#4ade80" />
            </motion.div>

            <div style={{ textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f0fdf4', marginBottom: '0.4rem' }}>
                Detail Terkunci
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'rgba(134,239,172,0.65)', lineHeight: 1.6, maxWidth: 260, margin: '0 auto' }}>
                Login untuk melihat gejala lengkap, cara penanganan, dan riwayat deteksi tersimpan
              </p>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                href="/login?returnUrl=/deteksi"
                className="btn-primary"
                style={{ padding: '9px 18px', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogIn size={14} />
                Login Sekarang
              </Link>
              <Link
                href="/register"
                className="btn-secondary"
                style={{ padding: '9px 18px', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <UserPlus size={14} />
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Mode USER LOGIN: tampilkan lengkap ─────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="glass-card card-shine" style={{ padding: '1.6rem', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(134,239,172,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
          Tentang Penyakit
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'rgba(240,253,244,0.75)', lineHeight: 1.7 }}>
          {info.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Gejala */}
        <Section icon={<Stethoscope size={16} />} title="Gejala yang Terlihat" defaultOpen>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {info.symptoms.map((symptom, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  flexShrink: 0,
                  marginTop: '7px',
                }} />
                <span style={{ fontSize: '0.875rem', color: 'rgba(240,253,244,0.75)', lineHeight: 1.6 }}>
                  {symptom}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Penanganan */}
        <Section icon={<Wrench size={16} />} title="Cara Penanganan" defaultOpen>
          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {info.treatment.map((step, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#4ade80',
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'rgba(240,253,244,0.75)', lineHeight: 1.6, marginTop: '2px' }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Info tambahan */}
        <Section icon={<BookOpen size={16} />} title="Informasi Tambahan">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Tanaman', value: info.plant },
              { label: 'Status', value: info.status },
              { label: 'Tingkat Keparahan', value: info.severity },
            ].map((item) => (
              <div key={item.label} style={{
                padding: '10px 12px',
                borderRadius: 10,
                background: 'rgba(34,197,94,0.05)',
                border: '1px solid rgba(34,197,94,0.1)',
              }}>
                <p style={{ fontSize: '0.7rem', color: 'rgba(134,239,172,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#f0fdf4', fontWeight: 600 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </motion.div>
  );
}

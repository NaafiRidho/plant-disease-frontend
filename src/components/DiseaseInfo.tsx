'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Stethoscope, Wrench, ChevronDown } from 'lucide-react';
import { DiseaseInfo as DiseaseInfoType } from '@/types';

interface DiseaseInfoProps {
  info: DiseaseInfoType;
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

export default function DiseaseInfo({ info }: DiseaseInfoProps) {
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

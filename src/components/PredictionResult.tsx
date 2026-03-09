'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, Cpu } from 'lucide-react';
import { PredictionResponse } from '@/types';

interface PredictionResultProps {
  result: PredictionResponse;
}

export default function PredictionResult({ result }: PredictionResultProps) {
  const { disease_info, top_3, confidence_percent, inference_time_ms, model_mode } = result;
  const isHealthy = disease_info.status === 'Sehat';

  const severityColor = (severity: string) => {
    switch (severity) {
      case 'Sangat Tinggi': return '#dc2626';
      case 'Tinggi': return '#ef4444';
      case 'Sedang': return '#f97316';
      default: return '#22c55e';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Mock mode warning */}
      {model_mode === 'mock' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            marginBottom: '1rem',
            borderRadius: 10,
            background: 'rgba(234,179,8,0.08)',
            border: '1px solid rgba(234,179,8,0.2)',
            fontSize: '0.8rem',
            color: '#facc15',
          }}
        >
          <AlertTriangle size={14} />
          <span>Mode Demo — Model belum ditraining. Hasil adalah simulasi.</span>
        </motion.div>
      )}

      {/* Main result card */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
        {/* Status header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: isHealthy ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {isHealthy
              ? <CheckCircle size={26} color="#22c55e" />
              : <AlertTriangle size={26} color="#f87171" />
            }
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`badge ${isHealthy ? 'badge-green' : 'badge-red'}`}>
                {disease_info.status}
              </span>
              {disease_info.severity !== 'Tidak ada' && (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 100,
                  background: `${severityColor(disease_info.severity)}18`,
                  color: severityColor(disease_info.severity),
                  border: `1px solid ${severityColor(disease_info.severity)}30`,
                }}>
                  Tingkat: {disease_info.severity}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f0fdf4', margin: 0 }}>
              {disease_info.name_id}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(134,239,172,0.6)', margin: '2px 0 0' }}>
              Tanaman: {disease_info.plant}
            </p>
          </div>
        </div>

        {/* Confidence score utama */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(134,239,172,0.6)', fontWeight: 500 }}>
              Kepercayaan Prediksi
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: disease_info.color }}>
              {confidence_percent.toFixed(1)}%
            </span>
          </div>
          <div className="confidence-bar-track">
            <motion.div
              className="confidence-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${confidence_percent}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                background: `linear-gradient(90deg, ${disease_info.color}88, ${disease_info.color})`,
              }}
            />
          </div>
        </div>

        {/* Meta info: inference time & mode */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'rgba(134,239,172,0.5)' }}>
            <Clock size={12} />
            {inference_time_ms.toFixed(0)} ms
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'rgba(134,239,172,0.5)' }}>
            <Cpu size={12} />
            {model_mode === 'real' ? 'Model Terlatih' : 'Mode Demo'}
          </div>
        </div>
      </div>

      {/* Top 3 prediksi */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(134,239,172,0.6)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Top 3 Prediksi
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {top_3.map((item, index) => (
            <motion.div
              key={item.class}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * index + 0.3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: index === 0 ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: index === 0 ? '#4ade80' : 'rgba(134,239,172,0.4)',
                    flexShrink: 0,
                  }}>
                    {index + 1}
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: index === 0 ? 600 : 400,
                    color: index === 0 ? '#f0fdf4' : 'rgba(240,253,244,0.55)',
                  }}>
                    {item.name_id}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: index === 0 ? item.color : 'rgba(134,239,172,0.4)',
                  minWidth: '45px',
                  textAlign: 'right',
                }}>
                  {item.confidence_percent.toFixed(1)}%
                </span>
              </div>
              <div className="confidence-bar-track" style={{ height: index === 0 ? 7 : 4 }}>
                <motion.div
                  className="confidence-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.confidence_percent}%` }}
                  transition={{ duration: 1, delay: 0.2 * index + 0.5, ease: 'easeOut' }}
                  style={{
                    background: index === 0
                      ? `linear-gradient(90deg, ${item.color}88, ${item.color})`
                      : 'rgba(134,239,172,0.2)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

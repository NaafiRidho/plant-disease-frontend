'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, Calendar, Tag } from 'lucide-react';
import { apiGetHistoryDetail } from '@/services/api';
import PredictionResult from '@/components/PredictionResult';
import DiseaseInfo from '@/components/DiseaseInfo';
import type { PredictionResponse } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);
  const router = useRouter();

  const [detailData, setDetailData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Palet Warna Presisi & Konsisten Sesuai UI Utama
  const colors = {
    bgMain: '#0b0f10',         
    bgCard: '#14181a',         
    primaryGreen: '#22c55e',   
    textMuted: '#8b949e',      
    border: '#21262d',         
  };

  useEffect(() => {
    async function loadDetail() {
      try {
        const response = await apiGetHistoryDetail(id);
        if (response.success && response.data) {
          setDetailData(response.data);
        } else {
          setError('Gagal memuat detail diagnosa.');
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat menghubungi server.');
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: `3px solid ${colors.border}`, borderTopColor: colors.primaryGreen, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <span>Memuat detail diagnosa...</span>
        </div>
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error || !detailData) {
    return (
      <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', padding: '1.5rem', maxWidth: '500px', textAlign: 'center', color: '#f87171' }}>
          {error || 'Detail diagnosa tidak ditemukan.'}
        </div>
        <button 
          onClick={handleBack}
          style={{ backgroundColor: colors.bgCard, color: '#ffffff', border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
        >
          <ArrowLeft size={16} /> Kembali ke Dasbor
        </button>
      </div>
    );
  }

  // Construct a standard PredictionResponse payload for prediction result components
  const predictionResult: PredictionResponse = {
    success: true,
    predicted_class: detailData.predicted_class,
    confidence: detailData.confidence,
    confidence_percent: detailData.confidence_value || (detailData.confidence * 100),
    disease_info: detailData.disease_info || {
      name_id: detailData.disease_name || 'Tidak Diketahui',
      plant: detailData.plant_type || 'Tanaman',
      status: detailData.is_healthy ? 'Sehat' : 'Sakit',
      description: 'Detail deskripsi diagnosa tidak tersedia.',
      symptoms: [],
      treatment: [],
      severity: detailData.severity || 'Tidak ada',
      color: detailData.status_color || (detailData.is_healthy ? '#22c55e' : '#ef4444')
    },
    top_3: detailData.top_3 || [],
    inference_time_ms: 120, // default placeholder
    model_mode: "real"
  };

  const isHealthy = detailData.is_healthy;
  const leafImage = detailData.image_url || 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=600';

  return (
    <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '5rem', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        
        {/* Back Navigation Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <motion.button 
            onClick={handleBack}
            whileHover={{ x: -4 }} 
            whileTap={{ scale: 0.95 }}
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
            <ArrowLeft size={22} style={{ color: colors.textMuted }} />
          </motion.button>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: colors.primaryGreen, fontFamily: 'monospace', letterSpacing: '0.1em' }}>DIAGNOSTICS DETAIL</span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '2px 0 0', letterSpacing: '-0.02em' }}>Detail Hasil Deteksi</h1>
          </div>
        </div>

        {/* Dynamic Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr', gap: '2rem' }} className="detail-grid">
          
          {/* Left Column: Image Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ 
                backgroundColor: colors.bgCard, 
                borderRadius: '16px', 
                border: `1px solid ${colors.border}`, 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
            >
              <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: '#000', overflow: 'hidden' }}>
                <img 
                  src={leafImage} 
                  alt={detailData.plant_type} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Metadata Info Panel */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Metadata Deteksi</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    <Calendar size={15} style={{ color: colors.primaryGreen }} />
                    <span>Scanned: {detailData.scanned_at || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    <Tag size={15} style={{ color: colors.primaryGreen }} />
                    <span>File: {detailData.filename || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    <Cpu size={15} style={{ color: colors.primaryGreen }} />
                    <span>Model Inference: MobileNetV2 AI</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Prediction results & Disease info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <PredictionResult result={predictionResult} isAuthenticated={true} />
            <div style={{ marginTop: '0.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: '#f0fdf4' }}>
                Informasi Penyakit Tanaman
              </h2>
              <DiseaseInfo info={predictionResult.disease_info} isAuthenticated={true} />
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

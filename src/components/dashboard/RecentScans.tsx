'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '@/app/dashboard/dashboard.module.css';

// Tipe data scan item dari backend API (to_list_dict)
interface ScanItem {
  id: number;
  filename?: string;
  predicted_class: string;
  confidence?: number;
  confidence_percent?: string;
  confidence_value?: number;
  plant_type?: string;
  scientific_name?: string;
  disease_name?: string;
  severity?: string;
  is_healthy?: boolean;
  display_status?: string;
  status_color?: string;
  image_url?: string;
  user_id?: number;
  scanned_at?: string;
  created_at?: string;
  // Kompatibilitas dengan mock data lama
  name?: string;
  status?: string;
  timeAgo?: string;
}

interface RecentScansProps {
  scans: ScanItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDeleteScan: (id: number) => void;
  isAuthenticated: boolean;
}

export default function RecentScans({
  scans,
  page,
  totalPages,
  onPageChange,
  onDeleteScan,
  isAuthenticated
}: RecentScansProps) {
  const router = useRouter();

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f0fdf4', margin: 0, letterSpacing: '0.05em' }}>
          SCAN HISTORY
        </h2>
        {!isAuthenticated && (
          <span style={{ fontSize: '10px', color: '#8aaa8a', fontWeight: 'bold', letterSpacing: '0.1em' }}>
            DEMO VERSION
          </span>
        )}
      </div>

      {scans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-mid)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px' }}>
          Belum ada riwayat scan.
        </div>
      ) : (
        scans.map((scan, i) => {
          const isHealthy = scan.is_healthy ?? (scan.status === 'healthy');
          const scanId = scan.id;
          
          // Determine plant name & scientific name based on backend response data
          const name = scan.plant_type || scan.name || 'Unknown';
          let scientificName = scan.scientific_name || '';
          if (!scientificName) {
            if (name.toLowerCase().includes('tomat') || name.toLowerCase().includes('tomato')) {
              scientificName = 'Solanum lycopersicum';
            } else if (name.toLowerCase().includes('kentang') || name.toLowerCase().includes('potato')) {
              scientificName = 'Solanum tuberosum';
            } else if (name.toLowerCase().includes('paprika') || name.toLowerCase().includes('pepper') || name.toLowerCase().includes('chili')) {
              scientificName = 'Capsicum annuum';
            } else {
              scientificName = 'Plantae';
            }
          }

          const displayStatus = scan.display_status || (isHealthy ? 'Flourishing' : 'Health Alert');
          const confidencePercent = scan.confidence_percent || (scan.confidence ? `${Math.round(scan.confidence * 100)}%` : '100%');
          const confidenceValue = scan.confidence_value || (scan.confidence ? Math.round(scan.confidence * 100) : 100);
          const timeAgo = scan.scanned_at || scan.timeAgo || 'Baru saja';
          
          // Image fallback leaf placeholder
          const imageUrl = scan.image_url || 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=150';

          // Color coding for progress bar & text
          let statusColor = '#4ade80'; // Green
          let badgeBg = 'rgba(34, 197, 94, 0.08)';
          let badgeBorder = 'rgba(34, 197, 94, 0.25)';

          if (displayStatus === 'Health Alert') {
            statusColor = '#f87171'; // Red
            badgeBg = 'rgba(239, 68, 68, 0.08)';
            badgeBorder = 'rgba(239, 68, 68, 0.25)';
          } else if (displayStatus === 'Under Treatment') {
            statusColor = '#fb923c'; // Orange
            badgeBg = 'rgba(249, 115, 22, 0.08)';
            badgeBorder = 'rgba(249, 115, 22, 0.25)';
          }
          return (
            <motion.div
              key={scanId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => router.push(`/dashboard/detail/${scanId}`)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative',
                transition: 'border-color 0.2s',
                cursor: 'pointer'
              }}
              className={`${styles.scanCardHover} ${styles.scanItemGrid}`}
            >
              {/* Column 1: Image */}
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card2)' }}>
                <img 
                  src={imageUrl} 
                  alt={name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Column 2: Name & Subtitle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-hi)' }}>{name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)', fontStyle: 'italic' }}>{scientificName}</span>
              </div>

              {/* Column 3: Scanned Date */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-lo)', letterSpacing: '0.1em' }}>SCANNED</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-hi)', fontFamily: 'monospace' }}>{timeAgo}</span>
              </div>

              {/* Column 4: Confidence Score */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-lo)', letterSpacing: '0.1em' }}>CONFIDENCE</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--bg-card2)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${confidenceValue}%`, height: '100%', backgroundColor: statusColor, borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: statusColor, minWidth: '32px' }}>
                    {confidencePercent}
                  </span>
                </div>
              </div>

              {/* Column 5: Status Badge */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: badgeBg,
                  border: `1px solid ${badgeBorder}`,
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: statusColor
                }}>
                  {displayStatus === 'Flourishing' && (
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: statusColor }} />
                  )}
                  {displayStatus}
                </div>
              </div>

              {/* Column 6: Action Chevron & Delete button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isAuthenticated && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteScan(scanId);
                    }}
                    title="Hapus riwayat ini"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff7b72',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    className={styles.trashBtnHover}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <ChevronRight size={18} color="rgba(240,253,244,0.5)" />
              </div>
            </motion.div>
          );
        })
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Prev Button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            style={{
              background: 'none',
              border: '1px solid var(--border-mid)',
              color: page === 1 ? 'var(--text-lo)' : 'var(--text-mid)',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Numbers */}
          {pageNumbers.map((p) => {
            const isActive = p === page;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                style={{
                  backgroundColor: isActive ? '#4ade80' : 'transparent',
                  border: isActive ? '1px solid #4ade80' : '1px solid var(--border-mid)',
                  color: isActive ? '#0d1410' : 'var(--text-mid)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? '0 0 12px rgba(74,222,128,0.4)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {p}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            style={{
              background: 'none',
              border: '1px solid var(--border-mid)',
              color: page === totalPages ? 'var(--text-lo)' : 'var(--text-mid)',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
}

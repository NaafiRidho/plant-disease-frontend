'use client';

import { motion } from 'framer-motion';
import type { ScanHistoryItem } from '@/types';
import styles from '@/app/dashboard/dashboard.module.css';

interface RecentScansProps {
  scans: ScanHistoryItem[];
}

const badgeClasses: Record<string, string> = {
  healthy: styles.badgeHealthy,
  alert: styles.badgeAlert,
  system: styles.badgeSystem,
};

export default function RecentScans({ scans }: RecentScansProps) {
  return (
    <motion.div
      className={styles.scansCard}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.scansHead}>
        <div className={styles.scansTitle}>
          RECENT<br />SCANS
        </div>
        <button className={styles.viewAll}>VIEW ALL</button>
      </div>

      {scans.map((scan, i) => (
        <motion.div
          key={scan.id}
          className={`${styles.scanItem} ${i === scans.length - 1 ? styles.scanItemLast : ''}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 + i * 0.1, duration: 0.4 }}
        >
          <div className={styles.scanThumb} style={{ background: scan.thumbBg }}>
            {scan.emoji}
          </div>
          <div>
            <div className={styles.scanNameRow}>
              <span className={styles.scanName}>{scan.name}</span>
              <span className={`${styles.badge} ${badgeClasses[scan.status] || ''}`}>
                {scan.statusLabel}
              </span>
            </div>
            <div className={`${styles.scanDesc} ${scan.status === 'alert' ? styles.scanDescRed : ''}`}>
              {scan.description}
            </div>
            <div className={styles.scanTime}>{scan.timeAgo}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

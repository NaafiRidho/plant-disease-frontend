'use client';

import { motion } from 'framer-motion';
import type { MonitorData } from '@/types';
import styles from '@/app/dashboard/dashboard.module.css';

interface MonitorCardProps {
  data: MonitorData;
}

export default function MonitorCard({ data }: MonitorCardProps) {
  return (
    <motion.div
      className={styles.monitorCard}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* SVG leaf background */}
      <svg className={styles.monitorSvg} viewBox="0 0 680 215" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="680" height="215" fill="#09110a"/>
        <ellipse cx="340" cy="150" rx="240" ry="115" fill="#0c1e0c"/>
        <ellipse cx="190" cy="115" rx="170" ry="100" fill="#0e220e" transform="rotate(-20 190 115)"/>
        <ellipse cx="470" cy="105" rx="155" ry="90" fill="#0b1e0b" transform="rotate(17 470 105)"/>
        <ellipse cx="290" cy="185" rx="190" ry="68" fill="#101f10" transform="rotate(-7 290 185)"/>
        <ellipse cx="380" cy="62" rx="110" ry="68" fill="#0d1f0d" transform="rotate(6 380 62)"/>
        {/* primary veins */}
        <line x1="340" y1="150" x2="340" y2="20"  stroke="#1b4a1b" strokeWidth="2.5"/>
        <line x1="340" y1="150" x2="240" y2="82"  stroke="#1b4a1b" strokeWidth="2"/>
        <line x1="340" y1="150" x2="440" y2="76"  stroke="#1b4a1b" strokeWidth="2"/>
        <line x1="340" y1="150" x2="210" y2="162" stroke="#1b4a1b" strokeWidth="2"/>
        <line x1="340" y1="150" x2="460" y2="165" stroke="#1b4a1b" strokeWidth="2"/>
        {/* secondary veins */}
        <line x1="340" y1="150" x2="275" y2="48"  stroke="#163616" strokeWidth="1.2"/>
        <line x1="340" y1="150" x2="405" y2="44"  stroke="#163616" strokeWidth="1.2"/>
        <line x1="340" y1="150" x2="160" y2="130" stroke="#163616" strokeWidth="1.2"/>
        <line x1="340" y1="150" x2="510" y2="138" stroke="#163616" strokeWidth="1.2"/>
        {/* tip dots */}
        <circle cx="240" cy="82"  r="3.5" fill="#1e5a1e" opacity="0.55"/>
        <circle cx="440" cy="76"  r="3.5" fill="#1e5a1e" opacity="0.55"/>
        <circle cx="340" cy="20"  r="3.5" fill="#1e5a1e" opacity="0.55"/>
        <circle cx="210" cy="162" r="3"   fill="#1e5a1e" opacity="0.40"/>
        <circle cx="460" cy="165" r="3"   fill="#1e5a1e" opacity="0.40"/>
      </svg>

      <div className={styles.monitorOverlay} />

      <motion.div
        className={styles.monitorHeader}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        <div className={styles.monitorTitle}>REAL-TIME MONITORING</div>
        <div className={styles.monitorSub}>
          Zone {data.zone} &nbsp;|&nbsp; {data.plantName}
        </div>
      </motion.div>

      <motion.div
        className={styles.livePill}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className={styles.liveDot} />
        LIVE STREAM
      </motion.div>

      <motion.div
        className={`${styles.mBadge} ${styles.mBadgePhoto}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.45 }}
      >
        <div className={styles.mBadgeLabel}>Photosynthesis Rate</div>
        <div className={styles.mBadgeVal}>{data.photosynthesisRate}%</div>
      </motion.div>

      <motion.div
        className={`${styles.mBadge} ${styles.mBadgeStomata}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45 }}
      >
        <div className={styles.mBadgeLabel}>Stomata Aperture</div>
        <div className={styles.mBadgeValWhite}>{data.stomataStatus}</div>
      </motion.div>
    </motion.div>
  );
}

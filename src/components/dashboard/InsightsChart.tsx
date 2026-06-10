'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GrowthDataPoint } from '@/types';
import styles from '@/app/dashboard/dashboard.module.css';

interface InsightsChartProps {
  data: GrowthDataPoint[];
  quote: string;
}

/**
 * Convert data values (0-90) into SVG coordinates for a 560×90 viewBox.
 * The chart is inverted: lower Y in SVG = higher value.
 */
function buildPath(data: GrowthDataPoint[]): { polyline: string; polygon: string; peak: { cx: number; cy: number } } {
  const w = 560;
  const h = 90;
  const step = w / Math.max(data.length - 1, 1);

  const points = data.map((d, i) => ({
    x: i * step,
    y: d.value, // already in SVG Y space (0=top, 90=bottom)
  }));

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const polygon = `${polyline} ${w},${h} 0,${h}`;

  // Find peak (lowest Y = highest point on chart)
  const peakPoint = points.reduce((min, p) => (p.y < min.y ? p : min), points[0]);
  const peak = { cx: peakPoint.x, cy: peakPoint.y };

  return { polyline, polygon, peak };
}

export default function InsightsChart({ data, quote }: InsightsChartProps) {
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('month');

  // Generate slightly different data for Week view
  const weekData: GrowthDataPoint[] = [
    { week: 'MON', value: 60 },
    { week: 'TUE', value: 45 },
    { week: 'WED', value: 30 },
    { week: 'THU', value: 55 },
    { week: 'FRI', value: 20 },
    { week: 'SAT', value: 48 },
    { week: 'SUN', value: 38 },
  ];

  const currentData = activeTab === 'month' ? data : weekData;
  const { polyline, polygon, peak } = buildPath(currentData);

  return (
    <motion.div
      className={styles.insightsCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>AI GROWTH INSIGHTS</div>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'week' ? styles.tabOn : styles.tabOff}`}
            onClick={() => setActiveTab('week')}
          >
            Week
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'month' ? styles.tabOn : styles.tabOff}`}
            onClick={() => setActiveTab('month')}
          >
            Month
          </button>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <AnimatePresence mode="wait">
          <motion.svg
            key={activeTab}
            viewBox="0 0 560 90"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#4ade80" stopOpacity="0.20"/>
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* grid lines */}
            <line x1="0" y1="22" x2="560" y2="22" stroke="#1a2a1a" strokeWidth="0.5"/>
            <line x1="0" y1="44" x2="560" y2="44" stroke="#1a2a1a" strokeWidth="0.5"/>
            <line x1="0" y1="66" x2="560" y2="66" stroke="#1a2a1a" strokeWidth="0.5"/>
            {/* area fill */}
            <motion.polygon
              points={polygon}
              fill="url(#chartGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            />
            {/* line */}
            <motion.polyline
              points={polyline}
              fill="none"
              stroke="#4ade80"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            />
            {/* peak dot */}
            <motion.circle
              cx={peak.cx}
              cy={peak.cy}
              r="4"
              fill="#4ade80"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />
            <motion.circle
              cx={peak.cx}
              cy={peak.cy}
              r="7"
              fill="#4ade80"
              opacity="0.2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.95, duration: 0.35 }}
            />
          </motion.svg>
        </AnimatePresence>
      </div>

      <div className={styles.chartLabels}>
        {currentData.map((d) => (
          <span key={d.week}>{d.week}</span>
        ))}
      </div>

      <motion.div
        className={styles.insightQuote}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        &ldquo;{quote}&rdquo;
      </motion.div>
    </motion.div>
  );
}

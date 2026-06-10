'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, AlertTriangle, HeartPulse } from 'lucide-react';
import type { DashboardStats } from '@/types';
import styles from '@/app/dashboard/dashboard.module.css';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  sub?: string;
  variant: 'green' | 'orange';
  icon: 'plant' | 'alert' | 'health';
  index: number;
}

/** Animated count-up hook */
function useCountUp(target: number, duration = 1200, enabled = true): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(id);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, enabled]);
  return current;
}

const iconMap = {
  plant: <Leaf size={18} />,
  alert: <AlertTriangle size={18} />,
  health: <HeartPulse size={18} />,
};

export default function StatCard({ label, value, suffix, sub, variant, icon, index }: StatCardProps) {
  const animatedValue = useCountUp(value);

  return (
    <motion.div
      className={`${styles.statCard} ${variant === 'orange' ? styles.statCardWarn : ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <div className={styles.statLabel}>{label}</div>
        <div className={`${styles.statValue} ${variant === 'green' ? styles.statValueGreen : styles.statValueOrange}`}>
          {animatedValue}{suffix}
        </div>
        {sub && <div className={styles.statSub}>{sub}</div>}
      </div>
      <div className={`${styles.statIcon} ${variant === 'green' ? styles.statIconGreen : styles.statIconOrange}`}>
        {iconMap[icon]}
      </div>
    </motion.div>
  );
}

/** Renders a row of stat cards from data */
export function StatsRow({ stats }: { stats: DashboardStats }) {
  return (
    <div className={styles.statsRow}>
      <StatCard
        label="Total Scans"
        value={stats.totalScans}
        variant="green"
        icon="plant"
        index={0}
      />
      <StatCard
        label="Alerts"
        value={stats.alerts}
        sub={stats.criticalAlerts > 0 ? 'CRITICAL' : undefined}
        variant="orange"
        icon="alert"
        index={1}
      />
      <StatCard
        label="Health Index"
        value={stats.healthIndex}
        suffix="%"
        variant="green"
        icon="health"
        index={2}
      />
    </div>
  );
}

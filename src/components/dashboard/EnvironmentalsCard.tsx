'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { EnvironmentalData } from '@/types';
import styles from '@/app/dashboard/dashboard.module.css';

interface EnvironmentalsCardProps {
  data: EnvironmentalData;
}

/** Animated count-up for decimal values */
function useCountUpFloat(target: number, decimals = 1, duration = 1400): string {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(id);
      } else {
        setCurrent(start);
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return current.toFixed(decimals);
}

function useCountUpInt(target: number, duration = 1200): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
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
  }, [target, duration]);
  return current;
}

export default function EnvironmentalsCard({ data }: EnvironmentalsCardProps) {
  const humidity = useCountUpInt(data.humidity);
  const temp = useCountUpFloat(data.temperature, 1);
  const co2 = useCountUpInt(data.co2);
  const vpd = useCountUpFloat(data.vpd, 2);

  return (
    <motion.div
      className={styles.envCard}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.55, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.envTitle}>Environmentals</div>
      <div className={styles.envGrid}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.35 }}
        >
          <div className={styles.envLabel}>Humidity</div>
          <div className={styles.envVal}>
            {humidity}<span className={styles.envUnit}>%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.35 }}
        >
          <div className={styles.envLabel}>Temp</div>
          <div className={styles.envVal}>
            {temp}<span className={styles.envUnit}>°C</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.86, duration: 0.35 }}
        >
          <div className={styles.envLabel}>CO2</div>
          <div className={styles.envVal}>
            {co2}<span className={styles.envUnit}>ppm</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.94, duration: 0.35 }}
        >
          <div className={styles.envLabel}>VPD</div>
          <div className={styles.envVal}>{vpd}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

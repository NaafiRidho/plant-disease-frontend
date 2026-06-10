'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDashboardData } from '@/services/api';
import type { DashboardData } from '@/types';

import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { StatsRow } from '@/components/dashboard/StatCard';
import InsightsChart from '@/components/dashboard/InsightsChart';
import RecentScans from '@/components/dashboard/RecentScans';
import EnvironmentalsCard from '@/components/dashboard/EnvironmentalsCard';

import styles from './dashboard.module.css';

const REFRESH_INTERVAL = 30_000;

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const result = await getDashboardData();
      setData(result);
    } catch (err) {
      console.error("Gagal mengambil data dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <div className={styles.dashboardRoot}>
      <DashboardTopbar />

      <main className={styles.page}>
        <div className={styles.colLeft}>
          {/* Stats Section */}
          {loading || !data ? (
            <div className={styles.statsRow}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonStat}`} />
              ))}
            </div>
          ) : (
            <StatsRow stats={data.stats} />
          )}

          {/* Insights Section */}
          <AnimatePresence mode="wait">
            {loading || !data ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.skeleton} ${styles.skeletonInsights}`} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <InsightsChart data={data.growthData} quote={data.insightQuote} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Scans Section */}
          <AnimatePresence mode="wait">
            {loading || !data ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.skeleton} ${styles.skeletonScans}`} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <RecentScans scans={data.scans} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.colRight}>
          {/* Environmentals Section */}
          {loading || !data ? (
            <div className={`${styles.skeleton} ${styles.skeletonEnv}`} />
          ) : (
            <EnvironmentalsCard data={data.environmentals} />
          )}
        </div>
      </main>
    </div>
  );
}
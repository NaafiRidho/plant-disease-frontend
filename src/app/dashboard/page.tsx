"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  getDashboardData,
  apiGetHistories,
  apiGetHistoryStats,
  apiGetHistoryTrend,
  apiDeleteHistory,
} from "@/services/api";
import type { DashboardData } from "@/types";
import { useAuth } from "@/components/AuthContext";

import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { StatsRow } from "@/components/dashboard/StatCard";
import InsightsChart from "@/components/dashboard/InsightsChart";
import RecentScans from "@/components/dashboard/RecentScans";
import EnvironmentalsCard from "@/components/dashboard/EnvironmentalsCard";
import MonitorCard from "@/components/dashboard/MonitorCard";

import styles from "./dashboard.module.css";

const REFRESH_INTERVAL = 30_000;

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Dashboard overall structure
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal & Toast States
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Pagination states
  const [scans, setScans] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Trend period (default monthly)
  const [trendPeriod, setTrendPeriod] = useState("monthly");

  // Enforce login requirement
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?returnUrl=/dashboard");
    }
  }, [user, authLoading, router]);

  const fetchData = useCallback(async () => {
    if (!user) return;

    try {
      // Fetch real data directly from existing controllers
      const [statsRes, trendRes, listRes] = await Promise.all([
        apiGetHistoryStats(),
        apiGetHistoryTrend(trendPeriod),
        apiGetHistories({ page: currentPage, per_page: 5 }),
      ]);

      // Map backend stats to Dashboard stats interface
      const statsPayload = statsRes.data || {};
      const total = statsPayload.total || 0;
      const totalDiseased = statsPayload.total_diseased || 0;
      const totalHealthy = statsPayload.total_healthy || 0;
      const healthIndex =
        total > 0 ? Math.round((totalHealthy / total) * 100) : 100;

      const stats = {
        totalScans: total,
        healthyScans: totalHealthy,
        alerts: totalDiseased,
        criticalAlerts: totalDiseased,
        healthIndex: healthIndex,
      };

      // Map backend trend to GrowthDataPoints format
      const trendPayload = trendRes.data || {};
      const labels = trendPayload.labels || [];
      const totals = trendPayload.total || [];
      const growthData = labels.map((label: string, index: number) => ({
        week: label.toUpperCase(),
        value: totals[index] || 0,
      }));

      const scanItems = listRes.data || [];
      setScans(scanItems);
      if (listRes.pagination) {
        setCurrentPage(listRes.pagination.page);
        setTotalPages(listRes.pagination.total_pages);
      }

      // Get standard static parts from mock/fallback config
      const baseDashboard = await getDashboardData();

      setData({
        stats,
        scans: scanItems,
        environmentals: baseDashboard.environmentals,
        growthData,
        monitor: baseDashboard.monitor,
        insightQuote: `Indeks kesehatan tanaman kebun Anda saat ini berada pada tingkat ${healthIndex}%. Terus pantau kesehatan tanaman.`,
      });
    } catch (err) {
      console.error("Gagal mengambil data dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, [user, currentPage, trendPeriod]);

  // Handle page selection
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle deletion of a scan history item
  const handleDeleteScan = (id: number) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId === null) return;
    try {
      await apiDeleteHistory(deleteConfirmId);
      showToast("Riwayat berhasil dihapus", "success");
      fetchData();
    } catch (err: any) {
      showToast(err.message || "Gagal menghapus riwayat", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  useEffect(() => {
    if (user) {
      fetchData();
      const id = setInterval(fetchData, REFRESH_INTERVAL);
      return () => clearInterval(id);
    }
  }, [fetchData, user]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div
        style={{
          backgroundColor: "#020b14",
          color: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>Mengalihkan ke halaman masuk...</span>
      </div>
    );
  }

  return (
    <div className={styles.dashboardRoot}>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 20, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: '50%',
              zIndex: 9999,
              background: toast.type === 'error' 
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(153, 27, 27, 0.95))'
                : 'linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(21, 128, 61, 0.95))',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: '16px',
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: toast.type === 'error'
                ? '0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                : '0 10px 25px -5px rgba(34, 197, 94, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirmId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(2, 11, 20, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: 'linear-gradient(180deg, rgba(6, 26, 48, 0.9) 0%, rgba(2, 11, 20, 0.95) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '24px',
                padding: '32px',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '16px', fontWeight: 700 }}>Hapus Riwayat?</h3>
              <p style={{ color: 'rgba(240, 253, 244, 0.7)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.5 }}>
                Tindakan ini tidak dapat dibatalkan. Riwayat deteksi ini akan dihapus secara permanen.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={cancelDelete}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={styles.page}>
        <div className={styles.colLeft}>
          {/* Stats Section */}
          {loading || !data ? (
            <div className={styles.statsRow}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`${styles.skeleton} ${styles.skeletonStat}`}
                />
              ))}
            </div>
          ) : (
            <StatsRow stats={data.stats} />
          )}

          {/* Insights Section */}
          <AnimatePresence mode="wait">
            {loading || !data ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.skeleton} ${styles.skeletonInsights}`}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <InsightsChart
                  data={data.growthData}
                  quote={data.insightQuote}
                  activeTab={trendPeriod === "weekly" ? "week" : "month"}
                  onTabChange={(tab) =>
                    setTrendPeriod(tab === "week" ? "weekly" : "monthly")
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Scans Section (Paginated & Actionable) */}
          <AnimatePresence mode="wait">
            {loading || !data ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.skeleton} ${styles.skeletonScans}`}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <RecentScans
                  scans={scans}
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onDeleteScan={handleDeleteScan}
                  isAuthenticated={!!user}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GrowthDataPoint } from "@/types";
import styles from "@/app/dashboard/dashboard.module.css";

interface InsightsChartProps {
  data: GrowthDataPoint[];
  quote: string;
  activeTab: "week" | "month";
  onTabChange: (tab: "week" | "month") => void;
}

/**
 * Convert data values (0-90) into SVG coordinates for a 560×90 viewBox.
 * The chart is inverted: lower Y in SVG = higher value.
 */
function buildPath(data: GrowthDataPoint[]): {
  polyline: string;
  polygon: string;
  peak: { cx: number; cy: number };
  points: { x: number; y: number; value: number }[];
} {
  const w = 560;
  const h = 90;

  if (!data || data.length === 0) {
    return {
      polyline: "",
      polygon: "",
      peak: { cx: 0, cy: 0 },
      points: [],
    };
  }

  const step = w / Math.max(data.length - 1, 1);
  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const valRange = Math.max(maxVal - minVal, 1);

  const points = data.map((d, i) => {
    const normalized = (d.value - minVal) / valRange;
    const y = 70 - normalized * 45; // Maps to Y range [25, 70] to prevent overflow of text
    return {
      x: i * step,
      y: y,
      value: d.value,
    };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const polygon = `${polyline} ${w},${h} 0,${h}`;

  // Find peak (lowest Y = highest point on chart)
  const peakPoint = points.reduce(
    (min, p) => (p.y < min.y ? p : min),
    points[0],
  );
  const peak = { cx: peakPoint.x, cy: peakPoint.y };

  return { polyline, polygon, peak, points };
}

export default function InsightsChart({
  data,
  quote,
  activeTab,
  onTabChange,
}: InsightsChartProps) {
  const { polyline, polygon, peak, points } = buildPath(data);

  return (
    <motion.div
      className={styles.insightsCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>AI SCAN DISTRIBUTION</div>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "week" ? styles.tabOn : styles.tabOff}`}
            onClick={() => onTabChange("week")}
          >
            Week
          </button>
          <button
            className={`${styles.tab} ${activeTab === "month" ? styles.tabOn : styles.tabOff}`}
            onClick={() => onTabChange("month")}
          >
            Month
          </button>
        </div>
      </div>

      <div className={styles.chartWrap} style={{ position: "relative" }}>
        {data.length === 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font)",
              letterSpacing: "0.5px",
            }}
          >
            Belum ada riwayat pemindaian{" "}
            {activeTab === "week" ? "minggu" : "bulan"} ini
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.svg
            key={activeTab}
            viewBox="0 0 560 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* grid lines */}
            <line
              x1="0"
              y1="22"
              x2="560"
              y2="22"
              stroke="#1a2a1a"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="44"
              x2="560"
              y2="44"
              stroke="#1a2a1a"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="66"
              x2="560"
              y2="66"
              stroke="#1a2a1a"
              strokeWidth="0.5"
            />
            {/* area fill */}
            {data.length > 0 && (
              <motion.polygon
                points={polygon}
                fill="url(#chartGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              />
            )}
            {/* line */}
            {data.length > 0 && (
              <motion.polyline
                points={polyline}
                fill="none"
                stroke="#4ade80"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />
            )}
            {/* Value markers and labels */}
            {data.length > 0 &&
              points.map((p, idx) => (
                <g key={idx}>
                  {/* circle background glow */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="7"
                    fill="#4ade80"
                    opacity="0.18"
                  />
                  {/* circle point */}
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#4ade80" />
                </g>
              ))}
          </motion.svg>
        </AnimatePresence>

        {/* Absolute HTML overlay to prevent distorted/squashed font (penyok) */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {data.length > 0 &&
            points.map((p, idx) => {
              if (p.value <= 0) return null;
              const leftPercent = (p.x / 560) * 100;
              const topPercent = (p.y / 90) * 100;
              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: `translate(${idx === 0 ? "0%" : idx === points.length - 1 ? "-100%" : "-50%"}, -100%) translateY(-6px)`,
                    color: "#4ade80",
                    fontSize: "10px",
                    fontWeight: "800",
                    fontFamily: "var(--mono)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.value} {p.value === 1 ? "scan" : "scans"}
                </div>
              );
            })}
        </div>
      </div>

      <div className={styles.chartLabels}>
        {data.map((d) => (
          <span
            key={d.week}
            style={{
              color: "var(--text-hi)",
              fontWeight: 600,
              fontSize: "10px",
            }}
          >
            {d.week}
          </span>
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

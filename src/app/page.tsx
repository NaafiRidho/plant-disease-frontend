'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="landing-page">
      {/* Scope all landing page specific styling within .landing-page */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap");
        @import url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css");

        .landing-page {
          --green:        #4ade80;
          --green-bright: #22c55e;
          --green-glow:   rgba(74,222,128,0.25);
          --green-faint:  rgba(74,222,128,0.07);
          --bg:           #080e09;
          --bg2:          #0b130c;
          --bg3:          #0e1a0f;
          --card:         #0f1a10;
          --card2:        #111f12;
          --border:       rgba(74,222,128,0.12);
          --border2:      rgba(74,222,128,0.22);
          --text-hi:      #e8f5e8;
          --text-mid:     #7a9a7a;
          --text-lo:      #3a5a3a;
          --font-display: 'Plus Jakarta Sans', sans-serif;
          --font-body:    'Plus Jakarta Sans', sans-serif;
          --font-mono:    'DM Mono', monospace;

          background: var(--bg);
          color: var(--text-hi);
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Force Plus Jakarta Sans font on all elements inside .landing-page */
        .landing-page h1, 
        .landing-page h2, 
        .landing-page h3, 
        .landing-page h4, 
        .landing-page p, 
        .landing-page span, 
        .landing-page a, 
        .landing-page button, 
        .landing-page div {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Noise overlay specific to landing page background */
        .landing-page .noise-overlay {
          position: fixed; inset: 0; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
        }

        /* ── HERO ──────────────────────────────────── */
        .landing-page .hero {
          min-height: 100vh;
          padding: 120px 40px 60px;
          display: flex; align-items: center;
          background: radial-gradient(ellipse 80% 60% at 60% 50%, rgba(22,101,52,0.22) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 20% 30%, rgba(74,222,128,0.06) 0%, transparent 60%),
                      var(--bg);
          position: relative; overflow: hidden;
        }
        .landing-page .hero::before {
          content: '';
          position: absolute; top: -80px; right: -80px;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(22,101,52,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .landing-page .hero-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
          position: relative; z-index: 1;
          width: 100%;
        }
        .landing-page .hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(74,222,128,0.08);
          border: 0.5px solid var(--border2);
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 11px; font-weight: 600;
          color: var(--green); letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 22px;
          width: fit-content;
        }
        .landing-page .hero-badge i { font-size: 13px; }
        
        .landing-page .hero-title-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }
        .landing-page .hero h1 {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800; line-height: 1.12;
          color: var(--text-hi);
          margin: 0;
        }
        .landing-page .hero p {
          font-size: 15px; color: var(--text-mid); line-height: 1.75;
          margin-bottom: 36px; max-width: 460px;
        }
        .landing-page .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        
        /* Proportional Buttons */
        .landing-page .btn-primary, .landing-page .btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 14px; font-weight: 700;
          padding: 0 26px; border-radius: 24px;
          text-decoration: none; cursor: pointer;
          transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          height: 48px;
          box-sizing: border-box;
          white-space: nowrap;
        }
        .landing-page .btn-primary {
          background: var(--green) !important;
          color: #061008 !important;
          border: 1px solid var(--green) !important;
          box-shadow: 0 4px 20px rgba(74,222,128,0.22) !important;
        }
        .landing-page .btn-primary:hover {
          background: #6ee79a !important;
          border-color: #6ee79a !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(74,222,128,0.35) !important;
        }
        .landing-page .btn-secondary {
          background: transparent !important;
          color: var(--text-hi) !important;
          border: 1px solid var(--border2) !important;
        }
        .landing-page .btn-secondary:hover {
          color: var(--green) !important;
          border-color: var(--green) !important;
          background: rgba(74,222,128,0.06) !important;
          transform: translateY(-2px);
        }

        /* ── HERO VISUAL ───────────────────────────── */
        .landing-page .hero-visual {
          position: relative; display: flex; align-items: center; justify-content: center;
        }
        .landing-page .phone-frame {
          width: 280px; height: 380px;
          background: linear-gradient(145deg, #0f1f10, #0a1a0b);
          border: 1.5px solid var(--border2);
          border-radius: 28px;
          position: relative; overflow: hidden;
          box-shadow: 0 0 60px rgba(74,222,128,0.12), 0 40px 80px rgba(0,0,0,0.6);
        }
        .landing-page .phone-frame::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 30%, rgba(74,222,128,0.12) 0%, transparent 60%);
        }
        .landing-page .phone-leaf {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .landing-page .phone-leaf svg { width: 100%; height: 100%; opacity: 0.85; }
        .landing-page .scan-line {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, var(--green), transparent);
          animation: scan 2.5s ease-in-out infinite;
          box-shadow: 0 0 12px var(--green);
        }
        @keyframes scan {
          0%  { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100%{ top: 90%; opacity: 0; }
        }
        .landing-page .scan-corners {
          position: absolute; inset: 16px;
          border: 1.5px solid rgba(74,222,128,0.3);
          border-radius: 12px;
          pointer-events: none;
        }
        .landing-page .scan-corners::before, .landing-page .scan-corners::after {
          content: '';
          position: absolute;
          width: 18px; height: 18px;
          border-color: var(--green);
          border-style: solid;
        }
        .landing-page .scan-corners::before { top: -1.5px; left: -1.5px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
        .landing-page .scan-corners::after  { bottom: -1.5px; right: -1.5px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }
        .landing-page .phone-badge-top {
          position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
          background: rgba(74,222,128,0.15);
          border: 0.5px solid var(--border2);
          border-radius: 10px; padding: 5px 12px;
          font-size: 11px; font-weight: 700; color: var(--green);
          font-family: var(--font-mono) !important; white-space: nowrap;
          display: flex; align-items: center; gap: 6px;
        }
        .landing-page .phone-badge-top i { font-size: 13px; }
        .landing-page .phone-status {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(5,15,5,0.97), rgba(5,15,5,0.6));
          padding: 14px 16px 16px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .landing-page .status-tag {
          font-size: 11px; font-weight: 800;
          color: var(--green); letter-spacing: 1px;
        }
        .landing-page .status-complete { font-size: 10px; color: var(--text-mid); }

        /* floating chips */
        .landing-page .chip {
          position: absolute;
          background: rgba(10,22,11,0.92);
          border: 0.5px solid var(--border2);
          border-radius: 12px; padding: 8px 14px;
          font-size: 11px; font-weight: 600;
          display: flex; align-items: center; gap: 7px;
          backdrop-filter: blur(8px);
          animation: float 4s ease-in-out infinite;
        }
        .landing-page .chip i { font-size: 15px; color: var(--green); }
        .landing-page .chip-neural { top: 30px; left: -30px; color: var(--text-mid); animation-delay: 0s; }
        .landing-page .chip-neural .dot-small { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: blink 1.2s infinite; }
        
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float2 { 0%,100%{transform:translateY(-50%)} 50%{transform:translateY(calc(-50% - 8px))} }
        
        .landing-page .chip-flask { right: -20px; top: 40%; transform: translateY(-50%); color: var(--text-mid); animation: float2 4s ease-in-out infinite; animation-delay: 1.2s; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        /* ── STATS BAR ─────────────────────────────── */
        .landing-page .stats-bar {
          background: var(--bg2);
          border-top: 0.5px solid var(--border);
          border-bottom: 0.5px solid var(--border);
          padding: 40px;
        }
        .landing-page .stats-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 0.5px solid var(--border);
          border-radius: 14px; overflow: hidden;
        }
        .landing-page .stat-item {
          background: var(--card);
          padding: 28px 24px;
          text-align: center;
          position: relative;
          transition: background 0.2s;
        }
        .landing-page .stat-item:hover { background: var(--card2); }
        .landing-page .stat-item i {
          font-size: 26px; color: var(--green);
          margin-bottom: 10px; display: block;
          opacity: 0.8;
        }
        .landing-page .stat-num {
          font-size: 32px; font-weight: 800;
          color: var(--text-hi); line-height: 1;
          margin-bottom: 6px;
        }
        .landing-page .stat-label { font-size: 12px; color: var(--text-mid); font-weight: 400; }

        /* ── FEATURES ──────────────────────────────── */
        .landing-page .features {
          padding: 100px 40px;
          background: var(--bg);
        }
        .landing-page .section-header { text-align: center; margin-bottom: 60px; }
        .landing-page .section-tag {
          display: inline-block;
          font-size: 11px; font-weight: 600;
          color: var(--green); letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 14px;
        }
        .landing-page .section-title {
          font-size: clamp(28px, 3vw, 40px); font-weight: 800;
          color: var(--text-hi); margin-bottom: 14px;
        }
        .landing-page .section-title span { color: var(--green); }
        .landing-page .section-sub { font-size: 15px; color: var(--text-mid); max-width: 480px; margin: 0 auto; line-height: 1.7; }

        .landing-page .features-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
        }
        .landing-page .feat-card {
          background: var(--card);
          border: 0.5px solid var(--border);
          border-radius: 16px;
          padding: 28px 24px;
          transition: border-color 0.2s, transform 0.2s, background 0.2s;
          cursor: default;
        }
        .landing-page .feat-card:hover {
          border-color: var(--border2);
          background: var(--card2);
          transform: translateY(-3px);
        }
        .landing-page .feat-icon {
          width: 44px; height: 44px;
          background: var(--green-faint);
          border: 0.5px solid var(--border2);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .landing-page .feat-icon i { font-size: 22px; color: var(--green); }
        .landing-page .feat-title {
          font-size: 15px; font-weight: 700;
          color: var(--text-hi); margin-bottom: 10px;
        }
        .landing-page .feat-desc { font-size: 13px; color: var(--text-mid); line-height: 1.7; }

        /* ── CTA SECTION ───────────────────────────── */
        .landing-page .cta-section {
          padding: 80px 40px;
          background: var(--bg2);
        }
        .landing-page .cta-inner {
          max-width: 700px; margin: 0 auto;
          background: var(--card);
          border: 1px dashed var(--border2);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .landing-page .cta-inner::before {
          content: '';
          position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .landing-page .cta-icon {
          width: 60px; height: 60px;
          background: rgba(74,222,128,0.1);
          border: 0.5px solid var(--border2);
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 22px;
        }
        .landing-page .cta-icon i { font-size: 28px; color: var(--green); }
        .landing-page .cta-title {
          font-size: clamp(26px, 3vw, 36px); font-weight: 800;
          color: var(--text-hi); margin-bottom: 14px;
        }
        .landing-page .cta-title span { color: var(--green); }
        .landing-page .cta-sub { font-size: 14px; color: var(--text-mid); margin-bottom: 32px; line-height: 1.7; max-width: 440px; margin-left: auto; margin-right: auto; }
        .landing-page .cta-tags {
          display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .landing-page .cta-tag {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--text-mid);
        }
        .landing-page .cta-tag i { font-size: 14px; color: var(--green); }

        /* ── FOOTER ────────────────────────────────── */
        .landing-page footer {
          background: var(--bg);
          border-top: 0.5px solid var(--border);
          padding: 40px 40px 30px;
        }
        .landing-page .footer-inner {
          max-width: 1200px; margin: 0 auto;
        }
        .landing-page .footer-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 40px; margin-bottom: 36px; flex-wrap: wrap;
        }
        .landing-page .footer-logo {
          display: flex; align-items: center; gap: 9px;
          font-size: 18px; font-weight: 800;
          color: var(--text-hi); margin-bottom: 8px;
          text-decoration: none;
        }
        .landing-page .footer-logo .dot {
          width: 24px; height: 24px; border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #4ade80, #166534);
          box-shadow: 0 0 10px rgba(74,222,128,0.4);
          display: flex; align-items: center; justify-content: center; font-size: 12px;
        }
        .landing-page .footer-logo span { color: var(--green); }
        .landing-page .footer-tagline { font-size: 12px; color: var(--text-lo); max-width: 220px; line-height: 1.6; text-align: left; }

        .landing-page .footer-links {
          display: flex; gap: 40px; flex-wrap: wrap;
        }
        .landing-page .footer-col-title {
          font-size: 11px; font-weight: 600;
          color: var(--text-lo); letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 14px;
        }
        .landing-page .footer-col a {
          display: block; font-size: 13px; color: var(--text-mid);
          text-decoration: none; margin-bottom: 8px;
          transition: color 0.15s;
          text-align: left;
        }
        .landing-page .footer-col a:hover { color: var(--green); }

        .landing-page .footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 24px; border-top: 0.5px solid var(--border);
          flex-wrap: wrap; gap: 12px;
        }
        .landing-page .footer-copy { font-size: 12px; color: var(--text-lo); }
        .landing-page .footer-icons { display: flex; gap: 14px; }
        .landing-page .footer-icons a {
          width: 34px; height: 34px; border-radius: 8px;
          background: var(--card); border: 0.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-lo); text-decoration: none;
          transition: color 0.15s, border-color 0.15s;
        }
        .landing-page .footer-icons a:hover { color: var(--green); border-color: var(--border2); }
        .landing-page .footer-icons i { font-size: 16px; }
        .landing-page .footer-contact { font-size: 12px; color: var(--text-lo); text-align: center; }

        /* Responsive overrides */
        @media (max-width: 900px) {
          .landing-page .hero-inner { grid-template-columns: 1fr; gap: 40px; text-align: center; }
          .landing-page .hero-title-row { justify-content: center; }
          .landing-page .hero p { margin: 0 auto 36px !important; text-align: center !important; }
          .landing-page .hero-btns { justify-content: center; }
          .landing-page .hero-visual { justify-content: center; }
          .landing-page .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .landing-page .features-grid { grid-template-columns: repeat(2, 1fr); }
          .landing-page .hero { padding: 90px 20px 50px; }
          .landing-page .features, .landing-page .stats-bar, .landing-page .cta-section { padding-left: 20px; padding-right: 20px; }
          .landing-page footer { padding: 32px 20px 24px; }
        }
        @media (max-width: 600px) {
          .landing-page .stats-inner { grid-template-columns: 1fr 1fr; }
          .landing-page .features-grid { grid-template-columns: 1fr; }
          .landing-page .footer-top { flex-direction: column; }
          .landing-page .footer-links { gap: 24px; }
          .landing-page .phone-frame { width: 230px; height: 310px; }
        }
      ` }} />

      <div className="noise-overlay" />

      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero-inner">
          {/* Text Side */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-badge">
              <i className="ti ti-cpu"></i>
              AI Powered Diagnosis
            </div>

            {/* Title with Scan Icon */}
            <div className="hero-title-row">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                border: '1.5px solid rgba(74,222,128,0.3)',
                background: 'rgba(74,222,128,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green)',
                fontSize: '20px',
                flexShrink: 0
              }}>
                <i className="ti ti-scan"></i>
              </div>
              <h1 style={{ textAlign: 'left' }}>
                <span style={{ color: 'var(--green)' }}>Deteksi Penyakit</span> Tanaman
              </h1>
            </div>

            <p style={{ textAlign: 'left' }}>
              Upload foto daun tanaman untuk mendeteksi penyakit secara otomatis menggunakan AI
            </p>

            <div className="hero-btns">
              <Link href="/deteksi" className="btn-primary">
                <i className="ti ti-scan"></i>
                Mulai Deteksi
                <i className="ti ti-arrow-right"></i>
              </Link>
              <Link href="/tentang" className="btn-secondary">
                <i className="ti ti-books"></i>
                Pelajari Sistem
              </Link>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Floating chips */}
            <div className="chip chip-neural">
              <div className="dot-small"></div>
              Neural Net
            </div>
            <div className="chip chip-flask">
              <i className="ti ti-flask"></i>
            </div>

            {/* Phone frame */}
            <div className="phone-frame">
              <div className="phone-leaf">
                <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="lg1" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#1a4a1a" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#091209" stopOpacity="1" />
                    </radialGradient>
                    <radialGradient id="gl" cx="50%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#4ade80" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="280" height="380" fill="url(#lg1)" />
                  <ellipse cx="140" cy="220" rx="130" ry="130" fill="url(#gl)" />
                  {/* leaf body */}
                  <ellipse cx="140" cy="200" rx="100" ry="120" fill="#0f2a0f" opacity="0.9" />
                  <ellipse cx="95" cy="175" rx="80" ry="95" fill="#0d250d" transform="rotate(-25 95 175)" />
                  <ellipse cx="185" cy="170" rx="75" ry="88" fill="#0c220c" transform="rotate(22 185 170)" />
                  <ellipse cx="140" cy="265" rx="90" ry="55" fill="#112511" transform="rotate(-5 140 265)" />
                  {/* stem */}
                  <line x1="140" y1="200" x2="140" y2="48" stroke="#1e5a1e" strokeWidth="3" strokeLinecap="round" />
                  {/* veins */}
                  <line x1="140" y1="200" x2="82" y2="130" stroke="#1a4a1a" strokeWidth="2" />
                  <line x1="140" y1="200" x2="198" y2="125" stroke="#1a4a1a" strokeWidth="2" />
                  <line x1="140" y1="200" x2="72" y2="195" stroke="#1a4a1a" stroke-width="2" />
                  <line x1="140" y1="200" x2="208" y2="200" stroke="#1a4a1a" stroke-width="2" />
                  <line x1="140" y1="200" x2="90" y2="255" stroke="#1a4a1a" stroke-width="1.5" />
                  <line x1="140" y1="200" x2="190" y2="258" stroke="#1a4a1a" stroke-width="1.5" />
                  {/* sub-veins */}
                  <line x1="140" y1="200" x2="108" y2="85" stroke="#163216" stroke-width="1.2" />
                  <line x1="140" y1="200" x2="172" y2="80" stroke="#163216" stroke-width="1.2" />
                  {/* glow overlay */}
                  <ellipse cx="140" cy="190" rx="70" ry="80" fill="none" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3" />
                </svg>
              </div>
              <div className="scan-corners"></div>
              <div className="scan-line"></div>
              <div className="phone-badge-top">
                <i className="ti ti-check"></i>
                98.4% Match
              </div>
              <div className="phone-status">
                <div className="status-tag">DIAGNOSA: SEHAT</div>
                <div className="status-complete">Scanning Complete</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR SECTION ── */}
      <section className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item">
            <i className="ti ti-virus"></i>
            <div className="stat-num">15+</div>
            <div className="stat-label">Jenis Penyakit</div>
          </div>
          <a href="/spesiestanaman">
            <div className="stat-item">
              <i className="ti ti-trees"></i>
              <div className="stat-num">3</div>
              <div className="stat-label">Spesies Utama</div>
            </div>
          </a>

          <div className="stat-item">
            <i className="ti ti-database"></i>
            <div className="stat-num">87K+</div>
            <div className="stat-label">Dataset Ahli</div>
          </div>
          <div className="stat-item">
            <i className="ti ti-target"></i>
            <div className="stat-num">95%+</div>
            <div className="stat-label">Akurasi Model</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="features">
        <div className="section-header">
          <div className="section-tag">Kemampuan Sistem</div>
          <h2 className="section-title">Fitur <span>Unggulan</span></h2>
          <p className="section-sub">Teknologi mutakhir untuk membantu Anda merawat ekosistem hijau dengan lebih cerdas dan efisien.</p>
        </div>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-icon"><i className="ti ti-file-upload"></i></div>
            <div className="feat-title">Upload Mudah</div>
            <p className="feat-desc">Cukup tarik dan lepaskan foto daun tanaman Anda langsung dari galeri atau kamera handphone.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon"><i className="ti ti-bolt"></i></div>
            <div className="feat-title">Deteksi Instan</div>
            <p className="feat-desc">Arsitektur Neural Network memberikan hasil diagnosa dalam hitungan milidetik secara real-time.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon"><i className="ti ti-user-search"></i></div>
            <div className="feat-title">Panduan Ahli</div>
            <p className="feat-desc">Akses database agronomi yang komprehensif untuk langkah penanganan yang tepat dan akurat.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon"><i className="ti ti-microscope"></i></div>
            <div className="feat-title">Analisis Akurat</div>
            <p className="feat-desc">Verifikasi ilmiah menggunakan ribuan dataset tervalidasi oleh pakar patologi tanaman.</p>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-icon"><i className="ti ti-cloud-upload"></i></div>
          <h2 className="cta-title">Mulai <span>Deteksi</span></h2>
          <p className="cta-sub">Mulai deteksi sekarang dengan mengunggah foto daun yang bermasalah. Pastikan pencahayaan cukup dan fokus.</p>
          <div className="cta-tags">
            <div className="cta-tag"><i className="ti ti-check"></i> JPG, PNG, HEIC</div>
            <div className="cta-tag"><i className="ti ti-check"></i> AI Processing</div>
          </div>
          <Link href="/deteksi" className="btn-primary" style={{ fontSize: '15px' }}>
            <i className="ti ti-scan"></i>
            Upload Foto Sekarang
          </Link>
        </div>
      </section>

      {/* ── FOOTER SECTION ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <div className="dot">🌿</div>
                Plant<span style={{ color: 'var(--green)' }}>Scan AI</span>
              </Link>
              <p className="footer-tagline">© 2024 PlantScan AI Systems. Cultivating the digital wilderness.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <div className="footer-col-title" style={{ color: 'var(--text-lo)', marginBottom: '14px' }}>Produk</div>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Service</Link>
              </div>
              <div className="footer-col">
                <div className="footer-col-title" style={{ color: 'var(--text-lo)', marginBottom: '14px' }}>Developer</div>
                <Link href="#">API Documentation</Link>
                <Link href="#">Botanical Database</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2024 PlantScan AI. All rights reserved.</div>
            <div className="footer-contact">Contact Us</div>
            <div className="footer-icons">
              <Link href="#"><i className="ti ti-world"></i></Link>
              <Link href="#"><i className="ti ti-share"></i></Link>
              <Link href="#"><i className="ti ti-mail"></i></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

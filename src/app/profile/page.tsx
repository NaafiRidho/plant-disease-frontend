'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Settings as SettingsIcon, 
  Search, 
  Shield, 
  Lock, 
  LogOut, 
  Sliders, 
  User, 
  Check, 
  Edit3
} from 'lucide-react';
import Image from 'next/image';
// Menggunakan Link dari Next.js untuk routing client-side
import Link from 'next/link';

export default function SettingsDashboard() {
  // State untuk AI Preferences
  const [highPrecision, setHighPrecision] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [sensitivity, setSensitivity] = useState(85);

  // State untuk Notifications
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  // Palet Warna Asli sesuai UI Gambar
  const colors = {
    bgMain: '#0b0f10',        // Latar belakang hitam pekat
    bgCard: '#14181a',        // Abu-abu gelap kontainer utama
    bgInnerCard: '#1a1f22',   // Abu-abu gelap untuk card security inner
    primaryGreen: '#22c55e',  // Hijau terang aksen aktif
    textMuted: '#8b949e',     // Abu-abu pudar deskripsi text
    border: '#21262d',        // Border subtle untuk pembatas komponen
    logoutBg: '#211617',      // Background subtle merah transparan untuk log out
    logoutText: '#ff7b72',    // Warna teks merah hazard sign out
  };

  return (
    <div style={{ backgroundColor: colors.bgMain, color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '4rem' }}>
      

      {/* UTAMA CONTAINER */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        
        {/* JUDUL HALAMAN */}
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Profile Settings</h1>
          <p style={{ color: colors.textMuted, fontSize: '0.95rem', margin: 0 }}>
            Manage your botanical intelligence parameters and account security.
          </p>
        </header>

        {/* CONTAINER UTAMA / PROFILE CARD */}
        <div style={{ backgroundColor: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Farhan Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              {/* FIXED: Membungkus tombol icon edit photo dengan Link agar mengarah ke halaman editprofile */}
              <Link href="/profile/editprofile" style={{ textDecoration: 'none' }}>
                <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', backgroundColor: colors.primaryGreen, borderRadius: '50%', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${colors.bgCard}` }}>
                  <Edit3 size={12} color="#ffffff" />
                </div>
              </Link>
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#4ade80' }}>Farhan</h2>
              <p style={{ color: colors.textMuted, fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>Farhan@gmail.com</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', padding: '2px 8px', borderRadius: '100px' }}>
                <Check size={10} color="#4ade80" />
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#4ade80' }}>Identity Verified</span>
              </div>
            </div>
          </div>

          <Link href="/profile/editprofile">  
            <button style={{ backgroundColor: colors.primaryGreen, color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
            Edit Profile
            </button>
          </Link>
        </div>

        {/* SECTION PREFERENCES DAN NOTIFICATIONS (GRID) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* AI Preferences */}
          <div style={{ backgroundColor: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Sliders size={16} color={colors.primaryGreen} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>AI Preferences</h3>
            </div>

            {/* Toggle Item 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.2rem 0' }}>High Precision Mode</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Deep neural scan for rare pathogens (Consumes more credits)</p>
              </div>
              <div 
                onClick={() => setHighPrecision(!highPrecision)}
                style={{ width: '42px', height: '24px', backgroundColor: highPrecision ? colors.primaryGreen : '#30363d', borderRadius: '50px', padding: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: highPrecision ? 'flex-end' : 'flex-start', transition: 'all 0.2s' }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {highPrecision && <Check size={12} color={colors.primaryGreen} style={{ fontWeight: 'bold' }} />}
                </div>
              </div>
            </div>

            {/* Toggle Item 2 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.2rem 0' }}>Auto-Scan Upload</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Automatically process images detected in local garden folder</p>
              </div>
              <div 
                onClick={() => setAutoScan(!autoScan)}
                style={{ width: '42px', height: '24px', backgroundColor: autoScan ? colors.primaryGreen : '#2d3139', borderRadius: '50px', padding: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: autoScan ? 'flex-end' : 'flex-start', transition: 'all 0.2s' }}
              >
                <div style={{ width: '20px', height: '20px', backgroundColor: autoScan ? '#ffffff' : '#484f58', borderRadius: '50%' }} />
              </div>
            </div>

            {/* Slider Sensitivity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pest Alert Sensitivity</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.primaryGreen }}>{sensitivity}%</span>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sensitivity} 
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: colors.primaryGreen, cursor: 'pointer', height: '4px', backgroundColor: '#30363d', borderRadius: '2px' }}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div style={{ backgroundColor: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Bell size={16} color={colors.primaryGreen} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Notifications</h3>
            </div>

            {/* Checkbox 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem', cursor: 'pointer' }} onClick={() => setEmailAlerts(!emailAlerts)}>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: `1px solid ${emailAlerts ? colors.primaryGreen : '#484f58'}`, backgroundColor: emailAlerts ? colors.primaryGreen : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', transition: 'all 0.1s' }}>
                {emailAlerts && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.15rem 0' }}>Email Alerts</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Weekly plant health summaries</p>
              </div>
            </div>

            {/* Checkbox 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem', cursor: 'pointer' }} onClick={() => setPushNotifications(!pushNotifications)}>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: `1px solid ${pushNotifications ? colors.primaryGreen : '#484f58'}`, backgroundColor: pushNotifications ? colors.primaryGreen : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', transition: 'all 0.1s' }}>
                {pushNotifications && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.15rem 0' }}>Push Notifications</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Real-time pest detection alerts</p>
              </div>
            </div>

            {/* Checkbox 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setSmsAlerts(!smsAlerts)}>
              <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: `1px solid ${smsAlerts ? colors.primaryGreen : '#484f58'}`, backgroundColor: smsAlerts ? colors.primaryGreen : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px', transition: 'all 0.1s' }}>
                {smsAlerts && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.15rem 0' }}>SMS Alerts</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Critical environmental failure warnings</p>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION ACCOUNT & SECURITY */}
        <div style={{ backgroundColor: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Shield size={16} color={colors.primaryGreen} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Account & Security</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            
            {/* Change Password */}
            <div style={{ backgroundColor: colors.bgInnerCard, borderRadius: '10px', border: `1px solid ${colors.border}`, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ marginBottom: '0.75rem', color: colors.textMuted }}><Lock size={16} /></div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Change Password</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: '0 0 1.25rem 0' }}>Last changed 4 months ago. Secure your account.</p>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
                Update Password
              </span>
            </div>

            {/* Two-Factor Auth */}
            <div style={{ backgroundColor: colors.bgInnerCard, borderRadius: '10px', border: `1px solid ${colors.border}`, padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ marginBottom: '0.75rem', color: colors.textMuted }}><Shield size={16} /></div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Two-Factor Auth</h4>
                <p style={{ fontSize: '0.75rem', color: colors.textMuted, margin: '0 0 1.25rem 0' }}>Enabled via Authenticator App</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#4ade80', fontWeight: 600 }}>
                <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>•</span> Active
              </div>
            </div>

            {/* Sign Out */}
            <div style={{ backgroundColor: colors.logoutBg, borderRadius: '10px', border: '1px solid rgba(255,123,114,0.15)', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ marginBottom: '0.75rem', color: colors.logoutText }}><LogOut size={16} /></div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 0.25rem 0', color: colors.logoutText }}>Sign Out</h4>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,123,114,0.6)', margin: '0 0 1.25rem 0' }}>End your current session across all devices.</p>
              </div>
              <span style={{ fontSize: '0.85rem', color: colors.logoutText, fontFamily: 'monospace', fontWeight: 600, cursor: 'pointer' }}>
                Logout securely
              </span>
            </div>

          </div>
        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          nav { padding: 1rem !important; flex-direction: column; gap: 1rem; }
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #22c55e;
          cursor: pointer;
          box-shadow: 0 0 8px #22c55e;
        }
      `}</style>
    </div>
  );
}
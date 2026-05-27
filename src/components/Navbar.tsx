'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Activity, LogOut, User as UserIcon, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/deteksi', label: 'Deteksi' },
  { href: '/tentang', label: 'Tentang' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup dropdown jika berpindah halaman
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Backdrop overlay untuk mendeteksi klik luar dan menutup dropdown */}
      {isDropdownOpen && (
        <div
          onClick={() => setIsDropdownOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 98,
            background: 'transparent',
            cursor: 'default',
          }}
        />
      )}

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.35s ease',
        background: isScrolled
          ? 'rgba(3, 10, 5, 0.88)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(34,197,94,0.45)',
              }}>
                <Leaf size={21} color="white" />
              </div>
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                PlantScan<span style={{ WebkitTextFillColor: 'rgba(134,239,172,0.7)', color: 'rgba(134,239,172,0.7)' }}> AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    color: isActive ? '#4ade80' : 'rgba(240,253,244,0.7)',
                    background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                  }}>
                    {link.label}
                  </Link>
                );
              })}
              
              <div style={{
                width: '1px',
                height: '24px',
                background: 'rgba(34, 197, 94, 0.15)',
                margin: '0 8px',
              }} />

              {/* Logo Profil dengan Dropdown Menu */}
              <div style={{ position: 'relative', zIndex: 99 }}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '100px',
                    padding: '6px 12px 6px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    color: '#f0fdf4',
                    transition: 'all 0.2s ease',
                  }}
                  className="profile-btn-hover"
                >
                  {/* Avatar Lingkaran */}
                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                  }}>
                    {user ? user.username.substring(0, 1).toUpperCase() : <UserIcon size={14} />}
                  </div>
                  
                  {/* Nama user (jika ada) */}
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user ? user.username : 'Akun'}
                  </span>
                  
                  <ChevronDown size={14} style={{ opacity: 0.7, transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>

                {/* Dropdown Card */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: '46px',
                        right: 0,
                        width: '230px',
                        background: 'linear-gradient(145deg, rgba(10, 26, 15, 0.96), rgba(5, 14, 8, 0.99))',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(34, 197, 94, 0.25)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), var(--glow-green-soft)',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      {user ? (
                        <>
                          {/* Info User di Header Dropdown */}
                          <div style={{ padding: '10px 12px 6px' }}>
                            <div style={{ fontSize: '0.72rem', color: '#4ade8099', fontWeight: 600, letterSpacing: '0.05em' }}>MASUK SEBAGAI</div>
                            <div style={{ fontSize: '0.9rem', color: '#f0fdf4', fontWeight: 700, marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.username}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(134, 239, 172, 0.5)', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>{user.email}</div>
                          </div>
                          
                          <div style={{ height: '1px', background: 'rgba(34, 197, 94, 0.15)', margin: '4px 0' }} />
                          
                          <Link href="/deteksi" style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            color: 'rgba(240, 253, 244, 0.85)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.15s ease',
                          }} className="dropdown-item-hover">
                            <Activity size={14} color="#4ade80" />
                            Mulai Deteksi AI
                          </Link>
                          
                          <div style={{ height: '1px', background: 'rgba(34, 197, 94, 0.15)', margin: '4px 0' }} />

                          {/* Tombol Logout */}
                          <button
                            onClick={logout}
                            style={{
                              padding: '8px 12px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              color: '#f87171',
                              border: 'none',
                              background: 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              width: '100%',
                              textAlign: 'left',
                              transition: 'all 0.15s ease',
                            }}
                            className="dropdown-logout-hover"
                          >
                            <LogOut size={14} />
                            Keluar Sesi
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Info Guest di Header Dropdown */}
                          <div style={{ padding: '8px 12px 4px' }}>
                            <div style={{ fontSize: '0.7rem', color: '#4ade8099', fontWeight: 600, letterSpacing: '0.05em' }}>STATUS AKUN</div>
                            <div style={{ fontSize: '0.85rem', color: '#f0fdf4', fontWeight: 700, marginTop: '2px' }}>Tamu / Belum Masuk</div>
                          </div>

                          <div style={{ height: '1px', background: 'rgba(34, 197, 94, 0.15)', margin: '4px 0' }} />

                          {/* Tombol Login */}
                          <Link href="/login" style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            color: pathname === '/login' ? 'white' : '#4ade80',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: pathname === '/login' 
                              ? 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.25))' 
                              : 'transparent',
                            border: pathname === '/login' 
                              ? '1px solid rgba(34, 197, 94, 0.25)' 
                              : '1px solid transparent',
                            transition: 'all 0.15s ease',
                          }} className={pathname === '/login' ? "dropdown-register-hover" : "dropdown-item-hover"}>
                            <LogIn size={14} />
                            Masuk Akun
                          </Link>

                          {/* Tombol Register */}
                          <Link href="/register" style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            color: pathname === '/login' ? '#4ade80' : 'white',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: pathname === '/login' 
                              ? 'transparent' 
                              : 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.25))',
                            border: pathname === '/login' 
                              ? '1px solid transparent' 
                              : '1px solid rgba(34, 197, 94, 0.25)',
                            transition: 'all 0.15s ease',
                          }} className={pathname === '/login' ? "dropdown-item-hover" : "dropdown-register-hover"}>
                            <UserPlus size={14} color="#4ade80" />
                            Daftar Baru
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#4ade80',
                cursor: 'pointer',
                padding: '8px',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'rgba(5, 14, 8, 0.98)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(34,197,94,0.12)',
                overflow: 'hidden',
              }}
            >
              <div className="container" style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 8,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: pathname === link.href ? '#4ade80' : 'rgba(240,253,244,0.8)',
                      background: pathname === link.href ? 'rgba(34,197,94,0.1)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                <div style={{
                  height: '1px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  margin: '8px 0',
                }} />

                {/* Status Autentikasi Mobile */}
                {user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#4ade80',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                      }}>
                        {user.username.substring(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#f0fdf4', fontWeight: 600 }}>{user.username}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(134, 239, 172, 0.6)' }}>{user.email}</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="btn-secondary"
                      style={{
                        justifyContent: 'center',
                        padding: '10px',
                        fontSize: '0.9rem',
                        width: '100%',
                      }}
                    >
                      <LogOut size={15} />
                      Keluar Sesi
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0 0' }}>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        padding: '12px',
                        borderRadius: 8,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#4ade80',
                        background: 'rgba(34, 197, 94, 0.05)',
                        border: '1px solid rgba(34, 197, 94, 0.15)',
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary"
                      style={{
                        padding: '12px',
                        borderRadius: 8,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        justifyContent: 'center',
                      }}
                    >
                      Daftar Akun Baru
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
          
          .profile-btn-hover:hover {
            border-color: rgba(34, 197, 94, 0.45) !important;
            background: rgba(34, 197, 94, 0.15) !important;
            box-shadow: 0 0 12px rgba(34, 197, 94, 0.12);
          }

          .dropdown-item-hover:hover {
            background: rgba(34, 197, 94, 0.1) !important;
            color: #4ade80 !important;
          }

          .dropdown-register-hover:hover {
            filter: brightness(1.1);
            border-color: rgba(34, 197, 94, 0.45) !important;
          }

          .dropdown-logout-hover:hover {
            background: rgba(239, 68, 68, 0.08) !important;
            color: #f87171 !important;
          }
        `}</style>
      </nav>
    </>
  );
}

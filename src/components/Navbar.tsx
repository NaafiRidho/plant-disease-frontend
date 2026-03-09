'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, Activity } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/deteksi', label: 'Deteksi' },
  { href: '/tentang', label: 'Tentang' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: 'all 0.3s ease',
      background: isScrolled
        ? 'rgba(5, 14, 8, 0.9)'
        : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(34,197,94,0.12)' : '1px solid transparent',
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
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(34,197,94,0.4)',
            }}>
              <Leaf size={20} color="white" />
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
            <Link href="/deteksi" className="btn-primary" style={{ marginLeft: '8px', padding: '8px 20px', fontSize: '0.875rem' }}>
              <Activity size={15} />
              Mulai Deteksi
            </Link>
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
              <Link
                href="/deteksi"
                className="btn-primary"
                onClick={() => setIsMenuOpen(false)}
                style={{ marginTop: '8px', justifyContent: 'center' }}
              >
                <Activity size={15} />
                Mulai Deteksi
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

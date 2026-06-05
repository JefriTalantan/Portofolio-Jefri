import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../components/ThemeToggle';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isDark: boolean;
  onThemeToggle: () => void;
}

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, isDark, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: 'min(90vw, 900px)',
          padding: '12px 24px',
          borderRadius: '16px',
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
          ...(scrolled
            ? {
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }
            : {
                background: 'transparent',
                border: '1px solid transparent',
              }),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
          data-cursor-hover
        >
          <span style={{ color: 'var(--accent-purple)' }}>&lt;</span>
          <span>J</span>
          <span style={{ color: 'var(--accent-cyan)' }}>/</span>
          <span style={{ color: 'var(--accent-purple)' }}>&gt;</span>
        </button>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
          className="nav-desktop"
        >
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              data-cursor-hover
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                color: activeSection === link.id ? 'var(--accent-purple)' : 'var(--text-secondary)',
                transition: 'color 0.3s',
                borderRadius: '8px',
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '16px',
                    right: '16px',
                    height: '2px',
                    background: 'var(--accent-purple)',
                    borderRadius: '9999px',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right side: Theme toggle + Mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              width: '44px',
              height: '44px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '5vw',
              right: '5vw',
              zIndex: 9998,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: activeSection === link.id ? 'var(--bg-surface)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '14px 16px',
                  fontSize: '16px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  color: activeSection === link.id ? 'var(--accent-purple)' : 'var(--text-primary)',
                  borderRadius: '12px',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '40px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              transition: 'opacity 0.3s',
            }}
            data-cursor-hover
          >
            <span style={{ color: 'var(--accent-purple)' }}>&lt;</span>
            <span>J</span>
            <span style={{ color: 'var(--accent-cyan)' }}>/</span>
            <span style={{ color: 'var(--accent-purple)' }}>&gt;</span>
          </button>

          {/* Made with love */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--text-tertiary)',
          }}>
            <span>Made with</span>
            <Heart size={14} fill="var(--accent-coral)" stroke="var(--accent-coral)" />
            <span>by Jefri</span>
          </div>

          {/* Copyright */}
          <div style={{
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-caption)',
          }}>
            © {currentYear} Jefri. All rights reserved.
          </div>

          {/* Last updated */}
          <div style={{
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-caption)',
            letterSpacing: '0.05em',
            opacity: 0.6,
          }}>
            Last updated: Juni 2026
          </div>
        </div>
      </div>
    </footer>
  );
}

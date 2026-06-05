import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';

const footerLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
      paddingBottom: '0',
      /* Always dark navy — never theme-dependent */
      background: '#0B1121',
      color: '#F1F5F9',
    }}>
      {/* CTA Section */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '16px',
            lineHeight: 1.1,
            color: '#F1F5F9',
          }}>
            Let's Make It{' '}
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
            }}>
              Happen
            </span>
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(241, 245, 249, 0.55)',
            maxWidth: '480px',
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            always open to new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life.
          </p>
          <MagneticButton>
            <button
              onClick={() => scrollTo('contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 36px',
                borderRadius: '9999px',
                background: '#3B82F6',
                color: '#fff',
                border: 'none',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
              }}
            >
              ✦ Get in Touch
            </button>
          </MagneticButton>
        </motion.div>

        {/* Footer Navigation + Copyright */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(241, 245, 249, 0.1)',
        }}>
          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {footerLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  color: '#F1F5F9',
                  opacity: 0.55,
                  transition: 'opacity 0.3s',
                  padding: '4px 0',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.55'; }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div style={{
            fontSize: '13px',
            color: 'rgba(241, 245, 249, 0.35)',
            fontFamily: 'var(--font-caption)',
          }}>
            © {currentYear} Nanda Jefri Talantan. All rights reserved.
          </div>
        </div>
      </div>

      {/* Large name backdrop — fully visible, no clipping */}
      <div style={{
        width: '100%',
        marginTop: '48px',
        paddingBottom: '24px',
        zIndex: 1,
        position: 'relative',
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.5rem, 10vw, 8rem)',
          lineHeight: 1,
          textAlign: 'center',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(241, 245, 249, 0.12)',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.02em',
          /* Allow the text to wrap naturally on smaller screens */
          wordBreak: 'break-word' as const,
          overflowWrap: 'break-word' as const,
          padding: '0 16px',
        }}>
          Nanda Jefri Talantan
        </div>
      </div>
    </footer>
  );
}

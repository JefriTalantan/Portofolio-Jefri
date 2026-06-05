import { motion } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import { MagneticButton } from '../components/MagneticButton';
import experienceData from '../data/experience.json';
import type { TimelineType } from '../types';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export function ExperienceSection() {
  const experience = experienceData as TimelineType[];

  // Filter work/education entries for the timeline table
  const tableEntries = experience.filter(e => e.type === 'work' || e.type === 'education').slice(0, 5);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '16px',
              color: 'var(--text-tertiary)',
            }}>
              / Who Am I
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            textAlign: 'center',
            marginBottom: '8px',
            color: 'var(--text-primary)',
          }}>
            Pushing <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
            }}>Boundaries</span> since 2022
          </h2>
        </SectionReveal>

        {/* Split Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '60px',
          marginTop: '60px',
          alignItems: 'start',
        }} className="exp-split-layout">

          {/* Left: Grayscale portrait + social icons */}
          <SectionReveal direction="left" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{
                position: 'relative',
                width: '260px',
                height: '340px',
                borderRadius: '24px',
                overflow: 'hidden',
              }}>
                <img
                  src="/image/optimized/10.webp"
                  alt="Nanda Jefri Talantan"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.5s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%)'; }}
                />
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: <FaGithub size={18} />, url: 'https://github.com/JefriTalantan' },
                  { icon: <FaLinkedin size={18} />, url: 'https://www.linkedin.com/in/nanda-jefri-talantan-35406829b' },
                  { icon: <FaInstagram size={18} />, url: 'https://instagram.com/jefritalantan' },
                ].map((social, i) => (
                  <MagneticButton key={i} strength={0.3}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-tertiary)',
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-blue)';
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-blue)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-tertiary)';
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-color)';
                      }}
                    >
                      {social.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>

              {/* Name & title */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>
                  Nanda Jefri Talantan
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-caption)',
                }}>
                  Full-Stack Developer
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Bio + Timeline Table */}
          <SectionReveal direction="right" delay={0.2}>
            <div>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '40px',
                maxWidth: '520px',
              }}>
                A passionate developer focused on creating intuitive digital experiences. Has collaborated with startups to design products that blend usability and aesthetics, focusing on solving problems through a design-thinking journey process.
              </p>

              {/* Timeline Table */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}>
                {tableEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto',
                      gap: '16px',
                      padding: '18px 0',
                      borderBottom: '1px solid var(--border-color)',
                      alignItems: 'center',
                      transition: 'background 0.2s',
                    }}
                    className="exp-table-row"
                  >
                    <div>
                      <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}>
                        {entry.title}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-caption)',
                      whiteSpace: 'nowrap',
                    }}>
                      {entry.subtitle}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-caption)',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      {entry.date.split(' — ').map((d, i) => (
                        <span key={i}>
                          {i > 0 && <span style={{ margin: '0 4px', color: 'var(--accent-blue)' }}>→</span>}
                          {d}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .exp-split-layout {
            grid-template-columns: 300px 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .exp-table-row {
            grid-template-columns: 1fr !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}

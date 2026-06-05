import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';
import { Zap } from 'lucide-react';

const floatingPills = [
  { label: 'Product Design', side: 'left' as const },
  { label: 'UI/UX', side: 'left' as const },
  { label: 'Web Dev', side: 'left' as const },
  { label: 'Usability Testing', side: 'right' as const },
  { label: 'Data Analyst', side: 'right' as const },
  { label: 'Mobile Dev', side: 'right' as const },
];

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your goals, users, and challenges through research and strategy.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Transforming insights into an intuitive, beautiful, and functional product.',
  },
  {
    number: '03',
    title: 'Deliver',
    description: 'Testing, refining, and launching the final product with clarity and precision.',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.process-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (sectionRef.current?.contains(st.trigger as Element)) st.kill();
      });
    };
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ position: 'relative' }}>
      <div className="container">
        {/* Hallo! Greeting */}
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 500,
              color: 'var(--accent-blue)',
              marginBottom: '16px',
            }}>
              Hallo!
            </div>
          </div>
        </SectionReveal>

        {/* Floating pills + center statement */}
        <SectionReveal delay={0.1}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '80px',
          }} className="about-hallo-grid">
            {/* Left pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }} className="about-pills-left">
              {floatingPills.filter(p => p.side === 'left').map(pill => (
                <motion.div
                  key={pill.label}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    cursor: 'default',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <Zap size={12} style={{ color: 'var(--accent-blue)' }} />
                  {pill.label}
                </motion.div>
              ))}
            </div>

            {/* Center statement */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                maxWidth: '600px',
                margin: '0 auto',
              }}>
                focus is on blending clear strategy, thoughtful design, and user empathy to{' '}
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                }}>
                  craft experiences that solve real problems
                </span>
              </p>
            </div>

            {/* Right pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }} className="about-pills-right">
              {floatingPills.filter(p => p.side === 'right').map(pill => (
                <motion.div
                  key={pill.label}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    cursor: 'default',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <Zap size={12} style={{ color: 'var(--accent-blue)' }} />
                  {pill.label}
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Process Section */}
        <SectionReveal delay={0.2}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '16px',
              color: 'var(--text-tertiary)',
            }}>
              / Our Process Explained
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            textAlign: 'center',
            marginBottom: '64px',
            color: 'var(--text-primary)',
          }}>
            Here's how it works
          </h2>
        </SectionReveal>

        {/* Process Cards with SVG Connection */}
        <div style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {/* SVG connecting path */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            viewBox="0 0 900 350"
            fill="none"
            preserveAspectRatio="none"
            className="process-svg-path"
          >
            <motion.path
              d="M 100 50 C 200 50, 250 200, 450 180 S 700 50, 800 280"
              stroke="var(--accent-blue)"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              viewport={{ once: true }}
            />
            {/* Decorative circles on path */}
            <circle cx="100" cy="50" r="6" fill="var(--accent-blue)" opacity="0.4" />
            <circle cx="450" cy="180" r="6" fill="var(--accent-indigo)" opacity="0.4" />
            <circle cx="800" cy="280" r="6" fill="var(--accent-blue)" opacity="0.4" />
          </svg>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            position: 'relative',
            zIndex: 1,
          }} className="process-cards-grid">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="process-card"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  padding: '28px 24px',
                  marginTop: index === 1 ? '-20px' : index === 2 ? '40px' : '0',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.3s, border-color 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent-blue)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--glow-blue)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '32px',
                  fontWeight: 800,
                  color: 'var(--accent-blue)',
                  opacity: 0.3,
                  marginBottom: '16px',
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: 'var(--text-primary)',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-hallo-grid {
            grid-template-columns: auto 1fr auto !important;
          }
          .about-pills-left {
            flex-direction: column !important;
            justify-content: center !important;
          }
          .about-pills-right {
            flex-direction: column !important;
            align-items: flex-end !important;
          }
        }
        @media (max-width: 767px) {
          .process-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .process-cards-grid > div {
            margin-top: 0 !important;
          }
          .process-svg-path {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

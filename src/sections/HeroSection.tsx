import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsapConfig';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowDown, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiLaravel,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub
} from 'react-icons/si';

const techLogos = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MySQL', icon: SiMysql, color: '#00758F' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#94A3B8' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  // ScrollTrigger hero content parallax fade-out
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const container = sectionRef.current.querySelector('.hero-content');
    if (!container) return;

    const tween = gsap.to(container, {
      y: -150,
      opacity: 0,
      scale: 0.94,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  // Name stagger animation
  useEffect(() => {
    if (!nameRef.current) return;
    const letters = nameRef.current.querySelectorAll('.letter');
    gsap.fromTo(
      letters,
      { opacity: 0, y: 40, rotateX: 40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.04,
        delay: 1.6,
        ease: 'power3.out',
      }
    );
  }, []);

  // Typewriter effect
  useEffect(() => {
    const roles = ['Full-Stack Developer', 'AI Developer', 'Mobile Developer', 'Data Analyst'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (!typewriterRef.current) return;
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        typewriterRef.current.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
        timeout = setTimeout(type, 80);
      } else {
        typewriterRef.current.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timeout = setTimeout(type, 400);
          return;
        }
        timeout = setTimeout(type, 40);
      }
    };

    const startTimeout = setTimeout(type, 2200);
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '40px',
      }}
    >
      {/* Blue Gradient Mesh Blobs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Primary blue blob */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '5%',
            left: '10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Indigo blob */}
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Sky accent */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="hero-content container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Award Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '9999px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}>
            <Sparkles size={14} style={{ color: 'var(--accent-yellow)' }} />
            <span>Musamus University · Information Systems</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <h1
              ref={nameRef}
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                marginBottom: '8px',
                perspective: '1000px',
              }}
            >
              <span style={{ display: 'block', fontFamily: "'Syne', sans-serif" }}>
                {'Hi I\'m Jefri'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="letter"
                    style={{
                      display: 'inline-block',
                      opacity: 0,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span style={{
                display: 'block',
                fontFamily: "'Syne', sans-serif",
                marginTop: '4px',
              }}>
                {'Full-Stack'.split('').map((char, i) => (
                  <span
                    key={`fs-${i}`}
                    className="letter"
                    style={{
                      display: 'inline-block',
                      opacity: 0,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                {' '}
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  background: 'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {'Developer'.split('').map((char, i) => (
                    <span
                      key={`dev-${i}`}
                      className="letter"
                      style={{
                        display: 'inline-block',
                        opacity: 0,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Hero Split: Badge Left | Portrait Center | Bio Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          alignItems: 'center',
          marginBottom: '48px',
        }} className="hero-split-grid">
          {/* Left: Availability Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center' }}
            className="hero-left-col"
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '9999px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#22C55E',
                animation: 'pulse-glow 2s infinite',
                boxShadow: '0 0 8px rgba(34,197,94,0.5)',
              }} />
              <span style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}>
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Center: Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Glow behind portrait */}
            <div style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)',
              filter: 'blur(40px)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
            
            {/* Masked wrapper to prevent drop-shadow clipping and smoothly fade at the bottom */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              padding: '40px 60px 80px 60px',
              margin: '-40px -60px -80px -60px',
              maskImage: 'linear-gradient(to bottom, black 30%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 85%)',
            }}>
              <img
                src="/image/optimized/18_optimized.webp"
                alt="Nanda Jefri Talantan"
                style={{
                  width: '350px',
                  height: '440px',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'drop-shadow(0 20px 40px rgba(59,130,246,0.25))',
                }}
              />
            </div>

            {/* Themed Fog/Mist Overlay that blends the bottom of the portrait into the background */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '380px',
              height: '110px',
              background: 'linear-gradient(to bottom, transparent, var(--bg-primary) 75%, var(--bg-primary))',
              zIndex: 2,
              pointerEvents: 'none',
            }} />
          </motion.div>

          {/* Right: Bio + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            style={{ textAlign: 'center' }}
            className="hero-right-col"
          >
            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '20px',
              maxWidth: '340px',
              margin: '0 auto 20px',
            }}>
              passionate about creating intuitive digital experiences that connect users with value.
            </p>
            <MagneticButton>
              <button
                onClick={scrollToContact}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                ✦ Get in Touch
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            color: 'var(--accent-blue)',
            marginBottom: '40px',
            minHeight: '1.5em',
            textAlign: 'center',
          }}
        >
          <span ref={typewriterRef}></span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--accent-blue)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
            }}
          />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '60px',
          }}
        >
          {[
            { icon: <FaGithub size={18} />, url: 'https://github.com/JefriTalantan', label: 'GitHub' },
            { icon: <FaLinkedin size={18} />, url: 'https://www.linkedin.com/in/nanda-jefri-talantan-35406829b', label: 'LinkedIn' },
          ].map(social => (
            <MagneticButton key={social.label} strength={0.4}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-blue)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-blue)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
                }}
              >
                {social.icon}
              </a>
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Tech Logos Marquee Carousel - Full width of viewport */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.5 }}
        className="tech-marquee-container"
      >
        <div className="tech-marquee-track">
          {[...techLogos, ...techLogos].map((logo, index) => {
            const TechIcon = logo.icon;
            return (
              <div
                key={`${logo.name}-${index}`}
                className="tech-logo-item"
              >
                <div className="icon-wrapper" style={{ color: logo.color }}>
                  <TechIcon size={22} />
                </div>
                <span className="logo-name">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-tertiary)',
            fontSize: '12px',
            fontFamily: 'var(--font-caption)',
            letterSpacing: '0.1em',
            marginTop: '48px',
            cursor: 'pointer',
          }}
          onClick={scrollToAbout}
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-split-grid {
            grid-template-columns: 1fr auto 1fr !important;
          }
          .hero-left-col {
            justify-self: end !important;
          }
          .hero-right-col {
            justify-self: start !important;
            text-align: left !important;
          }
          .hero-right-col p {
            margin: 0 0 20px 0 !important;
          }
        }

        /* ----- Tech Marquee Styles ----- */
        .tech-marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          margin-top: 32px;
          display: flex;
          align-items: center;
          background: rgba(11, 17, 33, 0.2);
          /* Fade gradient mask on edges */
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .light .tech-marquee-container {
          background: rgba(241, 245, 249, 0.3);
        }

        .tech-marquee-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: marqueeScroll 45s linear infinite;
        }

        /* Pause marquee scroll when container is hovered to let user select/hover individual logos */
        .tech-marquee-container:hover .tech-marquee-track {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Individual Tech Logo Cards */
        .tech-logo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 18px;
          border-radius: 12px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .tech-logo-item .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(1) brightness(0.8);
          opacity: 0.5;
          transition: all 0.4s ease;
        }

        .tech-logo-item .logo-name {
          font-size: 13px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          color: var(--text-secondary);
          transition: all 0.4s ease;
        }

        /* Hover Effects */
        .tech-logo-item:hover {
          border-color: var(--accent-blue);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
          transform: translateY(-2px);
          background: var(--bg-card-hover);
        }

        .tech-logo-item:hover .icon-wrapper {
          filter: grayscale(0) brightness(1);
          opacity: 1;
          transform: scale(1.15);
        }

        .tech-logo-item:hover .logo-name {
          color: var(--text-primary);
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

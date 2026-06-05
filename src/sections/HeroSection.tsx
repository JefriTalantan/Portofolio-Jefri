import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../animations/gsapConfig';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowDown, Sparkles, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 92, 231, ${p.opacity})`;
        ctx.fill();

        // Draw lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
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

  // Typewriter effect (manual implementation to avoid dependency issues)
  useEffect(() => {
    const roles = ['ML Engineer', 'Computer Vision Dev', 'Full-Stack Builder'];
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

  const nameText = 'Jefri';

  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      {/* Gradient Mesh Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Purple blob */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Cyan blob */}
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,210,255,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Coral accent */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,107,0.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '9999px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            marginBottom: '28px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
          }}
        >
          <Sparkles size={16} style={{ color: 'var(--accent-yellow)' }} />
          <span>Halo, saya</span>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22C55E',
            animation: 'pulse-glow 2s infinite',
            boxShadow: '0 0 8px rgba(34,197,94,0.5)',
          }} />
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Open to work</span>
        </motion.div>

        {/* Name */}
        <h1
          ref={nameRef}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '16px',
            perspective: '1000px',
          }}
        >
          {nameText.split('').map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{
                display: 'inline-block',
                opacity: 0,
                background: i === 0 ? 'var(--accent-gradient)' : 'none',
                WebkitBackgroundClip: i === 0 ? 'text' : 'unset',
                WebkitTextFillColor: i === 0 ? 'transparent' : 'var(--text-primary)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: 'var(--accent-cyan)',
            marginBottom: '20px',
            minHeight: '2em',
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
              background: 'var(--accent-cyan)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
        >
          Membangun solusi cerdas di persimpangan{' '}
          <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>AI</span>,{' '}
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Computer Vision</span>, dan{' '}
          <span style={{ color: 'var(--accent-coral)', fontWeight: 600 }}>Web Development</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton>
            <button className="glow-btn" onClick={scrollToProjects}>
              🚀 Lihat Projek
            </button>
          </MagneticButton>
          <MagneticButton>
            <button className="outline-btn">
              📄 Download CV
            </button>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '60px',
          }}
        >
          {[
            { icon: <FaGithub size={20} />, url: 'https://github.com/jefri', label: 'GitHub' },
            { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com/in/jefri', label: 'LinkedIn' },
            { icon: <Mail size={20} />, url: 'mailto:jefri@example.com', label: 'Email' },
          ].map(social => (
            <MagneticButton key={social.label} strength={0.4}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-purple)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-purple)';
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

        {/* Scroll Indicator */}
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
          }}
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
    </section>
  );
}

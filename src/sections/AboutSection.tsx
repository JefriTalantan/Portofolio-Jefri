import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import { GlowCard } from '../components/GlowCard';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';
import type { StatType } from '../types';
import { MapPin, BookOpen, Coffee, Gamepad2, Music } from 'lucide-react';

const stats: StatType[] = [
  { label: 'Projects', value: 15, suffix: '+' },
  { label: 'GitHub Stars', value: 120, suffix: '+' },
  { label: 'Research Papers', value: 3 },
  { label: 'Competitions', value: 5 },
];

const interests = ['Machine Learning', 'Computer Vision', 'Web Development', 'Open Source', 'Data Science', 'UI/UX'];

const funFacts = [
  { icon: <Coffee size={16} />, text: 'Fueled by kopi susu' },
  { icon: <Gamepad2 size={16} />, text: 'Gamer di waktu senggang' },
  { icon: <Music size={16} />, text: 'Coding + Lo-fi beats' },
];

function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const tween = gsap.to(imageRef.current, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === imageRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionReveal>
          <div className="section-subheading">Tentang Saya</div>
          <h2 className="section-heading">
            Passionate about building{' '}
            <span className="gradient-text">intelligent</span> things
          </h2>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          marginTop: '48px',
        }}
          className="about-grid"
        >
          {/* Left: Photo */}
          <SectionReveal direction="left" delay={0.1}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                ref={imageRef}
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '340px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '80px',
                }}>
                  👨‍💻
                </div>
                {/* Decorative ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '28px',
                  border: '2px solid transparent',
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan)) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  animation: 'spin-slow 8s linear infinite',
                  opacity: 0.6,
                }} />
              </div>
            </div>
          </SectionReveal>

          {/* Right: Bio */}
          <div>
            <SectionReveal direction="right" delay={0.2}>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '16px',
              }}>
                Saya Jefri, mahasiswa Teknologi Informasi yang passionate di bidang <strong style={{ color: 'var(--text-primary)' }}>Machine Learning</strong> dan <strong style={{ color: 'var(--text-primary)' }}>Computer Vision</strong>. Saya percaya bahwa teknologi AI bisa membawa dampak nyata — bukan sekadar hype, tapi solusi yang benar-benar membantu.
              </p>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '16px',
              }}>
                Selain ML, saya juga menikmati dunia <strong style={{ color: 'var(--text-primary)' }}>Full-Stack Development</strong> — dari merancang UI yang clean hingga membangun backend yang scalable. Setiap baris kode yang saya tulis adalah kesempatan untuk belajar sesuatu yang baru.
              </p>
            </SectionReveal>

            {/* Location */}
            <SectionReveal delay={0.3}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-tertiary)',
                fontSize: '14px',
                marginBottom: '24px',
              }}>
                <MapPin size={14} />
                <span>Indonesia</span>
                <span style={{ margin: '0 4px' }}>·</span>
                <BookOpen size={14} />
                <span>Universitas XYZ</span>
              </div>
            </SectionReveal>

            {/* Currently Learning Badge */}
            <SectionReveal delay={0.35}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                marginBottom: '28px',
                fontSize: '13px',
              }}>
                <span style={{ animation: 'bounce-gentle 2s infinite' }}>📖</span>
                <span style={{ color: 'var(--text-tertiary)' }}>Currently learning</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Transformer Architecture & LLMs</span>
              </div>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={0.4}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '28px',
              }}
                className="stats-grid"
              >
                {stats.map(stat => (
                  <GlowCard key={stat.label} className="p-4 text-center">
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '28px',
                        fontWeight: 800,
                        color: 'var(--accent-purple)',
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}>
                        <CountUpNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-caption)',
                        fontSize: '11px',
                        color: 'var(--text-tertiary)',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </SectionReveal>

            {/* Fun Facts */}
            <SectionReveal delay={0.5}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                {funFacts.map(fact => (
                  <div
                    key={fact.text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {fact.icon} {fact.text}
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Interests */}
            <SectionReveal delay={0.55}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interests.map(interest => (
                  <span key={interest} className="tech-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 300px 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

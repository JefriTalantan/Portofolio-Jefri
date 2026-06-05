import { useRef, useEffect } from 'react';
import { SectionReveal } from '../components/SectionReveal';
import { TimelineItem } from '../components/TimelineItem';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';
import { prefersReducedMotion } from '../animations/gsapConfig';
import experienceData from '../data/experience.json';
import type { TimelineType } from '../types';

export function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const experience = experienceData as TimelineType[];

  useEffect(() => {
    if (!lineRef.current || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === lineRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-subheading">Perjalanan</div>
          <h2 className="section-heading">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            marginBottom: '48px',
          }}>
            Timeline perjalanan akademis, profesional, dan pencapaian saya sejauh ini.
          </p>
        </SectionReveal>

        {/* Timeline */}
        <div style={{
          position: 'relative',
          maxWidth: '700px',
          margin: '0 auto',
          paddingLeft: '40px',
        }}>
          {/* Animated line */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '23px',
              top: '24px',
              bottom: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-purple), var(--accent-cyan), var(--accent-coral))',
              transformOrigin: 'top',
              borderRadius: '9999px',
              opacity: 0.4,
            }}
          />

          {experience.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useEffect, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';
import { prefersReducedMotion } from '../animations/gsapConfig';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

export function SectionReveal({ children, delay = 0, className = '', direction = 'up' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    };

    switch (direction) {
      case 'up':
        fromVars.y = 50;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = -50;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = 50;
        toVars.x = 0;
        break;
    }

    const tween = gsap.fromTo(ref.current, fromVars, toVars);

    return () => {
      tween?.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={{ opacity: prefersReducedMotion() ? 1 : 0 }}>
      {children}
    </div>
  );
}

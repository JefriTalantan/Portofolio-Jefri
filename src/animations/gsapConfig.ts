import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Check reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Shared GSAP animation presets
export const fadeSlideUp = (
  target: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.1,
      ease: 'power3.out',
      scrollTrigger: options?.scrollTrigger,
    }
  );
};

export const fadeSlideLeft = (
  target: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, x: 0 });
    return;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: options?.scrollTrigger,
    }
  );
};

export const fadeSlideRight = (
  target: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, x: 0 });
    return;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: options?.scrollTrigger,
    }
  );
};

export const staggerReveal = (
  target: gsap.TweenTarget,
  scrollTrigger: ScrollTrigger.Vars
) => {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger,
    }
  );
};

export const parallaxEffect = (
  target: gsap.TweenTarget,
  speed: number = 0.3,
  scrollTrigger: ScrollTrigger.Vars
) => {
  if (prefersReducedMotion()) return;

  return gsap.to(target, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      ...scrollTrigger,
      scrub: true,
    },
  });
};

export { gsap, ScrollTrigger };

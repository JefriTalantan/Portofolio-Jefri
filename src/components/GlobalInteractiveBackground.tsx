import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const PALETTE = [
  'rgba(59, 130, 246, ',   // Blue
  'rgba(99, 102, 241, ',   // Indigo
  'rgba(96, 165, 250, ',   // Sky
  'rgba(251, 191, 36, ',   // Yellow
];

export function GlobalInteractiveBackground() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, lastX: 0, lastY: 0, speed: 0 });

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let trails: TrailParticle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Create persistent floating particles
    const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 0.8;
      const baseAlpha = Math.random() * 0.4 + 0.15;
      const colorPrefix = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size,
        color: colorPrefix,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      const x = e.clientX;
      const y = e.clientY;
      
      // Calculate speed for trail spawning
      if (mouse.active) {
        const dx = x - mouse.lastX;
        const dy = y - mouse.lastY;
        mouse.speed = Math.sqrt(dx * dx + dy * dy);
        
        // Spawn trail particles if moving
        if (mouse.speed > 2) {
          const spawnCount = Math.min(3, Math.floor(mouse.speed / 5) + 1);
          for (let i = 0; i < spawnCount; i++) {
            const size = Math.random() * 3 + 1;
            const colorPrefix = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            trails.push({
              x: x + (Math.random() - 0.5) * 8,
              y: y + (Math.random() - 0.5) * 8,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              size,
              color: colorPrefix,
              alpha: 0.8,
              decay: Math.random() * 0.03 + 0.015,
            });
          }
        }
      }
      
      mouse.x = x;
      mouse.y = y;
      mouse.lastX = x;
      mouse.lastY = y;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const maxSpeed = 2.0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // Update and draw persistent particles
      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen bounds
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion (Antigravity effect)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 180;

          if (dist < activeRadius) {
            const force = (activeRadius - dist) / activeRadius;
            // Push away
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
            
            // Glow when close to mouse
            p.alpha = Math.min(0.8, p.baseAlpha + force * 0.5);
          } else {
            // Restore base alpha gradually
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Cap speeds to prevent chaotic acceleration
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }

        // Slow friction to damp repulsion
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Re-inject baseline floating speed
        if (currentSpeed < 0.1) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();

        // Draw lines between close particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          const lineLimit = 110;

          if (ldist < lineLimit) {
            ctx.beginPath();
            
            // Refraction lens distortion when near mouse cursor
            const mx = (p.x + p2.x) / 2;
            const my = (p.y + p2.y) / 2;
            const mdx = mx - mouse.x;
            const mdy = my - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            const lensRadius = 140;

            if (mouse.active && mdist < lensRadius) {
              const force = ((lensRadius - mdist) / lensRadius) * 20; // Bend up to 20px
              const cx = mx + (mdx / mdist) * force;
              const cy = my + (mdy / mdist) * force;
              ctx.moveTo(p.x, p.y);
              ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
            } else {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
            }
            
            const lineAlpha = (1 - ldist / lineLimit) * 0.12 * Math.min(p.alpha, p2.alpha);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw interactive line from cursor
        if (mouse.active) {
          const cdx = p.x - mouse.x;
          const cdy = p.y - mouse.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const cursorLimit = 160;

          if (cdist < cursorLimit) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const lineAlpha = (1 - cdist / cursorLimit) * 0.22;
            ctx.strokeStyle = p.color + lineAlpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      // Update and draw trail particles
      trails.forEach((tp, idx) => {
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha -= tp.decay;

        if (tp.alpha <= 0) {
          trails.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
        ctx.fillStyle = tp.color + tp.alpha + ')';
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.75,
      }}
    />
  );
}

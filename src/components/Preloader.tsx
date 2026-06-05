import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const imagesToPreload = [
      '/image/optimized/18_optimized.webp',
      '/image/optimized/14.webp',
      '/image/optimized/15.webp',
      '/image/optimized/16.webp',
      '/image/optimized/17.webp',
      '/image/optimized/10.webp',
    ];

    let loadedCount = 0;
    let assetsLoaded = false;

    // Preload images
    if (imagesToPreload.length === 0) {
      assetsLoaded = true;
    } else {
      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
        const handleLoad = () => {
          loadedCount++;
          if (loadedCount === imagesToPreload.length) {
            assetsLoaded = true;
          }
        };
        img.onload = handleLoad;
        img.onerror = handleLoad; // resolve even if load fails to prevent freeze
      });
    }

    const duration = 1000; // minimum duration 1s
    const startTime = Date.now();
    let currentProgress = 0;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min(elapsed / duration, 1);

      // Animate progress smoothly.
      // Cap at 85% if resources are still loading.
      let targetProgress = Math.floor(timeProgress * 100);
      if (!assetsLoaded && targetProgress > 85) {
        targetProgress = 85;
      }

      // Smooth step increment
      if (currentProgress < targetProgress) {
        currentProgress += Math.min(2, targetProgress - currentProgress);
        setCounter(currentProgress);
      } else if (assetsLoaded && currentProgress < 100) {
        currentProgress += 1;
        setCounter(currentProgress);
      }

      if (assetsLoaded && currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 600);
        }, 150);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG path animation
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;

      const animation = pathRef.current.animate(
        [
          { strokeDashoffset: length },
          { strokeDashoffset: 0 },
        ],
        {
          duration: 1200,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards',
        }
      );

      return () => animation.cancel();
    }
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0B1121',
          }}
        >
          {/* Logo SVG */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              <path
                ref={pathRef}
                d="M 20 20 L 20 70 Q 20 80 30 80 L 45 80 Q 55 80 55 70 L 55 55 M 60 20 L 80 20 M 70 20 L 70 80"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Brackets */}
              <path
                d="M 12 30 L 5 50 L 12 70"
                stroke="#60A5FA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
              <path
                d="M 88 30 L 95 50 L 88 70"
                stroke="#60A5FA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
              {/* Slash */}
              <path
                d="M 58 15 L 42 85"
                stroke="#F97066"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '14px',
              color: '#94A3B8',
              marginTop: '24px',
              letterSpacing: '0.1em',
            }}
          >
            {counter}%
          </motion.div>

          {/* Loading bar */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: '#1E293B',
              borderRadius: '9999px',
              marginTop: '16px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${counter}%` }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6, #6366F1)',
                borderRadius: '9999px',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

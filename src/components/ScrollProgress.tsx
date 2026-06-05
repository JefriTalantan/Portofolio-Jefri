import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setVisible(v > 0.01);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #3B82F6, #6366F1)',
        transformOrigin: 'left',
        scaleX,
        zIndex: 99990,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    />
  );
}

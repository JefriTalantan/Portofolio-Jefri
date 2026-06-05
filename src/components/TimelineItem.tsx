import { motion } from 'framer-motion';
import type { TimelineType } from '../types';

interface TimelineItemProps {
  event: TimelineType;
  index: number;
  isLeft?: boolean;
}

export function TimelineItem({ event, index, isLeft = false }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        position: 'relative',
        paddingBottom: '40px',
      }}
    >
      {/* Dot */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: 'var(--bg-surface)',
        border: '2px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        zIndex: 2,
        transition: 'border-color 0.3s, background 0.3s',
      }}>
        {event.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-caption)',
          fontSize: '12px',
          color: 'var(--accent-blue)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>
          {event.date}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '2px',
        }}>
          {event.title}
        </h3>
        <div style={{
          fontSize: '14px',
          color: 'var(--accent-cyan)',
          fontWeight: 500,
          marginBottom: '8px',
        }}>
          {event.subtitle}
        </div>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
        }}>
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

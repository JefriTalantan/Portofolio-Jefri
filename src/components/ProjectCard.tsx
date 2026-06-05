import { useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import type { ProjectType } from '../types';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 12}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--glow-purple)';
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
        }}>
          {/* Placeholder gradient for missing images */}
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${project.tags[0] === 'YOLOv8' ? '#6C5CE7' : project.category === 'web' ? '#00D2FF' : '#FF6B6B'}22, var(--bg-surface))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            transition: 'transform 0.4s ease',
          }}
          className="project-image"
          >
            {project.category === 'ml' ? '🤖' : project.category === 'web' ? '🌐' : project.category === 'research' ? '📊' : '📱'}
          </div>
          {/* Hover overlay */}
          <div
            className="project-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px',
              gap: '12px',
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <FaGithub size={14} /> Code
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <div style={{
            fontFamily: 'var(--font-caption)',
            fontSize: '12px',
            color: 'var(--accent-purple)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>
            {project.date}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'var(--text-primary)',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {project.description}
          </p>
          {/* Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
          }}>
            {project.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="tech-tag"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="tech-tag">+{project.tags.length - 4}</span>
            )}
          </div>
        </div>

        <style>{`
          div:hover > .project-overlay {
            opacity: 1 !important;
          }
          div:hover .project-image {
            transform: scale(1.08) !important;
          }
        `}</style>
      </div>
    </motion.div>
  );
}

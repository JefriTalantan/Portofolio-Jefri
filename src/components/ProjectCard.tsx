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
      rotateY(${x * 6}deg)
      rotateX(${-y * 6}deg)
      scale3d(1.01, 1.01, 1.01)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
          willChange: 'transform',
          display: 'grid',
          gridTemplateColumns: '1fr',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        }}
        className="project-card-container"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--glow-blue)';
        }}
        onMouseLeave={(e) => {
          handleMouseLeave();
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        }}
      >
        {/* Left Side: Image container */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/11',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
        }}
          className="project-card-image-wrapper"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              className="project-card-img"
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${project.category === 'web' ? '#3B82F6' : '#F97066'}22, var(--bg-surface))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
            }}>
              🌐
            </div>
          )}
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 60%)',
          }} />
        </div>

        {/* Right Side: Content */}
        <div style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
          className="project-card-content"
        >
          <div>
            <div style={{
              fontFamily: 'var(--font-caption)',
              fontSize: '11px',
              color: 'var(--accent-blue)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              {project.date} · {project.category.toUpperCase()}
            </div>
            
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '10px',
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}>
              {project.title}
            </h3>
            
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}>
              {project.description}
            </p>
          </div>

          <div>
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {project.tags.map(tag => (
                <span key={tag} className="tech-tag" style={{ fontSize: '11px', padding: '4px 10px' }}>{tag}</span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn"
                  style={{
                    padding: '8px 20px',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-btn"
                  style={{
                    padding: '8px 20px',
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <FaGithub size={12} /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .project-card-container {
              grid-template-columns: 1fr 1fr !important;
            }
            .project-card-image-wrapper {
              aspect-ratio: auto !important;
              height: 100% !important;
            }
          }
          .project-card-container:hover .project-card-img {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </motion.div>
  );
}

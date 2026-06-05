import { motion } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import projectsData from '../data/projects.json';
import type { ProjectType } from '../types';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectsSection() {
  const projects = projectsData as ProjectType[];

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '16px',
              color: 'var(--text-tertiary)',
            }}>
              / Best Projects
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            textAlign: 'center',
            marginBottom: '60px',
            color: 'var(--text-primary)',
          }}>
            Selected <span className="gradient-text">Works</span>
          </h2>
        </SectionReveal>

        {/* 2-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
        }} className="projects-grid-layout">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(59,130,246,0.12)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent-blue)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
              }}>
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
                    className="project-grid-img"
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    background: `linear-gradient(135deg, rgba(59,130,246,0.08), var(--bg-surface))`,
                  }}>
                    🌐
                  </div>
                )}
              </div>

              {/* Content below image */}
              <div style={{ padding: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}>
                    {project.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-tertiary)',
                          textDecoration: 'none',
                          transition: 'all 0.3s',
                        }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Source Code"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-tertiary)',
                          textDecoration: 'none',
                          transition: 'all 0.3s',
                        }}
                      >
                        <FaGithub size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tags.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-caption)',
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-tertiary)',
                      border: '1px solid var(--border-color)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .projects-grid-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        .projects-grid-layout > div:hover .project-grid-img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}

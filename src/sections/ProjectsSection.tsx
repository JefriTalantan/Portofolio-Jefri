import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import { ProjectCard } from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import type { ProjectType } from '../types';
import { ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'web', label: 'Web Dev' },
  { id: 'research', label: 'Research' },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const projects = projectsData as ProjectType[];

  const featuredProject = projects.find(p => p.featured);
  const otherProjects = activeFilter === 'all'
    ? projects.filter(p => !p.featured)
    : projects.filter(p => !p.featured && p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-subheading">Portfolio</div>
          <h2 className="section-heading">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            marginBottom: '40px',
          }}>
            Proyek-proyek terpilih yang menunjukkan kemampuan teknis dan problem-solving saya.
          </p>
        </SectionReveal>

        {/* Featured Project */}
        {featuredProject && (
          <SectionReveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                marginBottom: '48px',
                display: 'grid',
                gridTemplateColumns: '1fr',
              }}
              className="featured-project"
            >
              {/* Featured Image */}
              <div style={{
                aspectRatio: '21/9',
                background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,210,255,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  fontSize: '72px',
                  filter: 'grayscale(0.3)',
                }}>
                  🤖
                </div>
                {/* Star badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(108,92,231,0.2)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--accent-yellow)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}>
                  <Star size={12} fill="currentColor" /> Featured Project
                </div>
              </div>

              {/* Featured Content */}
              <div style={{ padding: '28px' }}>
                <div style={{
                  fontFamily: 'var(--font-caption)',
                  fontSize: '12px',
                  color: 'var(--accent-purple)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  {featuredProject.date}
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'var(--text-primary)',
                }}>
                  {featuredProject.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                }}>
                  {featuredProject.longDescription || featuredProject.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {featuredProject.tags.map(tag => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-btn"
                      style={{ padding: '10px 24px', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outline-btn"
                      style={{ padding: '10px 24px', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <FaGithub size={14} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        )}

        {/* Filter Tabs */}
        <SectionReveal delay={0.2}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px',
          }}>
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                data-cursor-hover
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  border: '1px solid',
                  borderColor: activeFilter === tab.id ? 'var(--accent-purple)' : 'var(--border-color)',
                  background: activeFilter === tab.id ? 'rgba(108,92,231,0.1)' : 'var(--bg-surface)',
                  color: activeFilter === tab.id ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Project Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
          className="project-grid"
        >
          <AnimatePresence mode="popLayout">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {otherProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 0',
            color: 'var(--text-tertiary)',
            fontSize: '15px',
          }}>
            Belum ada proyek di kategori ini.
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .featured-project {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .project-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

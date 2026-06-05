import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import skillsData from '../data/skills.json';
import type { SkillType } from '../types';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps & Tools' },
];

const levelColors: Record<string, string> = {
  beginner: '#8B8BA0',
  intermediate: '#FFEAA7',
  advanced: '#00D2FF',
  expert: '#6C5CE7',
};

const levelLabels: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const skills = skillsData as SkillType[];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-subheading">Keahlian</div>
          <h2 className="section-heading">
            Tech Stack &{' '}
            <span className="gradient-text">Skills</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            marginBottom: '40px',
          }}>
            Tools dan teknologi yang saya gunakan untuk membangun solusi dari ide menjadi produk nyata.
          </p>
        </SectionReveal>

        {/* Filter Tabs */}
        <SectionReveal delay={0.1}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
          }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-cursor-hover
                style={{
                  position: 'relative',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--accent-purple)' : 'var(--border-color)',
                  background: activeCategory === cat.id ? 'rgba(108,92,231,0.1)' : 'var(--bg-surface)',
                  color: activeCategory === cat.id ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Bento Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  layout: { type: 'spring', stiffness: 350, damping: 30 },
                  opacity: { duration: 0.3 },
                  delay: index * 0.03,
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'default',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = skill.color || 'var(--accent-purple)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${skill.color || '#6C5CE7'}25`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Floating orb animation */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: 'easeInOut',
                    delay: Math.random() * 2,
                  }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${skill.color || '#6C5CE7'}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: skill.color || 'var(--accent-purple)',
                  }}
                >
                  {skill.name.charAt(0)}
                </motion.div>

                <span style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                }}>
                  {skill.name}
                </span>

                {/* Level indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: levelColors[skill.level],
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-caption)',
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {levelLabels[skill.level]}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

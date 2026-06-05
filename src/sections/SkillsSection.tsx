import { motion } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import skillsData from '../data/skills.json';
import type { SkillType } from '../types';
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiLaravel,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiPostgresql,
  SiMysql,
  SiGit
} from 'react-icons/si';
import {
  Brain,
  Eye,
  MessageSquare,
  BarChart3,
  Globe,
  Smartphone,
  Map,
  FileSpreadsheet,
  Briefcase,
  Mic,
  Award,
  RefreshCw,
  Users,
  GraduationCap,
  Lightbulb
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  python: SiPython,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  php: SiPhp,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  html5: SiHtml5,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  git: SiGit,
  ml: Brain,
  cv: Eye,
  nlp: MessageSquare,
  data: BarChart3,
  api: Globe,
  mobile: Smartphone,
  gis: Map,
  office: FileSpreadsheet,
  business: Briefcase,
};

const softSkills = [
  { name: 'Leadership & Management', icon: Award, color: '#6366F1' },
  { name: 'Public Speaking', icon: Mic, color: '#3B82F6' },
  { name: 'Communication', icon: MessageSquare, color: '#60A5FA' },
  { name: 'Problem Solving', icon: Lightbulb, color: '#0F9D58' },
  { name: 'Adaptability', icon: RefreshCw, color: '#22D3EE' },
  { name: 'Teamwork & Collaboration', icon: Users, color: '#FBBF24' },
  { name: 'Teaching & Mentoring', icon: GraduationCap, color: '#F97066' },
  { name: 'Business Development', icon: Briefcase, color: '#FF7043' },
];

export function SkillsSection() {
  const skills = skillsData as SkillType[];
  // Exclude 'Business Development' from hard skills since we put it in soft skills
  const hardSkills = skills.filter(s => s.name !== 'Business Development');

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-subheading">Skills</div>
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
            A combination of technical and interpersonal skills I use to realize digital solutions.
          </p>
        </SectionReveal>

        {/* Split Grid: Hard Skills vs Soft Skills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
        }} className="skills-split-layout">
          
          {/* Left Column: Hard Skills */}
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-primary)',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-blue)',
              }} />
              Hard Skills
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px',
            }}>
              {hardSkills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon] || null;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.015, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      padding: '18px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'default',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = skill.color || 'var(--accent-blue)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${skill.color || '#3B82F6'}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: `${skill.color || '#3B82F6'}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: skill.color || 'var(--accent-blue)',
                    }}>
                      {IconComponent ? <IconComponent size={20} /> : <span style={{ fontSize: '18px', fontWeight: 700 }}>{skill.name.charAt(0)}</span>}
                    </div>

                    <span style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textAlign: 'center',
                    }}>
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Soft Skills */}
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-primary)',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-indigo)',
              }} />
              Soft Skills
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px',
            }}>
              {softSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    style={{
                      background: 'var(--bg-card)',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      padding: '18px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'default',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = skill.color;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${skill.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: `${skill.color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: skill.color,
                    }}>
                      <IconComponent size={20} />
                    </div>

                    <span style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textAlign: 'center',
                    }}>
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .skills-split-layout {
            grid-template-columns: 1.4fr 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

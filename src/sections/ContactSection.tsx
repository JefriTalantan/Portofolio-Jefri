import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';
import { GlowCard } from '../components/GlowCard';
import { MagneticButton } from '../components/MagneticButton';
import toast from 'react-hot-toast';
import {
  Send, Mail,
  MapPin, Clock, CheckCircle2
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaGithub size={22} />, label: 'GitHub', url: 'https://github.com/jefri', color: '#6e5494' },
  { icon: <FaLinkedin size={22} />, label: 'LinkedIn', url: 'https://linkedin.com/in/jefri', color: '#0A66C2' },
  { icon: <FaInstagram size={22} />, label: 'Instagram', url: 'https://instagram.com/jefri', color: '#E4405F' },
  { icon: <Mail size={22} />, label: 'Email', url: 'mailto:jefri@example.com', color: '#6C5CE7' },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Mohon lengkapi semua field yang diperlukan.');
      return;
    }

    setIsSubmitting(true);

    // Simulate EmailJS sending (replace with real EmailJS integration)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Pesan terkirim! Saya akan segera membalas.');

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'var(--bg-surface)',
    border: `1.5px solid ${errors[field] ? 'var(--accent-coral)' : 'var(--border-color)'}`,
    color: 'var(--text-primary)',
    fontSize: '15px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    resize: 'none' as const,
  });

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      {/* Ambient gradient */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,92,231,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionReveal>
          <div className="section-subheading">Kontak</div>
          <h2 className="section-heading">
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            marginBottom: '48px',
          }}>
            Ada ide kolaborasi atau ingin ngobrol tentang teknologi? Jangan ragu untuk menghubungi saya!
          </p>
        </SectionReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
        }}
          className="contact-grid"
        >
          {/* Left: Contact Info */}
          <SectionReveal direction="left" delay={0.1}>
            <div>
              {/* Availability Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '9999px',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                marginBottom: '28px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  animation: 'pulse-glow 2s infinite',
                }} />
                <span style={{ fontSize: '14px', color: '#22C55E', fontWeight: 500 }}>
                  Open to opportunities & internship
                </span>
              </div>

              {/* Info items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-purple)' }} />
                  <span>Indonesia</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                  <Mail size={18} style={{ color: 'var(--accent-purple)' }} />
                  <span>jefri@example.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                  <Clock size={18} style={{ color: 'var(--accent-purple)' }} />
                  <span>GMT+7 (WIB) · Respon dalam 24 jam</span>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {socialLinks.map(social => (
                  <MagneticButton key={social.label} strength={0.4}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = social.color;
                        el.style.color = social.color;
                        el.style.boxShadow = `0 0 16px ${social.color}30`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = 'var(--border-color)';
                        el.style.color = 'var(--text-secondary)';
                        el.style.boxShadow = 'none';
                      }}
                    >
                      {social.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right: Contact Form */}
          <SectionReveal direction="right" delay={0.2}>
            <GlowCard>
              <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}
                  className="form-row"
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '6px', fontFamily: 'var(--font-caption)' }}>
                      Nama *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      placeholder="Nama lengkap"
                      value={formData.name}
                      onChange={(e) => { setFormData(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: false })); }}
                      style={inputStyle('name')}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108,92,231,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? 'var(--accent-coral)' : 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '6px', fontFamily: 'var(--font-caption)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => { setFormData(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: false })); }}
                      style={inputStyle('email')}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108,92,231,0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? 'var(--accent-coral)' : 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '6px', fontFamily: 'var(--font-caption)' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    placeholder="Apa yang ingin dibahas?"
                    value={formData.subject}
                    onChange={(e) => { setFormData(p => ({ ...p, subject: e.target.value })); setErrors(p => ({ ...p, subject: false })); }}
                    style={inputStyle('subject')}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108,92,231,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.subject ? 'var(--accent-coral)' : 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '6px', fontFamily: 'var(--font-caption)' }}>
                    Pesan *
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Ceritakan lebih detail..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => { setFormData(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: false })); }}
                    style={inputStyle('message')}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108,92,231,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? 'var(--accent-coral)' : 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                <MagneticButton>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="glow-btn"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '16px',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                      />
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 size={18} /> Terkirim!
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Kirim Pesan
                      </>
                    )}
                  </motion.button>
                </MagneticButton>
              </form>
            </GlowCard>
          </SectionReveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.3fr !important;
          }
        }
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

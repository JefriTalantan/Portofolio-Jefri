import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';

// Components
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';
import { GlobalInteractiveBackground } from './components/GlobalInteractiveBackground';

// Sections
import { Navbar } from './sections/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

// Styles
import './styles/globals.scss';

const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

function App() {
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(sectionIds, 200);
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <>
          {/* Custom Cursor (desktop) */}
          <CustomCursor />

          {/* Global Interactive Particle Background */}
          <GlobalInteractiveBackground />

          {/* Scroll Progress Bar */}
          <ScrollProgress />

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#3B82F6',
                  secondary: '#fff',
                },
              },
            }}
          />

          {/* Navbar */}
          <Navbar
            activeSection={activeSection}
            isDark={isDark}
            onThemeToggle={toggleTheme}
          />

          {/* Main Content */}
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Back to Top */}
          <BackToTop />
        </>
      )}
    </>
  );
}

export default App;

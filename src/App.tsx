import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkSection } from './components/WorkSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('top');

  const scrollToWork = () => {
    const el = document.querySelector('#work');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sectionIds = ['top', 'about', 'work', 'services', 'process', 'skills', 'certificates', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-white relative transition-colors duration-250">
      <BackgroundEffects />

      {/* Modern High-Precision Desktop Shell Grid */}
      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[310px_1fr] 2xl:grid-cols-[330px_1fr]">
        {/* Left Aside Navigation */}
        <Sidebar activeSection={activeSection} />

        {/* Right Main Scrollable Content */}
        <main className="px-6 py-8 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-12 xl:px-16 2xl:px-20 max-w-[1520px] w-full min-w-0">
          <Hero onScrollToWork={scrollToWork} />
          <About />
          <WorkSection />
          <ServicesSection />
          <ProcessSection />
          <SkillsSection />
          <CertificatesSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}

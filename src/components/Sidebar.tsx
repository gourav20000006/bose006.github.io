import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [mobileHoveredOption, setMobileHoveredOption] = useState<string | null>(null);

  const navItems = [
    { number: '01', name: 'About', href: '#about', id: 'about' },
    { number: '02', name: 'Selected Work', href: '#work', id: 'work' },
    { number: '03', name: 'Services', href: '#services', id: 'services' },
    { number: '04', name: 'Method', href: '#process', id: 'process' },
    { number: '05', name: 'Capabilities', href: '#skills', id: 'skills' },
    { number: '06', name: 'Certifications', href: '#certificates', id: 'certificates' },
    { number: '07', name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Mobile Top Header (< lg screens) */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-[var(--sidebar-bg)]/95 backdrop-blur-md border-b-[1.5px] border-[var(--card-border)] px-5 py-4 flex items-center justify-between transition-colors">
        <div>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-syne font-black text-xl tracking-tight uppercase text-[var(--ink)] leading-none block"
          >
            Gourav Bose
          </a>
          <span className="font-mono-custom text-[10px] text-[var(--ink-medium)] uppercase tracking-wider block mt-0.5">
            Data Entry Specialist
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle Compact */}
          <ThemeToggle compact />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-[var(--card-border)] rounded text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[var(--sidebar-bg)] border-b-[1.5px] border-[var(--card-border)] p-6 shadow-2xl flex flex-col gap-4">
            <nav 
              className="flex flex-col gap-2.5"
              onMouseLeave={() => setMobileHoveredOption(null)}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = mobileHoveredOption === item.id;
                const isSiblingHovered = mobileHoveredOption !== null && !isHovered;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    onMouseEnter={() => setMobileHoveredOption(item.id)}
                    animate={{
                      scale: isHovered ? 1.07 : isSiblingHovered ? 0.96 : 1,
                      filter: isSiblingHovered ? 'blur(1.5px)' : 'blur(0px)',
                      opacity: isSiblingHovered ? 0.35 : 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 900,
                      damping: 30,
                      mass: 0.5,
                    }}
                    className={`text-left font-mono-custom text-xs uppercase tracking-widest py-2.5 px-3 border-l-2 transition-colors flex items-center justify-between cursor-pointer rounded-r ${
                      isActive
                        ? 'border-[var(--accent)] text-[var(--accent)] font-bold bg-[var(--accent)]/10'
                        : isHovered
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10 font-bold'
                        : 'border-transparent text-[var(--ink-medium)]'
                    }`}
                  >
                    <span>{item.number} {item.name}</span>
                    {(isActive || isHovered) && <span className="text-[10px] text-[var(--accent)] font-bold">●</span>}
                  </motion.button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[var(--border-faint)]">
              <ThemeToggle />
            </div>

            <div className="pt-3 border-t border-[var(--border-faint)] flex items-center justify-between text-xs font-mono-custom">
              <div>
                <span className="text-[10px] text-[var(--ink-medium)] uppercase tracking-widest block font-bold">Status</span>
                <span className="text-[var(--accent)] font-bold text-[11px]">● Available for Hire</span>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-3 py-1.5 bg-[var(--btn-bg)] text-[var(--btn-text)] rounded text-[11px] uppercase tracking-wider font-bold"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Sticky Aside Sidebar (lg: and above) */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-[280px] bg-[var(--sidebar-bg)] border-r-[1.5px] border-[var(--card-border)] p-8 flex-col justify-between z-30 select-none overflow-y-auto transition-colors">
        <div>
          {/* Brand */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group block"
          >
            <h1 className="font-syne font-extrabold text-[2rem] leading-[0.9] uppercase tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              Gourav<br />Bose
            </h1>
            <div className="label-mono mt-3 text-[10px]">
              [ Data Specialist ]
            </div>
          </a>

          {/* Nav Links with Blow-Up and Motion Blur Focus Effect */}
          <nav 
            className="mt-14 space-y-3.5"
            onMouseLeave={() => setHoveredOption(null)}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredOption === item.id;
              const isSiblingHovered = hoveredOption !== null && !isHovered;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => setHoveredOption(item.id)}
                  animate={{
                    scale: isHovered ? 1.15 : isSiblingHovered ? 0.95 : 1,
                    x: isHovered ? 10 : 0,
                    filter: isSiblingHovered ? 'blur(2px)' : 'blur(0px)',
                    opacity: isSiblingHovered ? 0.35 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 900,
                    damping: 30,
                    mass: 0.5,
                  }}
                  className={`block w-full text-left font-mono-custom text-xs uppercase tracking-widest cursor-pointer py-1.5 px-2.5 -mx-2.5 rounded transition-colors ${
                    isActive
                      ? 'text-[var(--accent)] font-bold'
                      : 'text-[var(--ink-medium)] hover:text-[var(--ink)]'
                  } ${isHovered ? 'bg-[var(--accent)]/10 text-[var(--accent)] !font-bold' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`inline-block mr-2 text-[10px] ${isHovered || isActive ? 'text-[var(--accent)] opacity-100 font-bold' : 'opacity-60'}`}>
                        {item.number}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] text-[var(--accent)] font-bold"
                      >
                        ●
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Metadata & Controls */}
        <div className="space-y-4 pt-6 border-t border-[var(--border-faint)]">
          {/* Theme Switcher in Sidebar */}
          <div>
            <div className="label-mono text-[10px] mb-1.5">Theme</div>
            <ThemeToggle />
          </div>

          <div>
            <div className="label-mono text-[10px]">Location</div>
            <div className="text-sm font-medium text-[var(--ink)] mt-1">
              {PERSONAL_INFO.location}
            </div>
          </div>

          <div>
            <div className="label-mono text-[10px]">Status</div>
            <div className="text-sm text-[var(--accent)] font-semibold mt-1 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>

          <div>
            <div className="label-mono text-[10px]">Direct Comms</div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs font-mono-custom text-[var(--ink)] hover:text-[var(--accent)] transition-colors truncate max-w-[150px]"
                title={PERSONAL_INFO.email}
              >
                {PERSONAL_INFO.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1 text-[var(--ink-medium)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                title="Copy email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

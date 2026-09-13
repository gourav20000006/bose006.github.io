import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { motion } from 'motion/react';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-[var(--border-faint)] pt-8 pb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-custom text-xs text-[var(--ink-medium)] transition-colors">
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <span className="label-mono text-[10px] mr-1">Connect:</span>
        
        {/* LinkedIn - Official #0A66C2 Blue Glow */}
        <motion.a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.22, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22, mass: 0.5 }}
          className="w-8 h-8 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--ink)] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_16px_rgba(10,102,194,0.65)] transition-all flex items-center justify-center cursor-pointer"
          title="LinkedIn"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        {/* GitHub - Official Brand Purple Glow */}
        <motion.a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.22, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22, mass: 0.5 }}
          className="w-8 h-8 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--ink)] hover:text-white hover:bg-[#6e5494] hover:border-[#6e5494] hover:shadow-[0_0_18px_rgba(110,84,148,0.75)] transition-all flex items-center justify-center cursor-pointer"
          title="GitHub"
          aria-label="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </motion.a>

        {/* Fiverr - Official #1DBF73 Green Glow */}
        <motion.a
          href={PERSONAL_INFO.fiverr}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.22, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22, mass: 0.5 }}
          className="w-8 h-8 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--ink)] hover:text-white hover:bg-[#1DBF73] hover:border-[#1DBF73] hover:shadow-[0_0_16px_rgba(29,191,115,0.65)] transition-all flex items-center justify-center cursor-pointer"
          title="Fiverr"
          aria-label="Fiverr Profile"
        >
          <span className="font-syne font-black text-xs lowercase leading-none tracking-tighter">fi.</span>
        </motion.a>

        {/* Instagram - Official Sunset Gradient Glow */}
        <motion.a
          href={PERSONAL_INFO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.22, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22, mass: 0.5 }}
          className="w-8 h-8 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--ink)] hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-[#dc2743] hover:shadow-[0_0_16px_rgba(220,39,67,0.65)] transition-all flex items-center justify-center cursor-pointer"
          title="Instagram"
          aria-label="Instagram Profile"
        >
          <Instagram className="w-4 h-4" />
        </motion.a>

        {/* Email - Official Gmail #EA4335 Red Glow */}
        <motion.a
          href={`mailto:${PERSONAL_INFO.email}`}
          whileHover={{ scale: 1.22, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 700, damping: 22, mass: 0.5 }}
          className="w-8 h-8 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--ink)] hover:text-white hover:bg-[#EA4335] hover:border-[#EA4335] hover:shadow-[0_0_16px_rgba(234,67,53,0.65)] transition-all flex items-center justify-center cursor-pointer"
          title="Email"
          aria-label="Send Email"
        >
          <Mail className="w-4 h-4" />
        </motion.a>
      </div>

      <div className="text-[11px]">
        &copy; {new Date().getFullYear()} Gourav Bose — Systems of Data
      </div>
    </footer>
  );
};

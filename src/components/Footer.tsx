import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-[var(--border-faint)] pt-8 pb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-custom text-xs text-[var(--ink-medium)] transition-colors">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="label-mono text-[10px]">Connect:</span>
        <motion.a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.12, y: -1 }}
          transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
          className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-block"
        >
          LinkedIn ↗
        </motion.a>
        <motion.a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.12, y: -1 }}
          transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
          className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-block"
        >
          GitHub ↗
        </motion.a>
        <motion.a
          href={`mailto:${PERSONAL_INFO.email}`}
          whileHover={{ scale: 1.12, y: -1 }}
          transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
          className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-block"
        >
          Email ↗
        </motion.a>
      </div>

      <div className="text-[11px]">
        &copy; {new Date().getFullYear()} Gourav Bose — Systems of Data
      </div>
    </footer>
  );
};

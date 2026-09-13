import React, { useState } from 'react';
import { ArrowUpRight, Mail, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onScrollToWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToWork }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="top" className="pt-8 sm:pt-14 pb-20 sm:pb-28 relative">
      <div>
        {/* Editorial Mono Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="label-mono mb-6 sm:mb-8 flex items-center gap-3"
        >
          <span>[ Portfolio 2026 ]</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--ink-medium)]">West Bengal, India</span>
        </motion.div>

        {/* Hero Title in Syne 800 Display Font */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-syne font-extrabold text-[clamp(3.5rem,8.5vw,7.8rem)] leading-[0.85] tracking-[-0.04em] uppercase text-[var(--ink)] mb-6 sm:mb-8 transition-colors"
        >
          Systems<br />of Data
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-[var(--ink-medium)] max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal transition-colors"
        >
          Data Entry Specialist &amp; Operations Professional. Transforming raw data into actionable insights with 99% precision.
        </motion.p>

        {/* Action Buttons with Blow-Up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
            onClick={(e) => {
              e.preventDefault();
              onScrollToWork();
            }}
            className="inline-flex items-center justify-center px-7 py-3.5 bg-[var(--btn-bg)] hover:bg-[var(--accent)] text-[var(--btn-text)] font-mono-custom text-xs uppercase tracking-widest font-bold rounded transition-colors duration-200 shadow-sm"
          >
            <span>View Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
          </motion.a>

          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
            className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent hover:bg-[var(--ink)] text-[var(--ink)] hover:text-[var(--bg)] border border-[var(--card-border)] font-mono-custom text-xs uppercase tracking-widest font-bold rounded transition-colors duration-200"
          >
            <Mail className="w-3.5 h-3.5 mr-2" />
            <span>Message</span>
          </motion.a>

          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-3.5 bg-transparent hover:bg-[var(--card-bg)] text-[var(--ink-medium)] hover:text-[var(--ink)] font-mono-custom text-xs uppercase tracking-widest font-semibold rounded border border-[var(--border-faint)] transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

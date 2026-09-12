import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="pt-16 pb-20 border-t border-[var(--border-faint)] relative">
      <div className="flex justify-between items-baseline mb-6">
        <span className="label-mono">Contact / 06</span>
        <span className="label-mono hidden sm:inline-block">Direct Inquiries</span>
      </div>

      {/* Signature Focal Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="bg-[#1a1a1a] dark:bg-[#16171d] dark:border dark:border-[var(--card-border)] text-[#f8f7f4] p-8 sm:p-12 md:p-16 rounded-lg shadow-xl relative overflow-hidden transition-colors"
      >
        {/* Subtle decorative radial light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--accent)] font-bold block mb-4">
            [ Inquiries &amp; Hiring ]
          </span>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight mb-4">
            Let's Connect
          </h2>

          <p className="text-white/75 text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-normal">
            Available for data entry, cleaning pipelines, spreadsheet automation, and operations optimization.
          </p>

          <div className="font-mono-custom text-base sm:text-xl text-white/95 space-y-1.5 mb-8">
            <div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div>
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#1a1a1a] hover:bg-[var(--accent)] hover:text-white font-mono-custom text-xs uppercase tracking-widest font-bold rounded transition-colors shadow-md"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </motion.a>

            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 900, damping: 26, mass: 0.5 }}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#f8f7f4] border border-white/30 font-mono-custom text-xs uppercase tracking-widest font-semibold rounded transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-emerald-400" />
                  <span>Copied Email</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2 text-[var(--accent)]" />
                  <span>Copy Email</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

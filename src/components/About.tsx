import React from 'react';
import { motion } from 'motion/react';
import { QualificationsToggle } from './QualificationsToggle';

export const About: React.FC = () => {
  return (
    <section id="about" className="pt-16 pb-24 sm:pb-32 border-t border-[var(--border-faint)] relative">
      <div>
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-8 sm:mb-12">
          <span className="label-mono">About / 01</span>
          <span className="label-mono hidden sm:inline-block">Profile &amp; Background</span>
        </div>

        {/* Big Narrative Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-[1.65rem] leading-[1.4] text-[var(--ink)] max-w-4xl font-normal transition-colors"
        >
          Motivated Commerce student with practical experience in computer operations and data management. Skilled in utilizing intermediate Excel functions, VLOOKUP, and database retrieval.
        </motion.p>

        {/* Secondary context */}
        <p className="mt-4 text-sm sm:text-base text-[var(--ink-medium)] max-w-3xl leading-relaxed transition-colors">
          Having developed a disciplined and detail-oriented approach through operations at Flipkart, I am prepared to contribute effectively to professional business environments with high accuracy.
        </p>

        {/* 3 Stat Cards in Grid-3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            whileHover={{ scale: 1.015, y: -3 }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.1 },
              y: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
              scale: { type: 'spring', stiffness: 260, damping: 24 }
            }}
            className="border border-[var(--card-border)] p-6 sm:p-8 bg-[var(--card-bg)] rounded shadow-sm hover:border-[var(--accent)] transition-colors group cursor-default"
          >
            <h3 className="font-syne font-extrabold text-4xl sm:text-5xl text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
              5+
            </h3>
            <span className="label-mono text-[var(--ink-medium)]">Projects Archived</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            whileHover={{ scale: 1.015, y: -3 }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.2 },
              y: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              scale: { type: 'spring', stiffness: 260, damping: 24 }
            }}
            className="border border-[var(--card-border)] p-6 sm:p-8 bg-[var(--card-bg)] rounded shadow-sm hover:border-[var(--accent)] transition-colors group cursor-default"
          >
            <h3 className="font-syne font-extrabold text-4xl sm:text-5xl text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
              1+
            </h3>
            <span className="label-mono text-[var(--ink-medium)]">Year Experience</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            whileHover={{ scale: 1.015, y: -3 }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.3 },
              y: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
              scale: { type: 'spring', stiffness: 260, damping: 24 }
            }}
            className="border border-[var(--card-border)] p-6 sm:p-8 bg-[var(--card-bg)] rounded shadow-sm hover:border-[var(--accent)] transition-colors group cursor-default"
          >
            <h3 className="font-syne font-extrabold text-4xl sm:text-5xl text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
              99%
            </h3>
            <span className="label-mono text-[var(--ink-medium)]">Data Accuracy</span>
          </motion.div>
        </div>

        {/* Academic Qualifications Collapsible */}
        <QualificationsToggle />
      </div>
    </section>
  );
};

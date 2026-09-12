import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <section id="process" className="pt-16 pb-24 sm:pb-32 border-t border-[var(--border-faint)] relative">
      <div>
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-8 sm:mb-12">
          <span className="label-mono">Method / 04</span>
          <span className="label-mono hidden sm:inline-block">Operational Pipeline</span>
        </div>

        {/* 4 Steps Grid with Blow-Up & Motion Blur */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          onMouseLeave={() => setHoveredStep(null)}
        >
          {PROCESS_STEPS.map((step, index) => {
            const isHovered = hoveredStep === step.stepNumber;
            const isSiblingHovered = hoveredStep !== null && !isHovered;

            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  scale: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 },
                  y: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 },
                  filter: { duration: 0.25, ease: 'easeOut' },
                  opacity: { duration: 0.25, ease: 'easeOut' },
                  default: { duration: 0.4, delay: index * 0.06 },
                }}
                animate={{
                  scale: isHovered ? 1.015 : 1,
                  y: isHovered ? -3 : 0,
                  filter: isSiblingHovered ? 'blur(0.5px)' : 'blur(0px)',
                  opacity: isSiblingHovered ? 0.75 : 1,
                }}
                onMouseEnter={() => setHoveredStep(step.stepNumber)}
                className={`border border-[var(--card-border)] p-6 bg-[var(--card-bg)] rounded shadow-sm transition-colors duration-300 flex flex-col justify-between group cursor-default ${
                  isHovered ? 'border-[var(--accent)] shadow-md' : ''
                }`}
              >
              <div>
                <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-4">
                  {step.stepNumber}
                </div>

                <h3 className="font-syne font-bold text-base sm:text-lg text-[var(--ink)] uppercase tracking-tight mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--ink-medium)] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[var(--border-faint)] flex items-center justify-between">
                <span className="label-mono text-[9px] text-[var(--ink-medium)]">Phase {index + 1}</span>
                <span className="text-[var(--accent)] text-xs">●</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

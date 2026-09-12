import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { motion } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="pt-16 pb-24 sm:pb-32 border-t border-[var(--border-faint)] relative">
      <div>
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-8 sm:mb-12">
          <span className="label-mono">Capabilities / 05</span>
          <span className="label-mono hidden sm:inline-block">Technical Stack &amp; Tooling</span>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {SKILL_CATEGORIES.map((category, index) => {
            const isHovered = hoveredCategory === category.title;
            const isSiblingHovered = hoveredCategory !== null && !isHovered;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  scale: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 },
                  y: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 },
                  filter: { duration: 0.25, ease: 'easeOut' },
                  opacity: { duration: 0.25, ease: 'easeOut' },
                  default: { duration: 0.4, delay: index * 0.08 },
                }}
                animate={{
                  scale: isHovered ? 1.015 : 1,
                  y: isHovered ? -3 : 0,
                  filter: isSiblingHovered ? 'blur(0.5px)' : 'blur(0px)',
                  opacity: isSiblingHovered ? 0.75 : 1,
                }}
                onMouseEnter={() => setHoveredCategory(category.title)}
                className={`border border-[var(--card-border)] p-6 sm:p-7 bg-[var(--card-bg)] rounded shadow-sm transition-colors duration-300 flex flex-col justify-between group cursor-default ${
                  isHovered ? 'border-[var(--accent)] shadow-md' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-3 mb-4 border-b border-[var(--border-faint)] min-h-[44px]">
                    <h3
                      id={`skill-category-${index}`}
                      className="font-syne font-extrabold text-sm sm:text-base text-[var(--ink)] uppercase tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors break-words max-w-[calc(100%-2rem)]"
                    >
                      {category.title}
                    </h3>
                    <span className="label-mono text-[10px] text-[var(--ink-medium)] shrink-0 px-1.5 py-0.5 rounded bg-[var(--ink)]/5 border border-[var(--card-border)] font-mono font-bold mt-0.5">
                      0{index + 1}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <motion.li
                        key={skill}
                        whileHover={{ scale: 1.015, x: 3 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.5 }}
                        className="text-xs sm:text-sm text-[var(--ink)]/85 py-1.5 px-2.5 -mx-2.5 rounded hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors flex items-center justify-between group/item cursor-pointer font-medium"
                      >
                        <span className="group-hover/item:font-bold transition-all">
                          {skill}
                        </span>
                        <span className="font-mono-custom text-[10px] text-[var(--ink-medium)] group-hover/item:text-[var(--accent)] font-bold">
                          ✓
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--border-faint)] flex items-center justify-between">
                  <span className="label-mono text-[9px] text-[var(--ink-medium)]">
                    {category.skills.length} Competencies
                  </span>
                  <span className="text-[var(--accent)] text-xs font-mono-custom font-bold">● Active</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

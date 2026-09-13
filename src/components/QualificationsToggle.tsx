import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ChevronDown, ChevronUp, BookOpen, Building2, Calendar, Sparkles } from 'lucide-react';
import { QUALIFICATIONS } from '../data/portfolioData';

export const QualificationsToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mt-12 sm:mt-16 pt-8 border-t border-[var(--border-faint)]">
      {/* View Qualification Trigger Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
            <span className="label-mono text-xs text-[var(--accent)] uppercase tracking-wider font-bold">
              Academic Background
            </span>
          </div>
          <p className="text-sm text-[var(--ink-medium)] font-sans">
            Formal schooling, commerce milestones, and ongoing undergraduate degree.
          </p>
        </div>

        <motion.button
          id="view-qualifications-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[var(--card-bg)] hover:bg-[var(--accent)] text-[var(--ink)] hover:text-white border border-[var(--card-border)] hover:border-[var(--accent)] font-mono-custom text-xs uppercase tracking-widest font-bold rounded shadow-sm transition-all duration-200 cursor-pointer self-start sm:self-auto"
          aria-expanded={isOpen}
          aria-controls="qualifications-panel"
        >
          <span>{isOpen ? 'Hide Qualifications' : 'View Qualifications'}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Hidden Content: Revealed only upon clicking View Qualification */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="qualifications-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8">
              {QUALIFICATIONS.map((item, index) => {
                const isCurrent = item.status.toLowerCase().includes('currently');
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`relative p-6 rounded border bg-[var(--card-bg)] transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/20 shadow-md'
                        : 'border-[var(--card-border)] shadow-sm hover:border-[var(--accent)]'
                    }`}
                  >
                    {/* Header badge & status */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`label-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            isCurrent
                              ? 'bg-[var(--accent)] text-white'
                              : 'bg-[var(--border-faint)] text-[var(--ink)]'
                          }`}
                        >
                          {item.status}
                        </span>

                        <span className="label-mono text-[11px] text-[var(--ink-medium)] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[var(--accent)]" />
                          {item.period}
                        </span>
                      </div>

                      {/* Degree Title */}
                      <h4 className="font-syne font-bold text-lg text-[var(--ink)] leading-snug mb-2">
                        {item.degree}
                      </h4>

                      {/* Institution */}
                      <div className="flex items-start gap-1.5 text-xs text-[var(--ink-medium)] mb-4">
                        <Building2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--accent)]" />
                        <span className="font-medium leading-relaxed">{item.institution}</span>
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="pt-3 border-t border-[var(--border-faint)]">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <BookOpen className="w-3 h-3 text-[var(--accent)]" />
                        <span className="label-mono text-[10px] text-[var(--ink-medium)] uppercase font-semibold">
                          Focus Areas
                        </span>
                      </div>
                      <p className="text-xs text-[var(--ink)] font-sans leading-relaxed">
                        {item.focusAreas}
                      </p>
                    </div>

                    {isCurrent && (
                      <div className="absolute -top-2.5 -right-2 px-2 py-0.5 bg-[var(--accent)] text-white text-[9px] font-mono-custom uppercase tracking-wider font-bold rounded flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Active</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

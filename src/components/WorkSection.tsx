import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectMockup } from './ProjectMockup';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <section id="work" className="scroll-mt-10 lg:scroll-mt-14 pt-12 sm:pt-16 pb-20 sm:pb-28 border-t border-[var(--border-faint)] relative">
      <div>
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-8 sm:mb-12">
          <span className="label-mono">Projects / 02</span>
          <span className="label-mono">Selected Case Studies</span>
        </div>

        {/* 3-Column Grid with Blow-Up & Motion Blur on Sibling Options */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          onMouseLeave={() => setHoveredProjectId(null)}
        >
          {PROJECTS.map((project, index) => {
            const letter = letters[index % letters.length];
            const isHovered = hoveredProjectId === project.id;
            const isSiblingHovered = hoveredProjectId !== null && !isHovered;

            return (
              <motion.div
                key={project.id}
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
                  scale: isHovered ? 1.012 : 1,
                  y: isHovered ? -3 : 0,
                  filter: isSiblingHovered ? 'blur(0.5px)' : 'blur(0px)',
                  opacity: isSiblingHovered ? 0.75 : 1,
                }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onClick={() => setSelectedProject(project)}
                className={`border-b border-[var(--border-faint)] pb-8 flex flex-col justify-between group cursor-pointer p-5 -m-5 rounded-lg transition-colors duration-300 ${
                  isHovered ? 'bg-[var(--card-bg)] shadow-md border-b-2 border-b-[var(--accent)]' : 'hover:bg-[var(--card-bg)]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
                        Case Study {letter}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--ink)]/5 text-[var(--ink-medium)] border border-[var(--border-faint)]">
                        {project.software === 'excel' ? 'Excel' : 'Sheets'}
                      </span>
                    </div>
                    <span className="label-mono text-[10px] text-[var(--ink-medium)] group-hover:text-[var(--accent)] transition-colors">
                      [ Inspect ]
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-lg sm:text-xl text-[var(--ink)] uppercase tracking-tight mt-3 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--ink-medium)] leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--border-faint)] flex items-center justify-between">
                  <span className="font-mono-custom text-[11px] text-[var(--ink-medium)]">
                    {project.tag}
                  </span>
                  <span className="font-mono-custom text-xs text-[var(--ink)] group-hover:text-[var(--accent)] inline-flex items-center gap-1 font-semibold transition-colors">
                    <span>View Spreadsheet</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--modal-bg)] border border-[var(--card-border)] max-w-2xl w-full rounded-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl transition-colors"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 text-[var(--ink-medium)] hover:text-[var(--ink)] hover:bg-[var(--card-border)]/30 rounded transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="label-mono text-[var(--accent)] mb-2 font-bold">
                [ Case Study Specification ]
              </div>

              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[var(--ink)] uppercase tracking-tight mb-3">
                {selectedProject.title}
              </h2>

              <p className="text-base text-[var(--ink-medium)] leading-relaxed mb-6 font-normal">
                {selectedProject.description}
              </p>

              {/* Data Mockup Preview */}
              <div className="mb-6 rounded-lg overflow-hidden border border-[var(--card-border)] bg-black/90 text-white shadow-xl">
                <ProjectMockup
                  type={selectedProject.mockupType}
                  title={selectedProject.title}
                  software={selectedProject.software}
                  sheetName={selectedProject.sheetName}
                  image={selectedProject.image}
                />
              </div>

              {/* Key Metrics */}
              <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-4 rounded mb-6">
                <div className="label-mono text-[10px] text-[var(--ink-medium)] mb-1">
                  Verified Outcome &amp; Impact
                </div>
                <div className="font-mono-custom text-sm font-bold text-[var(--accent)]">
                  {selectedProject.metrics}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-8">
                <div className="label-mono text-[10px] text-[var(--ink-medium)] mb-2">
                  Tools &amp; Formulas Utilized
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--ink)] text-xs rounded font-mono-custom"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-faint)] flex items-center justify-between">
                <span className="label-mono text-[10px]">
                  Category: {selectedProject.tag}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 bg-[var(--btn-bg)] hover:bg-[var(--accent)] text-[var(--btn-text)] font-mono-custom text-xs uppercase tracking-widest font-bold rounded transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

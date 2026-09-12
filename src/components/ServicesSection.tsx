import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/portfolioData';

export const ServicesSection: React.FC = () => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  return (
    <section id="services" className="pt-16 pb-24 sm:pb-32 border-t border-[var(--border-faint)] relative">
      <div>
        {/* Section Header */}
        <div className="flex justify-between items-baseline mb-8 sm:mb-12">
          <span className="label-mono">Services / 03</span>
          <span className="label-mono hidden sm:inline-block">Specialized Offerings</span>
        </div>

        {/* 3-Column Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          onMouseLeave={() => setHoveredServiceId(null)}
        >
          {SERVICES.map((service, index) => {
            const num = `0${index + 1}`;
            const isHovered = hoveredServiceId === service.id;
            const isSiblingHovered = hoveredServiceId !== null && !isHovered;
            const isDbMgmt = service.id === 'database-mgmt';

            return (
              <motion.div
                key={service.id}
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
                onMouseEnter={() => setHoveredServiceId(service.id)}
                className={`border border-[var(--card-border)] ${
                  isDbMgmt ? 'p-6 sm:p-7 md:p-6 lg:p-8' : 'p-6 sm:p-8'
                } bg-[var(--card-bg)] rounded shadow-sm transition-colors duration-300 flex flex-col justify-between group cursor-default ${
                  isHovered ? 'border-[var(--accent)] shadow-md' : ''
                }`}
              >
                <div>
                  <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
                    {num}
                  </span>

                  <h3
                    className={`font-syne font-extrabold text-[var(--ink)] uppercase tracking-tight mt-6 mb-3 group-hover:text-[var(--accent)] transition-colors ${
                      isDbMgmt
                        ? 'text-lg sm:text-xl lg:text-[1.35rem] leading-[1.18]'
                        : 'text-xl sm:text-2xl leading-tight'
                    }`}
                  >
                    {isDbMgmt ? (
                      <span className="block">
                        Database <span className="inline-block">Management</span>
                      </span>
                    ) : (
                      service.title
                    )}
                  </h3>

                  <p className="text-sm text-[var(--ink-medium)] leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border-faint)]">
                  <div className="label-mono text-[10px] text-[var(--ink-medium)] mb-2">Capabilities</div>
                  <ul className="space-y-1 text-xs text-[var(--ink)]/80 font-mono-custom">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[var(--accent)]">›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

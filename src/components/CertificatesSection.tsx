import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, CheckCircle, ExternalLink, Eye, X, Copy, Check, Calendar, Hash } from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';
import { Certificate } from '../types';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hoveredCertId, setHoveredCertId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certificates" className="scroll-mt-10 lg:scroll-mt-14 py-14 sm:py-20 border-b border-[var(--border-faint)]">
      <div className="space-y-12">
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="label-mono text-xs text-[var(--accent)] tracking-widest uppercase font-bold">
              06 / Qualifications
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-syne font-black text-3xl sm:text-4xl text-[var(--ink)] uppercase tracking-tight">
                Verified Certifications
              </h2>
              <p className="text-[var(--ink-medium)] text-sm sm:text-base max-w-2xl mt-2">
                Officially accredited industry training and academic credentials confirming expertise in data operations, spreadsheet modeling, and warehouse dispatch workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          onMouseLeave={() => setHoveredCertId(null)}
        >
          {CERTIFICATES.map((cert) => {
            const isMicrosoft = cert.type === 'simplilearn-microsoft';
            const isHovered = hoveredCertId === cert.id;
            const isSiblingHovered = Boolean(hoveredCertId && hoveredCertId !== cert.id);

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  scale: isHovered ? 1.025 : 1,
                  y: isHovered ? -4 : 0,
                  filter: isSiblingHovered ? 'blur(0.8px)' : 'blur(0px)',
                  opacity: isSiblingHovered ? 0.72 : 1,
                }}
                transition={{
                  scale: { type: 'spring', stiffness: 550, damping: 24, mass: 0.4 },
                  y: { type: 'spring', stiffness: 550, damping: 24, mass: 0.4 },
                  filter: { duration: 0.2, ease: 'easeOut' },
                  opacity: { duration: 0.2, ease: 'easeOut' },
                  default: { duration: 0.3 },
                }}
                onMouseEnter={() => setHoveredCertId(cert.id)}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer rounded-xl border border-[var(--card-border)] hover:border-[var(--accent)] bg-[var(--card-bg)] p-6 sm:p-7 shadow-sm hover:shadow-xl transition-colors duration-200 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative Top Watermark Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-opacity"
                  style={{
                    backgroundColor: isMicrosoft ? '#00a4ef' : '#2874f0',
                  }}
                />

                <div>
                  {/* Top Row: Issuer Logo & Verification Badge */}
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--border-faint)]">
                    <div>
                      {isMicrosoft ? (
                        <div className="flex items-center gap-2">
                          {/* Microsoft 4-box Logo */}
                          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                            <span className="bg-[#f25022] rounded-[0.5px]" />
                            <span className="bg-[#7fba00] rounded-[0.5px]" />
                            <span className="bg-[#00a4ef] rounded-[0.5px]" />
                            <span className="bg-[#ffb900] rounded-[0.5px]" />
                          </div>
                          <span className="text-[11px] font-sans font-bold text-[var(--ink)] tracking-tight">
                            Microsoft
                          </span>
                          <span className="text-[10px] text-[var(--ink-medium)] font-mono">
                            × simplilearn skillup
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-black tracking-tight text-[#2874f0] font-sans italic">
                            Flipkart <span className="text-[#ffe11b]">⚡</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[var(--ink-medium)] uppercase px-1.5 py-0.5 rounded bg-[var(--ink)]/5">
                            S.C.O.A Academy
                          </span>
                        </div>
                      )}
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--ink-medium)] block mt-1">
                        {cert.certificateType}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Certificate Title & Recipient */}
                  <div className="my-5">
                    <span className="text-[11px] font-mono text-[var(--ink-medium)] uppercase tracking-wider block mb-1">
                      Certified Specialist:
                    </span>
                    <h3 className="font-syne font-bold text-xl sm:text-2xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--ink-medium)] mt-2 line-clamp-2">
                      {cert.note}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 my-4">
                    {cert.skillsAcquired.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--ink)]/5 text-[var(--ink)]/80 border border-[var(--border-faint)]"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skillsAcquired.length > 3 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-[var(--ink-medium)]">
                        +{cert.skillsAcquired.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Meta & Quick Action */}
                <div className="pt-4 border-t border-[var(--border-faint)] flex items-center justify-between text-xs font-mono text-[var(--ink-medium)]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {cert.issueDate}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-[var(--ink-medium)]" />
                      {cert.credentialId}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[var(--accent)] font-semibold group-hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Certificate Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{
                type: 'spring',
                stiffness: 520,
                damping: 28,
                mass: 0.5,
              }}
              className="bg-[var(--card-bg)] text-[var(--ink)] border border-[var(--card-border)] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Controls */}
              <div className="px-5 py-3.5 border-b border-[var(--border-faint)] flex items-center justify-between bg-[var(--card-bg)]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-mono text-xs font-bold text-[var(--ink)] uppercase">
                    Official Certificate View
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-md text-[var(--ink-medium)] hover:text-[var(--ink)] hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Canvas Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Physical Certificate Replica Paper Box */}
                <div className="relative rounded-lg border-4 border-double border-neutral-300 dark:border-neutral-700 p-6 sm:p-10 bg-white text-neutral-900 shadow-inner text-center font-sans overflow-hidden">
                  {/* Decorative Corner Borders */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-neutral-400 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-neutral-400 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-neutral-400 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-neutral-400 pointer-events-none" />

                  {/* Header Logos */}
                  {selectedCert.type === 'simplilearn-microsoft' ? (
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                          <span className="bg-[#f25022]" />
                          <span className="bg-[#7fba00]" />
                          <span className="bg-[#00a4ef]" />
                          <span className="bg-[#ffb900]" />
                        </div>
                        <div className="text-left leading-none">
                          <span className="text-[10px] text-neutral-500 block">Powered by</span>
                          <span className="font-bold text-neutral-800 text-sm">Microsoft</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-base tracking-tight text-neutral-900">
                          simpli<span className="text-orange-500">learn</span>
                        </span>
                        <span className="ml-1 text-xs font-bold text-sky-600">skill<span className="text-orange-500">UP</span></span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black italic tracking-tight text-[#2874f0]">
                          Flipkart <span className="text-amber-400">⚡</span>
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-bold text-lg tracking-widest text-[#2874f0]">S.C.O.A</span>
                        <span className="block text-[9px] text-neutral-500 font-mono">flipkartacademy.com</span>
                      </div>
                      <div className="text-right text-[11px] font-bold text-neutral-700">
                        SUPPLY CHAIN OPERATIONS ACADEMY
                      </div>
                    </div>
                  )}

                  {/* Certificate Title */}
                  <span className="text-xs uppercase font-serif tracking-widest text-neutral-500 block mb-1 font-semibold">
                    {selectedCert.certificateType}
                  </span>
                  <p className="text-xs text-neutral-500 italic mb-4">
                    is proudly presented to
                  </p>

                  {/* Recipient Name in Display Script */}
                  <div className="my-3 pb-2 border-b-2 border-neutral-900 max-w-sm mx-auto">
                    <span className="font-syne font-extrabold text-2xl sm:text-3xl text-neutral-950 uppercase tracking-tight">
                      {selectedCert.recipient}
                    </span>
                  </div>

                  {/* Certificate Subject Text */}
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mt-3">
                    {selectedCert.type === 'simplilearn-microsoft'
                      ? 'has successfully completed the online course'
                      : 'for having successfully passed the pre-assessment test'}
                  </p>

                  <div className="my-3">
                    <span className="font-syne font-bold text-lg sm:text-xl text-[#2874f0]">
                      {selectedCert.title}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 max-w-lg mx-auto leading-relaxed italic">
                    "{selectedCert.note}"
                  </p>

                  {/* Verification Bottom Signatures / Codes */}
                  <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-3 gap-4 items-end text-left">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase font-mono">Date Issued</span>
                      <span className="text-xs font-bold text-neutral-800 font-mono">
                        {selectedCert.issueDate}
                      </span>
                    </div>

                    <div className="text-center">
                      {selectedCert.signatory && (
                        <div>
                          <span className="font-serif italic text-sm text-neutral-800 font-bold block">
                            {selectedCert.signatory}
                          </span>
                          <span className="text-[10px] text-neutral-500 block uppercase font-mono">
                            {selectedCert.signatoryTitle}
                          </span>
                        </div>
                      )}
                      {selectedCert.type === 'flipkart-scoa' && (
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold font-mono">
                            EXEMPLARY PERFORMANCE
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block uppercase font-mono">
                        {selectedCert.type === 'simplilearn-microsoft' ? 'Certificate Code' : 'Registration No.'}
                      </span>
                      <span className="text-xs font-bold font-mono text-neutral-800">
                        {selectedCert.credentialId}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Acquired Pill Tags */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--ink-medium)] mb-2 font-bold">
                    Validated Competencies & Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Bar with Copy Code */}
                <div className="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>
                      Registration ID:{' '}
                      <strong className="text-[var(--ink)]">{selectedCert.credentialId}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleCopyCode(selectedCert.id, selectedCert.credentialId, e)}
                    className="w-full sm:w-auto px-3 py-1.5 rounded bg-[var(--ink)]/10 hover:bg-[var(--ink)]/20 text-[var(--ink)] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {copiedId === selectedCert.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Credential Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

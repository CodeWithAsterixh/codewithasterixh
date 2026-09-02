'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowSquareOutIcon,
  PaperPlaneTiltIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CodeIcon,
  XIcon,
} from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';

export interface InfoTilesetModalProps {
  isOpen: boolean;
  mode: 'project' | 'contact';
  projectSlug?: string;
  onClose: () => void;
}

export const InfoTilesetModal: React.FC<InfoTilesetModalProps> = ({
  isOpen,
  mode,
  projectSlug,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const project = projectsData.find((p: any) => p.slug === projectSlug) || projectsData[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none font-pixelify">

      {/* MODAL CARD CONTAINER */}
      <div className="relative w-full max-w-2xl bg-[#EFE3C3] border-4 border-[#243C6E] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_0_2px_#D6C296] overflow-hidden flex flex-col max-h-[88vh] text-[#241F1A] animate-in zoom-in-95 duration-200">

        {/* Decorative Corner Rivets */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#E8DAAF]/90 border-b-2 border-[#D6C296]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#243C6E] rotate-45 inline-block" />
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#1F1914]">
              {mode === 'project' ? 'Project Details' : 'Contact Me'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF5E6] hover:bg-[#FAF5E6]/90 border-2 border-[#243C6E] text-[#243C6E] font-extrabold flex items-center justify-center transition-all cursor-pointer"
            title="Close [ESC]"
          >
            <XIcon size={14} weight="duotone" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-[#EFE3C3] via-[#E8DCB7] to-[#DFD0A8]">

          {mode === 'project' ? (
            /* PROJECT VIEW */
            <div className="flex flex-col sm:flex-row gap-5 items-start">

              {/* Left Column: Thumbnail + Actions */}
              <div className="w-full sm:w-[200px] shrink-0 flex flex-col gap-3">
                <div className="relative w-full aspect-video sm:aspect-square bg-[#FAF5E6] border-2 border-[#D5C49B] rounded-md overflow-hidden flex items-center justify-center">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#5C4F41]">
                      <CodeIcon size={32} weight="duotone" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundImage: 'url(/btns/button2_tight.png)',
                        backgroundSize: '100% 100%',
                      }}
                      className="w-full py-2 px-3 rounded-md text-[#062c3f] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:brightness-110 active:translate-y-0.5"
                    >
                      <span>Live Demo</span>
                      <ArrowSquareOutIcon size={14} weight="duotone" />
                    </a>
                  )}
                  {(project as any).github && (
                    <a
                      href={(project as any).github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundImage: 'url(/btns/button1_tight.png)',
                        backgroundSize: '100% 100%',
                      }}
                      className="w-full py-2 px-3 rounded-md text-[#f5edf9] font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:translate-y-0.5"
                    >
                      <span>View Code</span>
                      <ArrowRightIcon size={13} weight="duotone" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Info & Tech Stack */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#243C6E] text-white text-[10px] font-bold uppercase">
                    {project.category || 'Project'}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#1F1914] mt-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#524436] leading-relaxed mt-1">
                    {project.excerpt}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#6E5C3B]">Technologies</div>
                  <div className="flex flex-wrap gap-1">
                    {project.tools?.map((tool: string) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 bg-[#FAF5E6] border border-[#D5C49B] rounded text-[10px] font-bold text-[#3D332A]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture / Details */}
                {project.architecture && (
                  <div className="p-3 rounded-md bg-[#FAF5E6] border border-[#D5C49B] space-y-1">
                    <div className="text-xs font-bold text-[#1F1914]">Overview & Structure</div>
                    <p className="text-xs text-[#5C4F41] leading-relaxed">
                      {project.architecture}
                    </p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* CONTACT VIEW */
            <>
              {isSubmitted ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#059669]/20 border-2 border-[#059669] flex items-center justify-center text-[#059669]">
                    <CheckCircleIcon size={28} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#1F1914]">
                      Message Sent!
                    </h3>
                    <p className="text-xs text-[#5C4F41] mt-1">
                      Thanks <span className="font-bold">{formData.name}</span>, your message has been received.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                      onClose();
                    }}
                    style={{
                      backgroundImage: 'url(/btns/button2_tight.png)',
                      backgroundSize: '100% 100%',
                    }}
                    className="py-2 px-5 rounded-md text-[#062c3f] font-extrabold text-xs shadow-sm hover:brightness-110 active:translate-y-0.5"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1F1914]">
                      Send a Message
                    </h3>
                    <p className="text-xs text-[#5C4F41]">
                      Feel free to reach out about opportunities, projects, or questions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex"
                        className="w-full px-3 py-2 rounded-lg bg-[#FAF5E6] border border-[#D5C49B] text-xs font-semibold text-[#1F1914] focus:outline-none focus:border-[#243C6E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@example.com"
                        className="w-full px-3 py-2 rounded-lg bg-[#FAF5E6] border border-[#D5C49B] text-xs font-semibold text-[#1F1914] focus:outline-none focus:border-[#243C6E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Project Collaboration"
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF5E6] border border-[#D5C49B] text-xs font-semibold text-[#1F1914] focus:outline-none focus:border-[#243C6E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full px-3 py-2 rounded-lg bg-[#FAF5E6] border border-[#D5C49B] text-xs font-semibold text-[#1F1914] focus:outline-none focus:border-[#243C6E] resize-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-[#D6C296] flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundImage: 'url(/btns/button2_tight.png)',
                        backgroundSize: '100% 100%',
                      }}
                      className="py-2.5 px-6 rounded-md text-[#062c3f] font-extrabold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-110 active:translate-y-0.5 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <PaperPlaneTiltIcon size={14} weight="duotone" />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

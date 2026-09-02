'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  XIcon,
  BookOpenIcon,
  CodeIcon,
  ArrowRightIcon,
  PaperPlaneTiltIcon,
  UserIcon,
  BriefcaseIcon,
  ArrowSquareOutIcon,
  SparkleIcon,
} from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';

export interface BookModalProps {
  isOpen: boolean;
  mode: 'about' | 'works';
  onClose: () => void;
  onOpenProjectDetail?: (projectSlug: string) => void;
  onOpenContact?: () => void;
}

const TOTAL_FRAMES = 12;
const COLS = 4;
const ROWS = 3;
const FRAME_SIZE = 272;
const FRAME_DURATION = 30; // ms per frame

export const BookModal: React.FC<BookModalProps> = ({
  isOpen,
  mode: initialMode,
  onClose,
  onOpenProjectDetail,
  onOpenContact,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animState, setAnimState] = useState<'opening' | 'opened' | 'closing'>('opening');
  const [currentTab, setCurrentTab] = useState<'about' | 'works'>(initialMode);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

  const openBookImgRef = useRef<HTMLImageElement | null>(null);
  const closeBookImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentTab(initialMode);
  }, [initialMode]);

  // Preload book sprites
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const openImg = new Image();
      openImg.src = '/books/Open_book.png';
      openBookImgRef.current = openImg;

      const closeImg = new Image();
      closeImg.src = '/books/Close_book.png';
      closeBookImgRef.current = closeImg;
    }
  }, []);

  // Handle Opening / Closing Animation based on animState
  useEffect(() => {
    if (!isOpen) return;

    if (animState === 'opening') {
      let frame = 0;
      let animTimer: any;

      const renderOpenFrame = () => {
        const canvas = canvasRef.current;
        const img = openBookImgRef.current;
        if (!canvas || !img || !img.complete) {
          animTimer = setTimeout(renderOpenFrame, 16);
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setAnimState('opened');
          return;
        }

        ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);

        const col = frame % COLS;
        const row = Math.floor(frame / COLS);
        const sx = col * FRAME_SIZE;
        const sy = row * FRAME_SIZE;

        ctx.drawImage(img, sx, sy, FRAME_SIZE, FRAME_SIZE, 0, 0, FRAME_SIZE, FRAME_SIZE);

        frame++;
        if (frame < TOTAL_FRAMES) {
          animTimer = setTimeout(renderOpenFrame, FRAME_DURATION);
        } else {
          animTimer = setTimeout(() => setAnimState('opened'), 50);
        }
      };

      if (openBookImgRef.current && openBookImgRef.current.complete) {
        renderOpenFrame();
      } else if (openBookImgRef.current) {
        openBookImgRef.current.onload = renderOpenFrame;
      } else {
        setAnimState('opened');
      }

      return () => {
        if (animTimer) clearTimeout(animTimer);
      };
    }

    if (animState === 'closing') {
      let frame = 0;
      let animTimer: any;

      // Guaranteed fallback: close after max 500ms
      const safetyTimer = setTimeout(() => {
        onClose();
      }, 500);

      const renderCloseFrame = () => {
        const canvas = canvasRef.current;
        const img = closeBookImgRef.current;
        if (!canvas || !img || !img.complete) {
          animTimer = setTimeout(renderCloseFrame, 16);
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          onClose();
          return;
        }

        ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);

        const col = frame % COLS;
        const row = Math.floor(frame / COLS);
        const sx = col * FRAME_SIZE;
        const sy = row * FRAME_SIZE;

        ctx.drawImage(img, sx, sy, FRAME_SIZE, FRAME_SIZE, 0, 0, FRAME_SIZE, FRAME_SIZE);

        frame++;
        if (frame < TOTAL_FRAMES) {
          animTimer = setTimeout(renderCloseFrame, FRAME_DURATION);
        } else {
          animTimer = setTimeout(() => {
            onClose();
          }, 50);
        }
      };

      if (closeBookImgRef.current && closeBookImgRef.current.complete) {
        renderCloseFrame();
      } else if (closeBookImgRef.current) {
        closeBookImgRef.current.onload = renderCloseFrame;
      } else {
        onClose();
      }

      return () => {
        if (animTimer) clearTimeout(animTimer);
        clearTimeout(safetyTimer);
      };
    }
  }, [isOpen, animState, onClose]);

  // Trigger Close with Closing Animation
  const handleTriggerClose = () => {
    if (animState === 'closing') return;
    setAnimState('closing');
  };

  // Keyboard shortcut ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleTriggerClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter Projects for Works Mode
  const categories = ['All', 'Web Development', 'Full-stack'];
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p: any) => p.category === selectedCategory || p.tags?.includes(selectedCategory));

  const activeProject = filteredProjects[selectedProjectIndex] || filteredProjects[0] || projectsData[0];

  const skillsList = [
    'TypeScript',
    'Next.js',
    'React',
    'Tailwind CSS',
    'Node.js & Express',
    'PostgreSQL & MongoDB',
    'p5.js & 2D Canvas',
    'REST APIs',
    'Docker & CI/CD',
    'Git & GitHub',
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none font-pixelify">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,155,243,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* 1. Animation Canvas */}
      {animState !== 'opened' && (
        <div className="flex flex-col items-center justify-center">
          <canvas
            ref={canvasRef}
            width={272}
            height={272}
            className="w-56 h-56 sm:w-72 sm:h-72 drop-shadow-2xl"
          />
          <span className="text-xs uppercase tracking-widest text-[#EADBCC] opacity-80 mt-2 animate-pulse">
            {animState === 'opening' ? 'Opening Book...' : 'Closing Book...'}
          </span>
        </div>
      )}

      {/* 2. Responsive Book View */}
      {animState === 'opened' && (
        <>
          {/* ========================================================================= */}
          {/* A. MOBILE RESPONSIVE CARD VIEW (< 640px)                                  */}
          {/* ========================================================================= */}
          <div className="block sm:hidden relative w-full max-w-md bg-[#EFE3C3] border-4 border-[#243C6E] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#241F1A]">
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#E8DAAF] border-b-2 border-[#D6C296]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('about')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${currentTab === 'about'
                      ? 'bg-[#243C6E] text-white shadow-xs'
                      : 'bg-[#FAF5E6] text-[#5C4F41] border border-[#D5C49B]'
                    }`}
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('works')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${currentTab === 'works'
                      ? 'bg-[#243C6E] text-white shadow-xs'
                      : 'bg-[#FAF5E6] text-[#5C4F41] border border-[#D5C49B]'
                    }`}
                >
                  Projects ({projectsData.length})
                </button>
              </div>

              <button
                type="button"
                onClick={handleTriggerClose}
                className="w-7 h-7 rounded-lg bg-[#FAF5E6] border border-[#243C6E] text-[#243C6E] flex items-center justify-center font-bold"
              >
                <XIcon size={14} weight="duotone" />
              </button>
            </div>

            {/* Mobile Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentTab === 'about' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-[#243C6E] text-white flex items-center justify-center font-bold text-xl shrink-0">
                      P
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-[#1F1914]">Paul Peter (Asterixh)</h2>
                      <span className="text-xs text-[#2563EB] font-bold">Fullstack Software Engineer</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4036] leading-relaxed">
                    Software engineer specializing in modern web applications, scalable backend systems, and interactive canvas graphics.
                  </p>

                  <div className="space-y-1.5">
                    <div className="text-xs font-bold uppercase text-[#7A6E5F]">Skills & Tech Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-[#FAF5E6] border border-[#D5C49B] rounded text-[11px] font-bold text-[#3D332A]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleTriggerClose();
                      onOpenContact?.();
                    }}
                    style={{
                      backgroundImage: 'url(/btns/button2_tight.png)',
                      backgroundSize: '100% 100%',
                    }}
                    className="w-full py-2.5 rounded-md text-xs font-extrabold text-[#062c3f] flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Send Message</span>
                    <PaperPlaneTiltIcon size={14} weight="duotone" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSelectedProjectIndex(0);
                        }}
                        className={`px-2 py-1 rounded text-xs font-bold border ${selectedCategory === cat
                            ? 'bg-[#1F1914] text-white border-[#1F1914]'
                            : 'bg-[#FAF5E6] text-[#5C4F41] border-[#D5C49B]'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Selected Project Card */}
                  <div className="p-3 rounded-md bg-[#FAF5E6] border border-[#D5C49B] space-y-2">
                    {activeProject.thumbnail && (
                      <img
                        src={activeProject.thumbnail}
                        alt={activeProject.title}
                        className="w-full h-32 object-cover rounded-lg border border-[#D5C49B]"
                      />
                    )}
                    <h3 className="text-sm font-extrabold text-[#1F1914]">{activeProject.title}</h3>
                    <p className="text-xs text-[#5C4F41] leading-relaxed">{activeProject.excerpt}</p>

                    <div className="flex flex-wrap gap-1">
                      {activeProject.tools?.map((tool: string) => (
                        <span key={tool} className="px-1.5 py-0.5 bg-[#EFE3C3] border border-[#D5C49B] rounded text-[10px] font-bold">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleTriggerClose();
                        onOpenProjectDetail?.(activeProject.slug);
                      }}
                      style={{
                        backgroundImage: 'url(/btns/button1_tight.png)',
                        backgroundSize: '100% 100%',
                      }}
                      className="w-full py-2 rounded-lg text-xs font-bold text-[#f5edf9] flex items-center justify-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ArrowRightIcon size={12} weight="duotone" />
                    </button>
                  </div>

                  {/* Other Projects Quick List */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase text-[#7A6E5F]">All Projects</div>
                    {filteredProjects.map((proj: any, idx: number) => (
                      <button
                        key={proj.slug}
                        type="button"
                        onClick={() => setSelectedProjectIndex(idx)}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${idx === selectedProjectIndex
                            ? 'bg-white border-[#243C6E] ring-1 ring-[#243C6E]'
                            : 'bg-[#FAF5E6] border-[#D5C49B]'
                          }`}
                      >
                        <span className="text-xs font-bold text-[#1F1914] truncate">{proj.title}</span>
                        <ArrowRightIcon size={12} weight="duotone" className="text-[#243C6E]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* B. DESKTOP TWO-PAGE PIXEL SPREAD (>= 640px)                               */}
          {/* ========================================================================= */}
          <div className="hidden sm:block relative w-full max-w-[880px] aspect-[246/183] drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)] animate-in zoom-in-95 duration-200">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: 'url(/books/opened_book_bg.png)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
              }}
            />

            <button
              onClick={handleTriggerClose}
              className="absolute top-2 right-3 w-8 h-8 rounded-full bg-[#1F1914]/90 hover:bg-black border-2 border-[#EADBCC] text-[#EADBCC] hover:text-white flex items-center justify-center shadow-lg transition-all z-40 active:scale-95 cursor-pointer"
              title="Close [ESC]"
            >
              <XIcon size={16} weight="duotone" />
            </button>

            <div className="absolute inset-0 flex text-[#241F1A] px-[7.5%] pt-[8%] pb-[9%]">
              {/* LEFT PAGE (45% width) */}
              <div className="w-[45%] h-full flex flex-col justify-start pr-[2%] overflow-hidden">
                {currentTab === 'about' ? (
                  <div className="h-full flex flex-col justify-between space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-11 rounded-md bg-[#1A1A1A] border-2 border-[#5B9BF3] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                          P
                        </div>
                        <div>
                          <div className="text-[9px] font-bold uppercase tracking-wider text-[#7A6E5F]">
                            Software Engineer
                          </div>
                          <h2 className="text-base md:text-lg font-extrabold text-[#1F1914] leading-tight">
                            Paul Peter
                          </h2>
                          <span className="text-[10px] font-bold text-[#2563EB]">
                            Full-Stack Engineer
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] md:text-[11px] leading-relaxed text-[#4A4036] font-medium">
                        Building responsive web applications, high-performance backends, and interactive 2D web worlds.
                      </p>

                      <div className="p-2.5 rounded-lg bg-[#E2D5B7]/70 border border-[#CBB895] space-y-1">
                        <div className="text-[10px] font-bold text-[#1F1914]">Focus</div>
                        <p className="text-[9px] text-[#5C4F41] leading-tight">
                          Writing clean, maintainable code with strict TypeScript safety, clean UI components, and solid architectures.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-[#CBB895]/80">
                      <div className="p-1.5 bg-[#FAF4E4]/90 rounded border border-[#CBB895] text-center">
                        <span className="block text-xs font-extrabold text-[#1F1914]">Frontend</span>
                        <span className="text-[8px] font-bold text-[#7A6E5F]">Next.js / React</span>
                      </div>
                      <div className="p-1.5 bg-[#FAF4E4]/90 rounded border border-[#CBB895] text-center">
                        <span className="block text-xs font-extrabold text-[#2563EB]">Backend</span>
                        <span className="text-[8px] font-bold text-[#7A6E5F]">Node / SQL</span>
                      </div>
                      <div className="p-1.5 bg-[#FAF4E4]/90 rounded border border-[#CBB895] text-center">
                        <span className="block text-xs font-extrabold text-[#10B981]">Graphics</span>
                        <span className="text-[8px] font-bold text-[#7A6E5F]">Canvas & p5</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-start space-y-1.5">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#7A6E5F]">
                        Directory
                      </div>
                      <h2 className="text-xs sm:text-sm font-extrabold text-[#1F1914]">
                        Projects ({filteredProjects.length})
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedProjectIndex(0);
                          }}
                          className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold transition-all border ${selectedCategory === cat
                              ? 'bg-[#1F1914] text-white border-[#1F1914]'
                              : 'bg-[#FAF4E4]/90 text-[#5C4F41] border-[#CBB895] hover:bg-white'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 pt-1 max-h-[220px]">
                      {filteredProjects.map((proj: any, idx: number) => {
                        const isSelected = idx === selectedProjectIndex;
                        return (
                          <button
                            key={proj.slug}
                            onClick={() => setSelectedProjectIndex(idx)}
                            className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${isSelected
                                ? 'bg-white border-[#2563EB] ring-1 ring-[#2563EB]'
                                : 'bg-[#FAF4E4]/80 border-[#CBB895] hover:bg-white'
                              }`}
                          >
                            <div className="overflow-hidden pr-1">
                              <div className="text-[10px] md:text-xs font-bold text-[#1F1914] truncate">
                                {proj.title}
                              </div>
                              <div className="text-[8.5px] text-[#7A6E5F] truncate">
                                {proj.excerpt}
                              </div>
                            </div>
                            <ArrowRightIcon size={12} weight="duotone" className={isSelected ? 'text-[#2563EB]' : 'text-[#7A6E5F]'} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* BOOK SPINE GUTTER (10% width) */}
              <div className="w-[10%]" />

              {/* RIGHT PAGE (45% width) */}
              <div className="w-[45%] h-full flex flex-col justify-between pl-[2%] overflow-hidden">
                {currentTab === 'about' ? (
                  <>
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-[#1F1914]">
                        Skills & Tools
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {skillsList.map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 bg-[#FAF4E4]/90 border border-[#CBB895] rounded text-[8.5px] font-bold text-[#3D332A]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#E2D5B7]/70 border border-[#CBB895] space-y-1">
                        <div className="text-[10px] font-bold text-[#1F1914]">Engineering Standards</div>
                        <p className="text-[9px] text-[#5C4F41] leading-relaxed">
                          Clean code, modular architecture, responsive designs, and test-driven development.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#CBB895]/80">
                      <button
                        onClick={() => {
                          handleTriggerClose();
                          onOpenContact?.();
                        }}
                        style={{
                          backgroundImage: 'url(/btns/button2_tight.png)',
                          backgroundSize: '100% 100%',
                        }}
                        className="w-full py-2 px-3 rounded-lg text-[#062c3f] font-extrabold text-[10px] flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:brightness-110 active:translate-y-0.5"
                      >
                        <span>Send Message</span>
                        <PaperPlaneTiltIcon size={13} weight="duotone" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="w-full h-28 md:h-32 rounded-lg overflow-hidden bg-[#1F1914] border border-[#CBB895] relative">
                        {activeProject.thumbnail ? (
                          <img
                            src={activeProject.thumbnail}
                            alt={activeProject.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#7A6E5F]">
                            <CodeIcon size={24} weight="duotone" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xs md:text-sm font-extrabold text-[#1F1914] truncate">
                          {activeProject.title}
                        </h3>
                        <p className="text-[9px] text-[#5C4F41] mt-0.5 line-clamp-2">
                          {activeProject.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {activeProject.tools?.slice(0, 4).map((tool: string) => (
                          <span
                            key={tool}
                            className="px-1.5 py-0.5 rounded bg-[#FAF4E4]/90 border border-[#CBB895] text-[8.5px] font-bold text-[#3D332A]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#CBB895]/80">
                      <button
                        onClick={() => {
                          handleTriggerClose();
                          onOpenProjectDetail?.(activeProject.slug);
                        }}
                        style={{
                          backgroundImage: 'url(/btns/button1_tight.png)',
                          backgroundSize: '100% 100%',
                        }}
                        className="w-full py-2 px-3 rounded-lg text-[#f5edf9] font-bold text-[10px] flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 active:translate-y-0.5"
                      >
                        <span>View Project Details</span>
                        <ArrowRightIcon size={12} weight="duotone" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

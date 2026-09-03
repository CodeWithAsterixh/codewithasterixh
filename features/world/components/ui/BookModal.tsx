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
import profileData from '@/data/profile.json';
import techStackData from '@/data/tech-stack.json';

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
    if (isOpen) {
      setAnimState('opening');
      setCurrentTab(initialMode);
    }
  }, [isOpen, initialMode]);

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

  const skillsList = Array.from(
    new Set([
      ...(techStackData.Technical?.map((s) => s.name) || []),
      ...(techStackData["Creative & UI"]?.map((s) => s.name) || []),
      ...(techStackData["Other Skills"]?.map((s) => s.name) || []),
      ...(profileData.hero?.badges?.flatMap((b: any) => b.items) || []),
    ])
  );

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
          <div
            style={{
              clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
            }}
            className="block sm:hidden relative w-full max-w-md bg-[#EFE3C3] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh] text-[#241F1A]"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#E8DAAF] border-b-2 border-black">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('about')}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className={`px-3 py-1 text-xs font-black uppercase transition-all border-2 border-black ${currentTab === 'about'
                    ? 'bg-[#243C6E] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-[#FAF5E6] text-[#5C4F41]'
                    }`}
                >
                  About
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('works')}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className={`px-3 py-1 text-xs font-black uppercase transition-all border-2 border-black ${currentTab === 'works'
                    ? 'bg-[#243C6E] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                    : 'bg-[#FAF5E6] text-[#5C4F41]'
                    }`}
                >
                  Projects ({projectsData.length})
                </button>
              </div>

              <button
                type="button"
                onClick={handleTriggerClose}
                style={{
                  clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                }}
                className="w-7 h-7 bg-[#FAF5E6] hover:bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#1F1914] flex items-center justify-center font-bold"
              >
                <XIcon size={14} weight="bold" />
              </button>
            </div>

            {/* Mobile Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentTab === 'about' ? (
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                      }}
                      className="w-12 h-12 bg-[#243C6E] text-white flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] overflow-hidden"
                    >
                      <img
                        src={profileData.images.about.src || '/images/profile/about.png'}
                        alt={profileData.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-[#1F1914]">{profileData.name} ({profileData.alias})</h2>
                      <span className="text-xs text-[#2563EB] font-bold">{profileData.role}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4036] leading-relaxed">
                    {profileData.subtext}
                  </p>

                  {/* Stats Tiles */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {profileData.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className="p-1.5 bg-[#FAF5E6] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] text-center"
                      >
                        <span className={`block text-xs font-black ${idx === 0 ? 'text-[#1F1914]' : idx === 1 ? 'text-[#2563EB]' : 'text-[#10B981]'}`}>
                          {stat.value}
                        </span>
                        <span className="text-[8px] font-bold text-[#7A6E5F] block whitespace-pre-line leading-tight">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs font-bold uppercase text-[#7A6E5F]">Tech Stack & Tools ({skillsList.length})</div>
                    <div className="flex flex-wrap gap-1 h-fit">
                      {skillsList.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                          }}
                          className="px-2 py-0.5 bg-[#FAF5E6] border border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-[10px] font-mono font-bold text-[#3D332A]"
                        >
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
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                    className="w-full py-2.5 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] text-xs font-black uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
                  >
                    <span>{profileData.hero?.secondaryCta?.label || 'Send Message'}</span>
                    <PaperPlaneTiltIcon size={14} weight="bold" />
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
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className={`px-2 py-1 text-xs font-black uppercase border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,1)] ${selectedCategory === cat
                          ? 'bg-[#1F1914] text-white'
                          : 'bg-[#FAF5E6] text-[#5C4F41]'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Selected Project Card */}
                  <div
                    style={{
                      clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                    }}
                    className="p-3 bg-[#FAF5E6] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-2"
                  >
                    {activeProject.thumbnail && (
                      <img
                        src={activeProject.thumbnail}
                        alt={activeProject.title}
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className="w-full h-32 object-cover border-2 border-black"
                      />
                    )}
                    <h3 className="text-sm font-extrabold text-[#1F1914]">{activeProject.title}</h3>
                    <p className="text-xs text-[#5C4F41] leading-relaxed">{activeProject.excerpt}</p>

                    <div className="flex flex-wrap gap-1">
                      {activeProject.tools?.map((tool: string) => (
                        <span
                          key={tool}
                          style={{
                            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                          }}
                          className="px-1.5 py-0.5 bg-[#EFE3C3] border border-black text-[10px] font-bold"
                        >
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
                        clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                      }}
                      className="w-full py-2 bg-[#243C6E] hover:bg-[#2F4E8F] text-white text-xs font-black uppercase flex items-center justify-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRightIcon size={12} weight="bold" />
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
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className={`w-full text-left p-2 border-2 border-black transition-all flex items-center justify-between cursor-pointer ${idx === selectedProjectIndex
                          ? 'bg-white shadow-[2px_2px_0px_#243C6E]'
                          : 'bg-[#FAF5E6] shadow-[1px_1px_0_rgba(0,0,0,0.5)]'
                          }`}
                      >
                        <span className="text-xs font-bold text-[#1F1914] truncate">{proj.title}</span>
                        <ArrowRightIcon size={12} weight="bold" className="text-[#243C6E]" />
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
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className="absolute top-2 right-3 w-8 h-8 bg-[#1F1914] hover:bg-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#EADBCC] hover:text-white flex items-center justify-center transition-all z-40 active:translate-x-px active:translate-y-px cursor-pointer"
              title="Close [ESC]"
            >
              <XIcon size={16} weight="bold" />
            </button>

            <div className="absolute inset-0 flex text-[#241F1A] px-[7.5%] pt-[8%] pb-[9%]">
              {/* LEFT PAGE (45% width) */}
              <div className="w-[45%] h-full flex flex-col justify-start pr-[2%] overflow-hidden">
                {currentTab === 'about' ? (
                  <div className="h-full flex flex-col justify-between space-y-2">
                    <div className="space-y-2 flex flex-col items-center text-center">
                      {/* Large image at top */}
                      <div
                        style={{
                          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                        }}
                        className="w-fit max-w-md h-auto aspect-square overflow-hidden shrink-0"
                      >
                        <img
                          src={profileData.images.about.src || '/images/profile/about.png'}
                          alt={profileData.name}
                          className="w-full h-auto max-h-32 object-contain object-center"
                        />
                      </div>

                      {/* Name / Role / Handle */}
                      <div>
                        <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#7A6E5F]">
                          {profileData.role}
                        </div>
                        <h2 className="text-sm md:text-base font-extrabold text-[#1F1914] leading-tight">
                          {profileData.name}
                        </h2>
                        <span className="text-[9.5px] font-bold text-[#2563EB]">
                          {profileData.handle} • {profileData.about.badgeLabel}
                        </span>
                      </div>

                      <p className="text-[9px] md:text-[10px] leading-relaxed text-[#4A4036] font-medium line-clamp-3">
                        {profileData.subtext}
                      </p>

                      <div
                        style={{
                          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                        }}
                        className="p-2 bg-[#E2D5B7] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.6)] space-y-0.5"
                      >
                        <div className="text-[9.5px] font-bold text-[#1F1914] uppercase">Mission & Focus</div>
                        <p className="text-[8px] text-[#5C4F41] leading-tight italic">
                          &ldquo;{profileData.hero.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Stats Metrics from profile.json */}
                    <div className="grid grid-cols-3 gap-1 pt-1.5 border-t-2 border-black">
                      {profileData.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          style={{
                            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                          }}
                          className="p-1 bg-[#FAF4E4] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] text-center flex flex-col justify-center"
                        >
                          <span className={`block text-xs font-black ${idx === 0 ? 'text-[#1F1914]' : idx === 1 ? 'text-[#2563EB]' : 'text-[#10B981]'}`}>
                            {stat.value}
                          </span>
                          <span className="text-[7.5px] font-bold text-[#7A6E5F] leading-tight block whitespace-pre-line">
                            {stat.label}
                          </span>
                        </div>
                      ))}
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
                          style={{
                            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                          }}
                          className={`px-2 py-1 text-[9px] font-black uppercase transition-all border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,1)] ${selectedCategory === cat
                            ? 'bg-[#1F1914] text-white'
                            : 'bg-[#FAF4E4] text-[#5C4F41]'
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
                            style={{
                              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                            }}
                            className={`w-full text-left p-2 border-2 border-black transition-all flex items-center justify-between cursor-pointer ${isSelected
                              ? 'bg-white shadow-[2px_2px_0px_#243C6E]'
                              : 'bg-[#FAF4E4] shadow-[1px_1px_0_rgba(0,0,0,0.5)]'
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
                            <ArrowRightIcon size={12} weight="bold" className={isSelected ? 'text-[#243C6E]' : 'text-[#7A6E5F]'} />
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
              <div className="w-[45%] h-full flex flex-col pl-[2%] overflow-hidden">
                {currentTab === 'about' ? (
                  <div className="h-full flex flex-col">
                    <div className="text-[10px] font-bold text-[#1F1914] uppercase tracking-wider mb-1.5">
                      Tech Stack & Tools ({skillsList.length})
                    </div>

                    {/* Tags — fill all available height, scroll only if necessary */}
                    <div className="flex-1 overflow-y-auto pr-0.5 mb-2">
                      <div className="flex flex-wrap gap-1 content-start">
                        {skillsList.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                            }}
                            className="px-1.5 py-0.5 bg-[#FAF4E4] border border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-[8.5px] font-mono font-bold text-[#1F1914]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                      }}
                      className="p-2 bg-[#E2D5B7] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.6)] space-y-0.5 shrink-0 mb-2"
                    >
                      <div className="text-[9.5px] font-bold text-[#1F1914] uppercase">Standards & Contact</div>
                      <p className="text-[8.5px] text-[#5C4F41] leading-tight">
                        📍 {profileData.location} &bull; ✉️ {profileData.email}
                      </p>
                      <p className="text-[8px] text-[#7A6E5F] leading-tight">
                        Clean code, modular architecture, responsive designs, and test-driven development.
                      </p>
                    </div>

                    <div className="pt-2 border-t-2 border-black shrink-0">
                      <button
                        onClick={() => {
                          handleTriggerClose();
                          onOpenContact?.();
                        }}
                        style={{
                          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                        }}
                        className="w-full py-2.5 px-3 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] text-xs font-black uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
                      >
                        <span>{profileData.hero?.secondaryCta?.label || 'Send Message'}</span>
                        <PaperPlaneTiltIcon size={14} weight="bold" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div
                        style={{
                          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                        }}
                        className="w-full h-28 md:h-32 overflow-hidden bg-[#1F1914] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.6)] relative"
                      >
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
                            style={{
                              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                            }}
                            className="px-2 py-0.5 bg-[#FAF4E4] border border-black text-[8.5px] font-mono font-bold text-[#1F1914]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t-2 border-black">
                      <button
                        onClick={() => {
                          handleTriggerClose();
                          onOpenProjectDetail?.(activeProject.slug);
                        }}
                        style={{
                          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                        }}
                        className="w-full py-2 px-3 bg-[#243C6E] hover:bg-[#2F4E8F] text-white font-black uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
                      >
                        <span>View Project Details</span>
                        <ArrowRightIcon size={12} weight="bold" />
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

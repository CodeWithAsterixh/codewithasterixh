'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import profileData from '@/data/profile.json';

interface WorldLoadingScreenProps {
  isReady?: boolean;
  onStart?: () => void;
}

export const WorldLoadingScreen: React.FC<WorldLoadingScreenProps> = ({
  isReady = true,
  onStart,
}) => {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(profileData.images.about.src || '/images/me.png');
  const [isMobileSocialOpen, setIsMobileSocialOpen] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Scroll and motion targets
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Enter button anchors & deltas
  const buttonAnchorRef = useRef<HTMLDivElement>(null);
  const targetSlotRef = useRef<HTMLDivElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  // Resume button anchors & deltas
  const resumeAnchorRef = useRef<HTMLDivElement>(null);
  const resumeTargetSlotRef = useRef<HTMLDivElement>(null);
  const [resumeDelta, setResumeDelta] = useState({ x: 0, y: 0 });

  // Desktop Social buttons anchors & deltas
  const desktopSocialsAnchorRef = useRef<HTMLDivElement>(null);
  const desktopSocialsTargetRef = useRef<HTMLDivElement>(null);
  const [desktopSocialsDelta, setDesktopSocialsDelta] = useState({ x: 0, y: 0 });

  // Prepare about content with real newlines from profile.json
  const rawAbout = profileData.about?.content || '';
  const normalizedAbout = rawAbout.replace(/\\n/g, '\n');
  const [charCount, setCharCount] = useState(0);

  // Parallax sticky scroll progress across 1 screen height of scrollable distance
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  // Butter-smooth physics spring for sticky parallax feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Stream characters for typewriter/cursor effect as scroll progresses
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const start = 0.12;
    const end = 0.95;
    if (latest <= start) {
      setCharCount(0);
    } else if (latest >= end) {
      setCharCount(normalizedAbout.length);
    } else {
      const ratio = (latest - start) / (end - start);
      setCharCount(Math.round(ratio * normalizedAbout.length));
    }
  });

  // Calculate dynamic deltas for buttons & desktop socials to dock at bottom
  useEffect(() => {
    const updateDeltas = () => {
      if (buttonAnchorRef.current && targetSlotRef.current) {
        const anchorRect = buttonAnchorRef.current.getBoundingClientRect();
        const targetRect = targetSlotRef.current.getBoundingClientRect();
        setDelta({
          x: targetRect.left - anchorRect.left,
          y: targetRect.top - anchorRect.top,
        });
      }
      if (resumeAnchorRef.current && resumeTargetSlotRef.current) {
        const resumeAnchorRect = resumeAnchorRef.current.getBoundingClientRect();
        const resumeTargetRect = resumeTargetSlotRef.current.getBoundingClientRect();
        setResumeDelta({
          x: resumeTargetRect.left - resumeAnchorRect.left,
          y: resumeTargetRect.top - resumeAnchorRect.top,
        });
      }
      if (desktopSocialsAnchorRef.current && desktopSocialsTargetRef.current) {
        const socialsAnchorRect = desktopSocialsAnchorRef.current.getBoundingClientRect();
        const socialsTargetRect = desktopSocialsTargetRef.current.getBoundingClientRect();
        setDesktopSocialsDelta({
          x: socialsTargetRect.left - socialsAnchorRect.left,
          y: socialsTargetRect.top - socialsAnchorRect.top,
        });
      }
    };

    updateDeltas();
    const rafId = requestAnimationFrame(updateDeltas);
    const timeoutId = setTimeout(updateDeltas, 150);
    window.addEventListener('resize', updateDeltas);
    window.addEventListener('load', updateDeltas);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDeltas);
      window.removeEventListener('load', updateDeltas);
    };
  }, [isReady]);

  // Motion transforms for ENTER WORLD button
  const buttonX = useTransform(smoothProgress, (p) => p * delta.x);
  const buttonY = useTransform(smoothProgress, (p) => p * delta.y);
  const buttonRotateZ = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0, -3, 1.5, 0]);
  const buttonRotateX = useTransform(smoothProgress, [0, 0.5, 1], [0, 15, 0]);
  const buttonScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.04, 1]);
  const buttonShadow = useTransform(smoothProgress, [0, 0.5, 1], [
    '4px 4px 0px #3E2B1D',
    '10px 12px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
  ]);

  // Animated text shortening: "ENTER MY WORLD" -> "ENTER WORLD"
  const myWordWidth = useTransform(smoothProgress, [0, 0.22], ['1.8ch', '0ch']);
  const myWordOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  // Motion transforms for SEE RESUME button (moves beside ENTER WORLD at bottom)
  const resumeX = useTransform(smoothProgress, (p) => p * resumeDelta.x);
  const resumeY = useTransform(smoothProgress, (p) => p * resumeDelta.y);
  const resumeRotateZ = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0, 3, -1.5, 0]);
  const resumeRotateX = useTransform(smoothProgress, [0, 0.5, 1], [0, 15, 0]);
  const resumeScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.04, 1]);
  const resumeShadow = useTransform(smoothProgress, [0, 0.5, 1], [
    '3px 3px 0px #3E2B1D',
    '10px 12px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
  ]);

  // Motion transforms for Desktop Social buttons (moves to bottom bar beside email)
  const desktopSocialsX = useTransform(smoothProgress, (p) => p * desktopSocialsDelta.x);
  const desktopSocialsY = useTransform(smoothProgress, (p) => p * desktopSocialsDelta.y);
  const desktopSocialsRotateZ = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0, -2, 1, 0]);

  // Mobile Social Hub icon on left edge of screen on scroll
  const mobileSocialOpacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const mobileSocialX = useTransform(smoothProgress, [0.1, 0.25], [-35, 0]);
  const mobileSocialScale = useTransform(smoothProgress, [0.1, 0.25], [0.8, 1]);
  const mobileSocialPointerEvents = useTransform(smoothProgress, (p) => (p > 0.15 ? 'auto' : 'none'));

  // Transition between Initial Overview and About Info Panel
  const initialOverviewOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const initialOverviewY = useTransform(smoothProgress, [0, 0.18], [0, -10]);
  const initialPointerEvents = useTransform(smoothProgress, (p) => (p > 0.15 ? 'none' : 'auto'));

  const aboutPanelOpacity = useTransform(smoothProgress, [0.12, 0.28], [0, 1]);
  const aboutPanelY = useTransform(smoothProgress, [0.12, 0.28], [14, 0]);
  const aboutPointerEvents = useTransform(smoothProgress, (p) => (p > 0.15 ? 'auto' : 'none'));

  // Bottom prompt text fades out smoothly as buttons travel down to take its place
  const promptOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const promptY = useTransform(smoothProgress, [0, 0.35], [0, 8]);

  // Split revealed text into paragraphs
  const displayedText = normalizedAbout.slice(0, charCount);
  const paragraphs = displayedText.split('\n\n');

  // Web Audio synth for ambient retro sound effects
  const playRetroSoundEffect = (type: 'start' | 'click') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'start') {
        [261.63, 329.63, 392.0, 523.25].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.06 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
        });
      }
    } catch (e) {}
  };

  const toggleSound = () => {
    const nextSoundState = !isSoundOn;
    setIsSoundOn(nextSoundState);
    if (nextSoundState) {
      playRetroSoundEffect('click');
    }
  };

  const handlePlayClick = () => {
    if (isSoundOn) {
      playRetroSoundEffect('start');
    }
    if (onStart) {
      onStart();
    }
  };

  const handleImgError = () => {
    setImgSrc((prev: string) => (prev.includes('me.png') ? '/images/my-photo.png' : '/images/profile/about.png'));
  };

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#F4EADA] text-[#3E2B1D] font-pixelify select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* Scroll track (200vh tall = 1 screen height of scrollable distance) */}
      <div className="relative w-full h-[200vh]">
        {/* Sticky viewport frame: perfectly fitted to mobile & desktop viewports */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 overflow-hidden pointer-events-auto">
          {/* Subtle Grid / Texture Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#3E2B1D 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Sticky Parallax Scroll Progress Bar at very top */}
          <motion.div
            style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
            className="absolute top-0 left-0 right-0 h-1 bg-[#C84B31] z-50 shadow-[0_1px_0_#3E2B1D]"
          />

          {/* Top Header Bar (Fixed at top of screen) */}
          <div className="relative z-20 w-full max-w-6xl flex items-center justify-between pt-1 md:pt-2">
            {/* Location Badge */}
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[#EADBCC] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-current text-[#C84B31]" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                <path d="M6 1h4v1h2v2h1v4h-1v2h-2v2h-1v2H7v-2H6v-2H4V8H3V4h1V2h2V1zm1 3v3h2V4H7z" />
              </svg>
              <span>{profileData.location}</span>
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              {isSoundOn ? (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#3E2B1D] fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                  <path d="M2 5h2v6H2zM5 3h2v10H5zM8 1h2v14H8zM12 4h1v8h-1zM14 6h1v4h-1z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#3E2B1D] fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                  <path d="M2 5h2v6H2zM5 3h2v10H5zM8 1h2v14H8zM11 5l4 6M15 5l-4 6" />
                </svg>
              )}
              <span className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
                {isSoundOn ? 'SOUND ON' : 'MUTED'}
              </span>
            </button>
          </div>

          {/* Main Side-by-Side Layout Container */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 lg:gap-12 items-center justify-center my-auto max-w-6xl w-full py-1 sm:py-2 md:py-6">
            {/* Left Column: Fixed / Static Profile Picture Frame */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-[110px] sm:max-w-[150px] md:max-w-[340px] lg:max-w-[380px]">
                {/* Retro Pixel Picture Frame */}
                <div className="relative w-full aspect-square border-2 sm:border-3 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] bg-[#EADBCC] overflow-hidden flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={profileData.name}
                    onError={handleImgError}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Handle Badge Overlay */}
                <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-3 sm:py-1 md:px-5 md:py-1.5 bg-[#D4A373] text-[#F4EADA] text-[9px] sm:text-[10px] md:text-sm font-black tracking-widest uppercase border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] whitespace-nowrap">
                  {profileData.handle}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Area that reveals About Info with Typewriter Animation on Scroll */}
            <div className="md:col-span-7 relative w-full flex flex-col items-center md:items-start text-center md:text-left min-h-[290px] sm:min-h-[350px] md:min-h-[440px] justify-center">
              {/* LAYER 1: Initial Intro / Stats / Resume / Socials (Elements smoothly fade out on scroll) */}
              <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-1.5 sm:gap-2.5 md:gap-5">
                {/* Header Title & Role */}
                <motion.div
                  style={{ opacity: initialOverviewOpacity, y: initialOverviewY, pointerEvents: initialPointerEvents }}
                  className="flex flex-col gap-0.5 md:gap-1.5"
                >
                  <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-wider text-[#3E2B1D] uppercase drop-shadow-[2px_2px_0px_#D4A373] md:drop-shadow-[3px_3px_0px_#D4A373]">
                    {profileData.name.toUpperCase()}
                  </h1>
                  <p className="text-[10px] sm:text-xs md:text-base font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
                    {profileData.role}
                  </p>
                </motion.div>

                {/* Bio Subtext */}
                <motion.p
                  style={{ opacity: initialOverviewOpacity, y: initialOverviewY, pointerEvents: initialPointerEvents }}
                  className="text-[11px] sm:text-xs md:text-base text-[#4A3728] font-mono leading-snug md:leading-relaxed max-w-xl font-medium line-clamp-2 sm:line-clamp-3 md:line-clamp-none"
                >
                  {profileData.subtext}
                </motion.p>

                {/* Quick Stats Grid */}
                <motion.div
                  style={{ opacity: initialOverviewOpacity, y: initialOverviewY, pointerEvents: initialPointerEvents }}
                  className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3 my-0.5 sm:my-1"
                >
                  {profileData.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3.5 md:py-2 bg-[#EADBCC] border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D]"
                    >
                      <span className="text-[11px] sm:text-xs md:text-base font-black text-[#C84B31] font-mono">{stat.value}</span>
                      <span className="text-[8px] sm:text-[10px] md:text-xs font-extrabold text-[#3E2B1D] uppercase font-mono leading-tight">
                        {stat.label.replace('\n', ' ')}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 md:gap-4 mt-0.5 sm:mt-1 md:mt-2 w-full">
                  {/* ENTER WORLD BUTTON (Directly anchored, flies down to bottom dock without fading) */}
                  <div ref={buttonAnchorRef} className="relative inline-block">
                    {isReady ? (
                      <motion.button
                        onClick={handlePlayClick}
                        style={{
                          x: buttonX,
                          y: buttonY,
                          rotateZ: buttonRotateZ,
                          rotateX: buttonRotateX,
                          scale: buttonScale,
                          boxShadow: buttonShadow,
                          transformPerspective: 1000,
                        }}
                        className="group relative z-40 inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] text-[#F4EADA] font-black text-xs sm:text-sm md:text-xl lg:text-2xl tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors cursor-pointer select-none whitespace-nowrap"
                        title="Enter World"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#F4EADA] fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                          <path d="M4 2v12l10-6z" />
                        </svg>
                        <span className="flex items-center">
                          <span>ENTER&nbsp;</span>
                          <motion.span
                            style={{
                              width: myWordWidth,
                              opacity: myWordOpacity,
                              display: 'inline-block',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            MY&nbsp;
                          </motion.span>
                          <span>WORLD</span>
                        </span>
                      </motion.button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-[#C8B8A6] text-[#7C6A5A] font-black text-xs sm:text-sm md:text-xl tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] cursor-not-allowed opacity-80 whitespace-nowrap"
                      >
                        LOADING WORLD...
                      </button>
                    )}
                  </div>

                  {/* SEE RESUME BUTTON (Directly anchored, flies beside ENTER WORLD to bottom dock) */}
                  <div ref={resumeAnchorRef} className="relative inline-block">
                    <motion.a
                      href="/resume/peterpaulresume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => isSoundOn && playRetroSoundEffect('click')}
                      style={{
                        x: resumeX,
                        y: resumeY,
                        rotateZ: resumeRotateZ,
                        rotateX: resumeRotateX,
                        scale: resumeScale,
                        boxShadow: resumeShadow,
                        transformPerspective: 1000,
                      }}
                      className="group relative z-40 inline-flex items-center gap-1.5 md:gap-2.5 px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 bg-[#EADBCC] hover:bg-[#D8C2AA] text-[#3E2B1D] font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors cursor-pointer select-none whitespace-nowrap font-mono"
                      title="See Resume"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current text-[#3E2B1D]" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                      </svg>
                      SEE RESUME
                    </motion.a>
                  </div>
                </div>

                {/* Social Links on Desktop (Anchor that flies to bottom bar beside email) */}
                <div ref={desktopSocialsAnchorRef} className="hidden md:inline-block relative mt-1">
                  <motion.div
                    style={{
                      x: desktopSocialsX,
                      y: desktopSocialsY,
                      rotateZ: desktopSocialsRotateZ,
                      transformPerspective: 1000,
                    }}
                    className="group relative z-40 inline-flex items-center gap-2.5"
                  >
                    {profileData.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => isSoundOn && playRetroSoundEffect('click')}
                        title={social.icon.toUpperCase()}
                        className="p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D] flex items-center justify-center cursor-pointer"
                      >
                        {social.icon === 'github' && (
                          <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        )}
                        {social.icon === 'linkedin' && (
                          <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {social.icon === 'twitter' && (
                          <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                      </a>
                    ))}

                    {/* Email Icon Button on desktop */}
                    <a
                      href={`mailto:${profileData.email}`}
                      onClick={() => isSoundOn && playRetroSoundEffect('click')}
                      title="EMAIL"
                      className="p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D] flex items-center justify-center cursor-pointer"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </motion.div>
                </div>

                {/* Social Links on Mobile (Initial static overview buttons, fade with initialOverviewOpacity) */}
                <motion.div
                  style={{ opacity: initialOverviewOpacity, y: initialOverviewY, pointerEvents: initialPointerEvents }}
                  className="flex md:hidden items-center justify-center gap-2 mt-0.5"
                >
                  {profileData.socials.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => isSoundOn && playRetroSoundEffect('click')}
                      title={social.icon.toUpperCase()}
                      className="p-1.5 sm:p-2 bg-[#EADBCC] hover:bg-[#D8C2AA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D]"
                    >
                      {social.icon === 'github' && (
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      )}
                      {social.icon === 'linkedin' && (
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                      {social.icon === 'twitter' && (
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )}
                    </a>
                  ))}

                  {/* Mobile Email icon button */}
                  <a
                    href={`mailto:${profileData.email}`}
                    onClick={() => isSoundOn && playRetroSoundEffect('click')}
                    title="EMAIL"
                    className="p-1.5 sm:p-2 bg-[#EADBCC] hover:bg-[#D8C2AA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D]"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* LAYER 2: About Panel (Reveals simultaneously with scroll-driven typewriter/cursor writing) */}
              <motion.div
                style={{
                  opacity: aboutPanelOpacity,
                  y: aboutPanelY,
                  pointerEvents: aboutPointerEvents,
                }}
                className="absolute inset-0 w-full flex flex-col justify-center z-20"
              >
                <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
                  {/* Retro Window Header */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#C84B31] border border-[#3E2B1D] animate-pulse" />
                      <span>ABOUT // {profileData.alias || profileData.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-[9px] bg-[#EADBCC] px-2 py-0.5 border border-[#3E2B1D]">
                        {profileData.about?.badgeLabel || 'FULLSTACK ENGINEER'}
                      </span>
                      <span className="text-[9px] text-[#3E2B1D]/80">SYS:ONLINE</span>
                    </div>
                  </div>

                  {/* Terminal Typewriter Content with Blinking Cursor */}
                  <div className="p-2.5 sm:p-4 md:p-5 font-mono text-[10px] sm:text-xs md:text-sm text-[#3E2B1D] leading-relaxed max-h-[190px] sm:max-h-[260px] md:max-h-[340px] overflow-y-auto [&::-webkit-scrollbar]:hidden select-text">
                    {paragraphs.map((para, idx) => (
                      <p key={idx} className="mb-2 md:mb-3 last:mb-0">
                        {para}
                        {idx === paragraphs.length - 1 && (
                          <span className="inline-block ml-0.5 text-[#C84B31] font-black animate-pulse">
                            ▌
                          </span>
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Retro Status Footer */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
                    <span>CHARS REVEALED: {charCount}/{normalizedAbout.length}</span>
                    <span className="uppercase font-bold">
                      {charCount >= normalizedAbout.length ? '● STORY COMPLETE' : '▼ SCROLL TO REVEAL MORE'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer Bottom Bar (Fixed at bottom of screen) */}
          <div className="relative z-20 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-mono font-bold text-[#8C6D53] border-t border-[#3E2B1D]/20 md:border-t-2 pt-1.5 sm:pt-2 md:pt-3">
            {/* Target Dock Slots for both ENTER WORLD and SEE RESUME buttons side-by-side */}
            <div className="relative flex items-center gap-2 sm:gap-3">
              {/* Dock Slot 1: ENTER WORLD */}
              <div ref={targetSlotRef} className="relative flex items-center">
                {/* Invisible footprint matching exact docked dimensions of ENTER WORLD */}
                <div className="invisible pointer-events-none inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 font-black text-xs sm:text-sm md:text-xl lg:text-2xl tracking-wider md:tracking-widest uppercase border-2 md:border-4 select-none whitespace-nowrap">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                    <path d="M4 2v12l10-6z" />
                  </svg>
                  <span>ENTER WORLD</span>
                </div>
              </div>

              {/* Dock Slot 2: SEE RESUME */}
              <div ref={resumeTargetSlotRef} className="relative flex items-center">
                {/* Invisible footprint matching exact docked dimensions of SEE RESUME */}
                <div className="invisible pointer-events-none inline-flex items-center gap-1.5 md:gap-2.5 px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 select-none whitespace-nowrap font-mono">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                  <span>SEE RESUME</span>
                </div>
              </div>

              {/* Initial prompt that smoothly fades out as buttons travel down */}
              <motion.div
                style={{ opacity: promptOpacity, y: promptY }}
                className="absolute left-0 flex items-center gap-1.5 sm:gap-2 pointer-events-none whitespace-nowrap"
              >
                <span>CLICK ENTER MY WORLD TO START</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] md:text-[11px] px-1.5 py-0.5 bg-[#EADBCC] border border-[#3E2B1D] text-[#8C6D53] uppercase font-bold animate-pulse">
                  <span>SCROLL DOWN</span>
                  <svg className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                    <path d="M7 2h2v7h2V8h1v1h-1v1h-1v1h-1v1H8v1H7v-1H6v-1H5v-1H4V9h1V8h2v1h2V2z" />
                  </svg>
                </span>
              </motion.div>
            </div>

            {/* Right Side: Desktop Socials Dock Slot + Email */}
            <div className="flex items-center gap-3">
              {/* Dock Slot 3: Desktop Flying Socials dock beside email */}
              <div ref={desktopSocialsTargetRef} className="hidden md:flex items-center gap-2.5">
                {profileData.socials.map((_, i) => (
                  <div
                    key={i}
                    className="invisible pointer-events-none p-2.5 border-2 border-transparent flex items-center justify-center"
                  >
                    <div className="w-4.5 h-4.5" />
                  </div>
                ))}
                {/* Email icon button footprint */}
                <div className="invisible pointer-events-none p-2.5 border-2 border-transparent flex items-center justify-center">
                  <div className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Email */}
              <span className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current text-[#8C6D53]" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                  <path d="M1 3h14v10H1V3zm2 2v1h2v1h2v1h2V7h2V6h2V5H3zm0 6h10V7h-2v1h-2v1H7V8H5V7H3v4z" />
                </svg>
                {profileData.email}
              </span>
            </div>
          </div>

          {/* MOBILE SOCIAL HUB (Fixed on left edge on mobile when scrolled, opens 1-col flyout) */}
          <motion.div
            style={{
              opacity: mobileSocialOpacity,
              x: mobileSocialX,
              scale: mobileSocialScale,
              pointerEvents: mobileSocialPointerEvents,
            }}
            className="md:hidden fixed left-2.5 top-1/2 -translate-y-1/2 z-50 flex items-center"
            onMouseEnter={() => setIsMobileSocialOpen(true)}
            onMouseLeave={() => setIsMobileSocialOpen(false)}
          >
            <div className="relative">
              {/* Mobile Hub Icon Button */}
              <button
                onClick={() => {
                  setIsMobileSocialOpen((prev) => !prev);
                  if (isSoundOn) playRetroSoundEffect('click');
                }}
                className="p-2 sm:p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] active:bg-[#C8B8A6] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] text-[#3E2B1D] flex items-center justify-center cursor-pointer transition-transform active:translate-y-0.5"
                title="Social Links"
                aria-label="Open Social Links"
              >
                {/* Pixelated Hub / Connect Icon */}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#C84B31]" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                  <path d="M11 1h4v4h-4V1zM1 6h4v4H1V6zm10 5h4v4h-4v-4zM5 7h6v2H5V7zm5-4v10h1V3h-1z" />
                </svg>
              </button>

              {/* 1-Column Vertical Popout Stack of Social Links */}
              <AnimatePresence>
                {isMobileSocialOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-1.5 bg-[#EADBCC] border-2 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] z-50"
                  >
                    {profileData.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => isSoundOn && playRetroSoundEffect('click')}
                        title={social.icon.toUpperCase()}
                        className="p-2 bg-[#F4EADA] hover:bg-[#D8C2AA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] text-[#3E2B1D] flex items-center justify-center transition-transform active:scale-95"
                      >
                        {social.icon === 'github' && (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        )}
                        {social.icon === 'linkedin' && (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {social.icon === 'twitter' && (
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                      </a>
                    ))}

                    {/* Email icon button */}
                    <a
                      href={`mailto:${profileData.email}`}
                      onClick={() => isSoundOn && playRetroSoundEffect('click')}
                      title="EMAIL"
                      className="p-2 bg-[#F4EADA] hover:bg-[#D8C2AA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] text-[#3E2B1D] flex items-center justify-center transition-transform active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  PlayIcon,
  SpinnerIcon,
  FilePdfIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  EnvelopeSimpleIcon,
  ArrowSquareOutIcon,
  ArrowUpRightIcon,
  StarIcon,
  ArrowFatUpIcon,
  CaretLeftIcon,
  CaretRightIcon,
  PaperPlaneTiltIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  CheckIcon,
} from '@phosphor-icons/react';
import profileData from '@/data/profile.json';
import servicesData from '@/data/services.json';
import experienceData from '@/data/experience.json';
import techStackData from '@/data/tech-stack.json';
import projectsData from '@/data/projects.json';
import { TechIcon } from '@/components/ui/TechIcon';

interface WorldLoadingScreenProps {
  isReady?: boolean;
  isLoading?: boolean;
  onStart?: () => void;
}

export const WorldLoadingScreen: React.FC<WorldLoadingScreenProps> = ({
  isReady = true,
  isLoading = false,
  onStart,
}) => {
  const isWorldCurrentlyLoading = Boolean(isLoading);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const [activeExpIdx, setActiveExpIdx] = useState<number>(0);
  const [activeTechCategoryIdx, setActiveTechCategoryIdx] = useState<number>(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [expCharCount, setExpCharCount] = useState<number>(0);
  const [projectCharCount, setProjectCharCount] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>(profileData.images.about.src || '/images/me.png');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [contactErrorMsg, setContactErrorMsg] = useState('');

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

  // Thank You screen target slots & deltas (animates buttons to final thank you screen)
  const thankYouButtonSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouButtonDelta, setThankYouButtonDelta] = useState({ x: 0, y: 0 });
  const thankYouResumeSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouResumeDelta, setThankYouResumeDelta] = useState({ x: 0, y: 0 });
  const thankYouSocialsSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouSocialsDelta, setThankYouSocialsDelta] = useState({ x: 0, y: 0 });

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

  // Stream characters for typewriter/cursor effect and sync active indices for all chapters
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    // Typewriter text streaming for About panel (Chapter 01: 0.04 -> 0.13)
    const start = 0.04;
    const end = 0.13;
    if (latest <= start) {
      setCharCount(0);
    } else if (latest >= end) {
      setCharCount(normalizedAbout.length);
    } else {
      const ratio = (latest - start) / (end - start);
      setCharCount(Math.round(ratio * normalizedAbout.length));
    }

    // Dynamic 3D service carousel rotation in Chapter 02 (0.165 -> 0.30)
    if (latest >= 0.25) {
      setActiveServiceIdx(2);
    } else if (latest >= 0.21) {
      setActiveServiceIdx(1);
    } else if (latest >= 0.165) {
      setActiveServiceIdx(0);
    }

    // Dynamic Zoom Scroll Experience milestone tracking in Chapter 03 (0.305 -> 0.445)
    let expIdx = 0;
    let tStart = 0.31;
    let tEnd = 0.335;

    if (latest >= 0.41) {
      expIdx = 3;
      tStart = 0.415;
      tEnd = 0.44;
    } else if (latest >= 0.375) {
      expIdx = 2;
      tStart = 0.38;
      tEnd = 0.405;
    } else if (latest >= 0.34) {
      expIdx = 1;
      tStart = 0.345;
      tEnd = 0.37;
    } else if (latest >= 0.305) {
      expIdx = 0;
      tStart = 0.31;
      tEnd = 0.335;
    }

    setActiveExpIdx(expIdx);

    const fullExpDesc = experienceData[expIdx]?.description || '';
    if (latest <= tStart) {
      setExpCharCount(0);
    } else if (latest >= tEnd) {
      setExpCharCount(fullExpDesc.length);
    } else {
      const ratio = (latest - tStart) / (tEnd - tStart);
      setExpCharCount(Math.round(ratio * fullExpDesc.length));
    }

    // Dynamic Technologies category tracking in Chapter 04 (0.455 -> 0.585)
    if (latest >= 0.54) {
      setActiveTechCategoryIdx(2);
    } else if (latest >= 0.50) {
      setActiveTechCategoryIdx(1);
    } else if (latest >= 0.455) {
      setActiveTechCategoryIdx(0);
    }

    // Dynamic Projects Showcase tracking in Chapter 05 (0.595 -> 0.725)
    if (latest >= 0.595 && latest < 0.735) {
      const projRange = 0.71 - 0.61;
      const projProgress = Math.min(1, Math.max(0, (latest - 0.61) / projRange));
      const pIdx = Math.min(featuredProjects.length - 1, Math.floor(projProgress * featuredProjects.length));
      setActiveProjectIdx(pIdx);

      // Sub-segment typewriter progress for the active project
      const segSize = projRange / featuredProjects.length;
      const segStart = 0.61 + pIdx * segSize;
      const segEnd = segStart + segSize * 0.75;
      const fullProjExcerpt = featuredProjects[pIdx]?.excerpt || '';

      if (latest <= segStart) {
        setProjectCharCount(0);
      } else if (latest >= segEnd) {
        setProjectCharCount(fullProjExcerpt.length);
      } else {
        const segRatio = (latest - segStart) / (segEnd - segStart);
        setProjectCharCount(Math.round(segRatio * fullProjExcerpt.length));
      }
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
      // Target slot measurements on final Thank You screen
      if (buttonAnchorRef.current && thankYouButtonSlotRef.current) {
        const anchorRect = buttonAnchorRef.current.getBoundingClientRect();
        const targetRect = thankYouButtonSlotRef.current.getBoundingClientRect();
        setThankYouButtonDelta({
          x: targetRect.left - anchorRect.left,
          y: targetRect.top - anchorRect.top,
        });
      }
      if (resumeAnchorRef.current && thankYouResumeSlotRef.current) {
        const resumeAnchorRect = resumeAnchorRef.current.getBoundingClientRect();
        const resumeTargetRect = thankYouResumeSlotRef.current.getBoundingClientRect();
        setThankYouResumeDelta({
          x: resumeTargetRect.left - resumeAnchorRect.left,
          y: resumeTargetRect.top - resumeAnchorRect.top,
        });
      }
      if (desktopSocialsAnchorRef.current && thankYouSocialsSlotRef.current) {
        const socialsAnchorRect = desktopSocialsAnchorRef.current.getBoundingClientRect();
        const socialsTargetRect = thankYouSocialsSlotRef.current.getBoundingClientRect();
        setThankYouSocialsDelta({
          x: socialsTargetRect.left - socialsAnchorRect.left,
          y: socialsTargetRect.top - socialsAnchorRect.top,
        });
      }
    };

    updateDeltas();
    const rafId = requestAnimationFrame(updateDeltas);
    const timeout1 = setTimeout(updateDeltas, 100);
    const timeout2 = setTimeout(updateDeltas, 300);
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updateDeltas).catch(() => { });
    }
    window.addEventListener('resize', updateDeltas);
    window.addEventListener('load', updateDeltas);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      window.removeEventListener('resize', updateDeltas);
      window.removeEventListener('load', updateDeltas);
    };
  }, [isReady]);

  // Motion transforms for ENTER WORLD button (Hero -> Footer Dock -> Final Thank You Screen)
  const buttonX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * delta.x;
    }
    if (p < 0.855) {
      return delta.x;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return delta.x + t2 * (thankYouButtonDelta.x - delta.x);
  });
  const buttonY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * delta.y;
    }
    if (p < 0.855) {
      return delta.y;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return delta.y + t2 * (thankYouButtonDelta.y - delta.y);
  });
  const buttonRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, -2, 1, 0, 0, 1.5, 0]);
  const buttonRotateX = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [0, 10, 0, 0, 8, 0]);
  const buttonScale = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [1, 1.02, 1, 1, 1.03, 1]);
  const buttonShadow = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [
    '4px 4px 0px #3E2B1D',
    '8px 8px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '6px 6px 0px #3E2B1D',
    '4px 4px 0px #3E2B1D',
  ]);

  // Motion transforms for SEE RESUME button (Hero -> Footer Dock -> Final Thank You Screen)
  const resumeX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * resumeDelta.x;
    }
    if (p < 0.855) {
      return resumeDelta.x;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return resumeDelta.x + t2 * (thankYouResumeDelta.x - resumeDelta.x);
  });
  const resumeY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * resumeDelta.y;
    }
    if (p < 0.855) {
      return resumeDelta.y;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return resumeDelta.y + t2 * (thankYouResumeDelta.y - resumeDelta.y);
  });
  const resumeRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, 2, -1, 0, 0, -1.5, 0]);
  const resumeRotateX = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [0, 10, 0, 0, 8, 0]);
  const resumeScale = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [1, 1.02, 1, 1, 1.03, 1]);
  const resumeShadow = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [
    '3px 3px 0px #3E2B1D',
    '8px 8px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '6px 6px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
  ]);

  // Motion transforms for Desktop Social buttons (Hero -> Footer Dock -> Final Thank You Screen)
  const desktopSocialsX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * desktopSocialsDelta.x;
    }
    if (p < 0.855) {
      return desktopSocialsDelta.x;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return desktopSocialsDelta.x + t2 * (thankYouSocialsDelta.x - desktopSocialsDelta.x);
  });
  const desktopSocialsY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * desktopSocialsDelta.y;
    }
    if (p < 0.855) {
      return desktopSocialsDelta.y;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return desktopSocialsDelta.y + t2 * (thankYouSocialsDelta.y - desktopSocialsDelta.y);
  });
  const desktopSocialsRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, -1.5, 1, 0, 0, 1, 0]);

  // Top Header Bar (Location & Mute) fades out on final thank you screen
  const topHeaderOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const topHeaderVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  // Left Avatar Frame (fades out cleanly on final screen transition to clear all items)
  const leftAvatarOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const leftAvatarScale = useTransform(smoothProgress, [0.855, 0.875], [1, 0.92]);
  const leftAvatarVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  // Transition between Initial Overview and About Info Panel
  const initialOverviewOpacity = useTransform(smoothProgress, [0, 0.03], [1, 0]);
  const initialOverviewY = useTransform(smoothProgress, [0, 0.03], [0, -10]);
  const initialPointerEvents = useTransform(smoothProgress, (p) => (p > 0.03 ? 'none' : 'auto'));
  const initialOverviewVisibility = useTransform(smoothProgress, (p) => (p < 0.035 ? 'visible' : 'hidden'));

  // Transition for Layer 2 About Panel (Chapter 01: 0.035 -> 0.155)
  const aboutPanelOpacity = useTransform(smoothProgress, [0.015, 0.035, 0.145, 0.16], [0, 1, 1, 0]);
  const aboutPanelY = useTransform(smoothProgress, [0.015, 0.035, 0.145, 0.16], [14, 0, 0, -20]);
  const aboutPanelRotateX = useTransform(smoothProgress, [0.145, 0.16], [0, 20]);
  const aboutPanelScale = useTransform(smoothProgress, [0.145, 0.16], [1, 0.88]);
  const aboutPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.025 && p < 0.16 ? 'auto' : 'none'));
  const aboutPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.015 && p < 0.16 ? 'visible' : 'hidden'));

  // Transition for Layer 3 3D Services Section (Chapter 02: 0.165 -> 0.295)
  const servicesPanelOpacity = useTransform(smoothProgress, [0.16, 0.175, 0.285, 0.30], [0, 1, 1, 0]);
  const servicesPanelY = useTransform(smoothProgress, [0.16, 0.175, 0.285, 0.30], [16, 0, 0, -18]);
  const servicesPanelScale = useTransform(smoothProgress, [0.16, 0.18, 0.285, 0.30], [0.92, 1, 1, 0.90]);
  const servicesPanelRotateX = useTransform(smoothProgress, [0.16, 0.18, 0.285, 0.30], [-12, 0, 0, 14]);
  const servicesPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.16 && p < 0.30 ? 'auto' : 'none'));
  const servicesPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.16 && p < 0.30 ? 'visible' : 'hidden'));

  // Transition for Layer 4 Zoom Scroll Experience Section (Chapter 03: 0.305 -> 0.445)
  const experiencePanelOpacity = useTransform(smoothProgress, [0.30, 0.315, 0.435, 0.45], [0, 1, 1, 0]);
  const experiencePanelY = useTransform(smoothProgress, [0.30, 0.315, 0.435, 0.45], [16, 0, 0, -18]);
  const experiencePanelScale = useTransform(smoothProgress, [0.30, 0.32, 0.435, 0.45], [0.92, 1, 1, 1.05]);
  const experiencePointerEvents = useTransform(smoothProgress, (p) => (p >= 0.30 && p < 0.45 ? 'auto' : 'none'));
  const experiencePanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.30 && p < 0.45 ? 'visible' : 'hidden'));

  // Transition for Layer 5 Technologies Section (Chapter 04: 0.455 -> 0.585)
  const techPanelOpacity = useTransform(smoothProgress, [0.45, 0.465, 0.575, 0.59], [0, 1, 1, 0]);
  const techPanelY = useTransform(smoothProgress, [0.45, 0.465, 0.575, 0.59], [16, 0, 0, -18]);
  const techPanelScale = useTransform(smoothProgress, [0.45, 0.47, 0.575, 0.59], [0.94, 1, 1, 0.90]);
  const techPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.45 && p < 0.59 ? 'auto' : 'none'));
  const techPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.45 && p < 0.59 ? 'visible' : 'hidden'));

  // Transition for Layer 6 Featured Projects Section (Chapter 05: 0.595 -> 0.725)
  const projectsPanelOpacity = useTransform(smoothProgress, [0.59, 0.605, 0.715, 0.73], [0, 1, 1, 0]);
  const projectsPanelY = useTransform(smoothProgress, [0.59, 0.605, 0.715, 0.73], [16, 0, 0, -18]);
  const projectsPanelScale = useTransform(smoothProgress, [0.59, 0.61, 0.715, 0.73], [0.94, 1, 1, 0.90]);
  const projectsPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.59 && p < 0.73 ? 'auto' : 'none'));
  const projectsPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.59 && p < 0.73 ? 'visible' : 'hidden'));

  // Transition for Layer 7 Contact Form Section (Chapter 06: 0.735 -> 0.865)
  const contactPanelOpacity = useTransform(smoothProgress, [0.73, 0.745, 0.855, 0.87], [0, 1, 1, 0]);
  const contactPanelY = useTransform(smoothProgress, [0.73, 0.745, 0.855, 0.87], [16, 0, 0, -18]);
  const contactPanelScale = useTransform(smoothProgress, [0.73, 0.75, 0.855, 0.87], [0.94, 1, 1, 0.90]);
  const contactPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.73 && p < 0.87 ? 'auto' : 'none'));
  const contactPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.73 && p < 0.87 ? 'visible' : 'hidden'));

  // Transition for Final Thank You Screen (Chapter 07: 0.875 -> 1.00)
  const thankYouOpacity = useTransform(smoothProgress, [0.87, 0.89], [0, 1]);
  const thankYouPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.87 ? 'auto' : 'none'));
  const thankYouVisibility = useTransform(smoothProgress, (p) => (p >= 0.87 ? 'visible' : 'hidden'));

  // Footer Bottom Bar (Fades out when transitioning to final thank you screen)
  const footerOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const footerVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  // Bottom prompt text fades out smoothly as buttons travel down to take its place
  const promptOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const promptY = useTransform(smoothProgress, [0, 0.08], [0, 8]);

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
    } catch (e) { }
  };

  const toggleSound = () => {
    const nextSoundState = !isSoundOn;
    setIsSoundOn(nextSoundState);
    if (nextSoundState) {
      playRetroSoundEffect('click');
    }
  };

  const handlePlayClick = () => {
    if (isWorldCurrentlyLoading) return;
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

  const handleSelectExp = (idx: number) => {
    setActiveExpIdx(idx);
    setExpCharCount(experienceData[idx]?.description?.length || 0);
    if (isSoundOn) playRetroSoundEffect('click');
  };

  const handlePrevExp = () => {
    const nextIdx = Math.max(0, activeExpIdx - 1);
    handleSelectExp(nextIdx);
  };

  const handleNextExp = () => {
    const nextIdx = Math.min(experienceData.length - 1, activeExpIdx + 1);
    handleSelectExp(nextIdx);
  };

  const currentExp = experienceData[activeExpIdx] || experienceData[0];
  const currentExpDesc = currentExp?.description || '';
  const displayedExpDesc = currentExpDesc.slice(0, expCharCount);

  // Tech stack categories & handlers
  const techCategories = Object.keys(techStackData) as (keyof typeof techStackData)[];

  const handleSelectTechCategory = (idx: number) => {
    setActiveTechCategoryIdx(idx);
    if (isSoundOn) playRetroSoundEffect('click');
  };

  const handlePrevTechCategory = () => {
    const nextIdx = Math.max(0, activeTechCategoryIdx - 1);
    handleSelectTechCategory(nextIdx);
  };

  const handleNextTechCategory = () => {
    const nextIdx = Math.min(techCategories.length - 1, activeTechCategoryIdx + 1);
    handleSelectTechCategory(nextIdx);
  };

  const currentCategoryName = techCategories[activeTechCategoryIdx] || techCategories[0];
  const currentTechList = techStackData[currentCategoryName] || [];

  // Featured projects list & handlers
  const featuredProjects = projectsData.slice(0, 4);

  const handleSelectProject = (idx: number) => {
    setActiveProjectIdx(idx);
    setProjectCharCount(featuredProjects[idx]?.excerpt?.length || 0);
    if (isSoundOn) playRetroSoundEffect('click');
  };

  const handlePrevProject = () => {
    const nextIdx = Math.max(0, activeProjectIdx - 1);
    handleSelectProject(nextIdx);
  };

  const handleNextProject = () => {
    const nextIdx = Math.min(featuredProjects.length - 1, activeProjectIdx + 1);
    handleSelectProject(nextIdx);
  };

  const currentProject = featuredProjects[activeProjectIdx] || featuredProjects[0];
  const currentProjectExcerpt = currentProject?.excerpt || '';
  const displayedProjectExcerpt = currentProjectExcerpt.slice(0, projectCharCount);

  // Handle contact form submission to /api/mail
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setIsContactSubmitting(true);
    setContactStatus('idle');
    setContactErrorMsg('');
    if (isSoundOn) playRetroSoundEffect('click');

    try {
      const res = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || 'Portfolio Contact Inquiry',
          message: contactMessage.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setContactStatus('success');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
        if (isSoundOn) playRetroSoundEffect('start');
      } else {
        setContactStatus('error');
        setContactErrorMsg(data.error || 'Failed to send message. Please email directly.');
      }
    } catch {
      setContactStatus('error');
      setContactErrorMsg('Network error. Please email directly.');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  // Smooth scroll back to beginning
  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      if (isSoundOn) playRetroSoundEffect('click');
    }
  };

  // Smooth scroll back to contact form section (at ~79% of scrollable distance)
  const handleScrollToContact = () => {
    if (scrollContainerRef.current) {
      const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({
        top: maxScroll * 0.79,
        behavior: 'smooth',
      });
      if (isSoundOn) playRetroSoundEffect('click');
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#F4EADA] text-[#3E2B1D] font-pixelify select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* Scroll track (1200vh tall = 7 continuous chapters: Hero/About -> 3D Services -> Zoom Experience -> Tech Stack -> Projects -> Contact Form -> Thank You Screen) */}
      <div className="relative w-full h-[1200vh]">
        {/* Sticky viewport frame: perfectly fitted to mobile & desktop viewports */}
        <div className="sticky top-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col items-center justify-between p-2 sm:p-4 md:p-8 pb-2 sm:pb-3 md:pb-6 overflow-hidden pointer-events-auto">
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

          {/* Top Header Bar (Fixed at top of screen, fades out cleanly on final screen) */}
          <motion.div
            style={{
              opacity: topHeaderOpacity,
              visibility: topHeaderVisibility,
            }}
            className="relative z-20 w-full max-w-6xl flex items-center justify-between pt-1 md:pt-2 pointer-events-auto"
          >
            {/* Location Badge */}
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[#EADBCC] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
              <MapPinIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
              <span>{profileData.location}</span>
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              {isSoundOn ? (
                <SpeakerHighIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#3E2B1D]" />
              ) : (
                <SpeakerSlashIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#3E2B1D]" />
              )}
              <span className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
                {isSoundOn ? 'SOUND ON' : 'MUTED'}
              </span>
            </button>
          </motion.div>

          {/* Main Side-by-Side Layout Container */}
          <div className="relative z-50 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 lg:gap-12 items-center justify-center my-auto flex-1 max-w-6xl w-full py-0.5 sm:py-2 md:py-4 pointer-events-none min-h-0">
            {/* Left Column: Fixed / Static Profile Picture Frame (Hidden on mobile to let content expand, fades out cleanly on final thank you screen) */}
            <motion.div
              style={{
                opacity: leftAvatarOpacity,
                scale: leftAvatarScale,
                visibility: leftAvatarVisibility,
              }}
              className="hidden md:flex md:col-span-5 flex-col items-center justify-center pointer-events-auto"
            >
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
            </motion.div>

            {/* Right Column: Dynamic Area that reveals About Info with Typewriter Animation on Scroll */}
            <div className="col-span-1 md:col-span-7 relative w-full flex flex-col items-center md:items-start text-center md:text-left h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] max-h-[calc(100dvh-170px)] md:max-h-none justify-center pointer-events-none">
              {/* LAYER 1: Initial Intro / Stats (Fades out smoothly on scroll) */}
              <motion.div
                style={{
                  opacity: initialOverviewOpacity,
                  y: initialOverviewY,
                  pointerEvents: initialPointerEvents,
                  visibility: initialOverviewVisibility,
                }}
                className="relative z-20 w-full flex flex-col items-center md:items-start text-center md:text-left gap-1 sm:gap-2 md:gap-4"
              >
                {/* Mobile-Only Avatar Frame (Visible on initial screen only, scrolls/fades out naturally) */}
                <div className="md:hidden flex flex-col items-center mb-1.5 sm:mb-2">
                  <div className="relative group w-[30vw] min-w-[100px] max-w-[140px] aspect-square">
                    <div className="relative w-full h-full border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] bg-[#EADBCC] overflow-hidden flex items-center justify-center">
                      <img
                        src={imgSrc}
                        alt={profileData.name}
                        onError={handleImgError}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Handle Badge Overlay */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#D4A373] text-[#F4EADA] text-[8px] sm:text-[9px] font-black tracking-widest uppercase border border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#3E2B1D] whitespace-nowrap">
                      {profileData.handle}
                    </div>
                  </div>
                </div>

                {/* Header Title & Role */}
                <div className="flex flex-col gap-0.5 md:gap-1.5">
                  <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-wider text-[#3E2B1D] uppercase drop-shadow-[2px_2px_0px_#D4A373] md:drop-shadow-[3px_3px_0px_#D4A373]">
                    {profileData.name.toUpperCase()}
                  </h1>
                  <p className="text-[10px] sm:text-xs md:text-base font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
                    {profileData.role}
                  </p>
                </div>

                {/* Bio Subtext */}
                <p className="text-[11px] sm:text-xs md:text-base text-[#4A3728] font-mono leading-snug md:leading-relaxed max-w-xl font-medium line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                  {profileData.subtext}
                </p>

                {/* Quick Stats Grid */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3 my-0.5 sm:my-1">
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
                </div>
              </motion.div>

              {/* PERSISTENT DOCKING ACTION BUTTONS (Start & Resume above, Socials below) */}
              <div className="relative z-[60] flex flex-col items-center md:items-start gap-1.5 sm:gap-2.5 md:gap-3.5 mt-1.5 sm:mt-2 md:mt-4 w-full max-w-full pointer-events-none">
                {/* Row 1: ENTER WORLD & SEE RESUME */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-2.5 max-w-full pointer-events-none">
                  {/* ENTER WORLD BUTTON */}
                  <div ref={buttonAnchorRef} className="relative inline-block z-[60] pointer-events-none shrink-0">
                    <motion.button
                      onClick={isWorldCurrentlyLoading ? undefined : handlePlayClick}
                      disabled={isWorldCurrentlyLoading}
                      style={{
                        x: buttonX,
                        y: buttonY,
                        rotateZ: buttonRotateZ,
                        rotateX: buttonRotateX,
                        scale: buttonScale,
                        boxShadow: buttonShadow,
                        transformPerspective: 1000,
                      }}
                      className={`group relative z-[60] inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors select-none whitespace-nowrap pointer-events-auto ${isWorldCurrentlyLoading
                        ? 'bg-[#A89078] text-[#F4EADA]/90 cursor-wait'
                        : 'bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] text-[#F4EADA] cursor-pointer'
                        }`}
                      title={isWorldCurrentlyLoading ? 'Loading World...' : 'Enter World'}
                    >
                      {isWorldCurrentlyLoading ? (
                        <span className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                          <SpinnerIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA] animate-spin" />
                          <span className="animate-pulse">LOADING WORLD...</span>
                        </span>
                      ) : (
                        <>
                          <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA] fill-current" />
                          <span className="whitespace-nowrap">ENTER WORLD</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* SEE RESUME BUTTON */}
                  <div ref={resumeAnchorRef} className="relative inline-block z-[60] pointer-events-none shrink-0">
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
                      className="group relative z-[60] inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 bg-[#EADBCC] hover:bg-[#D8C2AA] text-[#3E2B1D] font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors cursor-pointer select-none whitespace-nowrap font-mono pointer-events-auto"
                      title="See Resume"
                    >
                      <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3E2B1D]" />
                      SEE RESUME
                    </motion.a>
                  </div>
                </div>

                {/* Row 2: Universal Social Links (Rendered on both mobile & desktop, animated to dock on scroll) */}
                <div ref={desktopSocialsAnchorRef} className="relative z-[60] pointer-events-none">
                  <motion.div
                    style={{
                      x: desktopSocialsX,
                      y: desktopSocialsY,
                      rotateZ: desktopSocialsRotateZ,
                      transformPerspective: 1000,
                    }}
                    className="group relative z-[60] inline-flex items-center gap-1 sm:gap-1.5 md:gap-2.5 pointer-events-none"
                  >
                    {profileData.socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => isSoundOn && playRetroSoundEffect('click')}
                        title={social.icon.toUpperCase()}
                        className="p-1 sm:p-1.5 md:p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D] flex items-center justify-center cursor-pointer pointer-events-auto"
                      >
                        {social.icon === 'github' && (
                          <GithubLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                        )}
                        {social.icon === 'linkedin' && (
                          <LinkedinLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                        )}
                        {social.icon === 'twitter' && (
                          <TwitterLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                        )}
                      </a>
                    ))}

                    {/* Email Icon Button */}
                    <a
                      href={`mailto:${profileData.email}`}
                      onClick={() => isSoundOn && playRetroSoundEffect('click')}
                      title="EMAIL"
                      className="p-1 sm:p-1.5 md:p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D] flex items-center justify-center cursor-pointer pointer-events-auto"
                    >
                      <EnvelopeSimpleIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* LAYER 2: About Panel (Reveals simultaneously with scroll-driven typewriter/cursor writing) */}
              <motion.div
                style={{
                  opacity: aboutPanelOpacity,
                  y: aboutPanelY,
                  pointerEvents: aboutPointerEvents,
                  visibility: aboutPanelVisibility,
                }}
                className="absolute inset-0 w-full flex flex-col justify-center z-10"
              >
                <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
                  {/* Retro Window Header */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>ABOUT // {profileData.alias || profileData.name}</span>
                    </div>
                  </div>

                  {/* Terminal Typewriter Content with Blinking Cursor */}
                  <div className="p-3 sm:p-4 md:p-5 font-mono text-[11px] sm:text-xs md:text-sm text-[#3E2B1D] leading-relaxed max-h-[260px] sm:max-h-[300px] md:max-h-[360px] overflow-y-auto [&::-webkit-scrollbar]:hidden select-text">
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
                </div>
              </motion.div>

              {/* LAYER 3: 3D Services Section (Expands with 3D perspective deck as scroll progresses) */}
              <motion.div
                style={{
                  opacity: servicesPanelOpacity,
                  y: servicesPanelY,
                  scale: servicesPanelScale,
                  rotateX: servicesPanelRotateX,
                  pointerEvents: servicesPointerEvents,
                  visibility: servicesPanelVisibility,
                  transformPerspective: 1200,
                }}
                className="absolute inset-0 w-full flex flex-col justify-center z-20"
              >
                <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
                  {/* Retro Window Header */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>SERVICES // {profileData.alias || profileData.name}</span>
                    </div>
                  </div>

                  {/* 3D Selector Tabs */}
                  <div className="flex items-center border-b-2 border-[#3E2B1D] bg-[#DFCEBA] font-mono text-[9px] sm:text-xs font-bold">
                    {servicesData.map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveServiceIdx(idx);
                          if (isSoundOn) playRetroSoundEffect('click');
                        }}
                        className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 border-r border-[#3E2B1D] last:border-r-0 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1 ${activeServiceIdx === idx
                          ? 'bg-[#EADBCC] text-[#3E2B1D] font-black shadow-[inset_0_-2px_0_#C84B31]'
                          : 'bg-[#D4C3AE] text-[#8C6D53] hover:bg-[#DBCABA]'
                          }`}
                      >
                        <span className="text-[#C84B31]">0{idx + 1}</span>
                        <span className="truncate">{service.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {/* 3D Interactive Showcase Area */}
                  <div
                    className="p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[240px] sm:min-h-[270px] md:min-h-[300px]"
                    style={{ perspective: 1000 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeServiceIdx}
                        initial={{ opacity: 0, rotateY: 15, z: -40, scale: 0.95 }}
                        animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateY: -15, z: -40, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="flex flex-col gap-2 md:gap-3"
                      >
                        {/* Service Title with Accent Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#C84B31] border border-[#3E2B1D]" />
                            <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-black uppercase text-[#3E2B1D] tracking-wide">
                              {servicesData[activeServiceIdx]?.label}
                            </h3>
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 bg-[#F4EADA] border border-[#3E2B1D] text-[#8C6D53] uppercase font-bold whitespace-nowrap">
                            PROTOCOL 0{activeServiceIdx + 1}
                          </span>
                        </div>

                        {/* Service Description */}
                        <p className="text-[11px] sm:text-xs md:text-sm font-mono text-[#4A3728] leading-relaxed select-text line-clamp-4 sm:line-clamp-6 md:line-clamp-none">
                          {servicesData[activeServiceIdx]?.description}
                        </p>

                        {/* Stack & Capability Tags in 3D perspective chips */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mt-1 md:mt-2">
                          {servicesData[activeServiceIdx]?.tags.map((tag, tIdx) => (
                            <motion.span
                              key={tIdx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: tIdx * 0.03 }}
                              className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#F4EADA] hover:bg-[#D4A373] text-[#3E2B1D] font-mono text-[8px] sm:text-[10px] md:text-xs font-bold uppercase border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] transition-transform hover:-translate-y-0.5 cursor-default"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* LAYER 4: Zoom Scroll Experience Section (Combined with Typewriter Text Writing) */}
              <motion.div
                style={{
                  opacity: experiencePanelOpacity,
                  y: experiencePanelY,
                  scale: experiencePanelScale,
                  pointerEvents: experiencePointerEvents,
                  visibility: experiencePanelVisibility,
                  transformPerspective: 1200,
                }}
                className="absolute inset-0 w-full flex flex-col justify-center z-20"
              >
                <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
                  {/* Retro Window Header with Viewfinder Reticle & Optical Zoom Tag */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>EXPERIENCE // {profileData.alias || profileData.name}</span>
                    </div>
                  </div>

                  {/* Milestone / Optical Zoom Tabs */}
                  <div className="flex items-center border-b-2 border-[#3E2B1D] bg-[#DFCEBA] font-mono text-[9px] sm:text-xs font-bold">
                    {experienceData.map((exp, idx) => {
                      const yearLabel = exp.duration.from === exp.duration.to ? `${exp.duration.from}` : `${exp.duration.from}-${exp.duration.to}`;
                      const shortName = exp.name.split(' ')[0];
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectExp(idx)}
                          className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 border-r border-[#3E2B1D] last:border-r-0 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1 ${activeExpIdx === idx
                            ? 'bg-[#EADBCC] text-[#3E2B1D] font-black shadow-[inset_0_-2px_0_#C84B31]'
                            : 'bg-[#D4C3AE] text-[#8C6D53] hover:bg-[#DBCABA]'
                            }`}
                        >
                          <span className="text-[#C84B31] font-mono">{yearLabel}</span>
                          <span className="truncate hidden sm:inline">{shortName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* 3D Zoom Camera Viewfinder Showcase Area */}
                  <div
                    className="p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[240px] sm:min-h-[270px] md:min-h-[300px] relative"
                    style={{ perspective: 1000 }}
                  >
                    {/* Corner Viewfinder Camera Reticles */}
                    <div className="absolute top-2 left-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">┌</div>
                    <div className="absolute top-2 right-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">┐</div>
                    <div className="absolute bottom-2 left-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">└</div>
                    <div className="absolute bottom-2 right-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">┘</div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeExpIdx}
                        initial={{ opacity: 0, scale: 0.78, z: -70 }}
                        animate={{ opacity: 1, scale: 1, z: 0 }}
                        exit={{ opacity: 0, scale: 1.18, z: 70 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        className="flex flex-col gap-1.5 sm:gap-2 md:gap-3"
                      >
                        {/* Header Row: Company Name + Role & Badges */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 bg-[#C84B31] border border-[#3E2B1D]" />
                              <h3 className="text-sm sm:text-base md:text-xl font-black uppercase text-[#3E2B1D] tracking-wide">
                                {currentExp.name}
                              </h3>
                            </div>
                            <p className="text-[9px] sm:text-xs font-mono font-bold text-[#8C6D53] uppercase ml-4.5">
                              {currentExp.role}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 self-start sm:self-center ml-4 sm:ml-0">
                            <span className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 bg-[#F4EADA] border border-[#3E2B1D] text-[#3E2B1D] uppercase font-bold whitespace-nowrap">
                              {currentExp.workType}
                            </span>
                            <span className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 bg-[#D4A373] text-[#F4EADA] border border-[#3E2B1D] font-black uppercase whitespace-nowrap">
                              {currentExp.duration.from === currentExp.duration.to
                                ? `${currentExp.duration.from}`
                                : `${currentExp.duration.from} - ${currentExp.duration.to}`}
                            </span>
                          </div>
                        </div>

                        {/* Description with Scroll-Driven Typewriter Text Writing Animation */}
                        <div className="bg-[#F4EADA]/70 border border-[#3E2B1D]/40 p-2 sm:p-2.5 text-[10px] sm:text-xs md:text-sm font-mono text-[#3E2B1D] leading-relaxed select-text min-h-[48px] sm:min-h-[58px] md:min-h-[64px]">
                          <span>{displayedExpDesc}</span>
                          <span className="inline-block ml-0.5 text-[#C84B31] font-black animate-pulse">▌</span>
                        </div>

                        {/* Key Achievements Bullet Points */}
                        {currentExp.achievements && currentExp.achievements.length > 0 && (
                          <div className="flex flex-col gap-1">
                            {currentExp.achievements.slice(0, 2).map((ach, aIdx) => (
                              <div key={aIdx} className="flex items-start gap-1.5 text-[9px] sm:text-[11px] md:text-xs font-mono text-[#4A3728]">
                                <CaretRightIcon weight="duotone" className="w-3 h-3 text-[#C84B31] shrink-0 mt-0.5" />
                                <span className="line-clamp-1 select-text">{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Stacks Chips */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                          {currentExp.stacks.map((st, sIdx) => (
                            <motion.span
                              key={sIdx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: sIdx * 0.03 }}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-[#F4EADA] hover:bg-[#D4A373] text-[#3E2B1D] font-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase border border-[#3E2B1D] shadow-[1px_1px_0px_#3E2B1D] cursor-default"
                            >
                              {st}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Optical Zoom Status Footer with Next / Prev Step Controls */}
                  <div className="flex items-center justify-between px-2 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={handlePrevExp}
                        disabled={activeExpIdx === 0}
                        className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
                        title="Zoom Out to Previous Milestone"
                      >
                        <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>ZOOM -</span>
                      </button>
                      <button
                        onClick={handleNextExp}
                        disabled={activeExpIdx === experienceData.length - 1}
                        className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
                        title="Zoom In to Next Milestone"
                      >
                        <span>ZOOM +</span>
                        <CaretRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LAYER 5: Technologies / Tech Stack Section (Interactive Category Matrix with Authentic SVGs) */}
              <motion.div
                style={{
                  opacity: techPanelOpacity,
                  y: techPanelY,
                  scale: techPanelScale,
                  pointerEvents: techPointerEvents,
                  visibility: techPanelVisibility,
                  transformPerspective: 1200,
                }}
                className="absolute inset-0 w-full flex flex-col justify-center z-20"
              >
                <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
                  {/* Retro Window Header */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>TECH STACK // {profileData.alias || profileData.name}</span>
                    </div>
                  </div>

                  {/* Category Selector Tabs */}
                  <div className="flex items-center border-b-2 border-[#3E2B1D] bg-[#DFCEBA] font-mono text-[9px] sm:text-xs font-bold">
                    {techCategories.map((category, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectTechCategory(idx)}
                        className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 border-r border-[#3E2B1D] last:border-r-0 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1 ${activeTechCategoryIdx === idx
                          ? 'bg-[#EADBCC] text-[#3E2B1D] font-black shadow-[inset_0_-2px_0_#C84B31]'
                          : 'bg-[#D4C3AE] text-[#8C6D53] hover:bg-[#DBCABA]'
                          }`}
                      >
                        <span className="text-[#C84B31]">0{idx + 1}</span>
                        <span className="truncate">{category}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tech Stack Matrix Grid */}
                  <div className="p-3 sm:p-3.5 md:p-4 min-h-[240px] sm:min-h-[270px] md:min-h-[300px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTechCategoryIdx}
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 max-h-[210px] sm:max-h-[240px] md:max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:hidden pr-0.5"
                      >
                        {currentTechList.map((item, i) => (
                          <motion.a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => isSoundOn && playRetroSoundEffect('click')}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.025 }}
                            className="group bg-[#F4EADA]/80 hover:bg-[#F4EADA] active:bg-[#E0D0BE] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] hover:shadow-[3px_3px_0px_#3E2B1D] p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer select-none"
                            title={`Visit ${item.name} (${item.url})`}
                          >
                            {/* Icon */}
                            <div className="p-1 sm:p-1.5 bg-[#EADBCC] group-hover:bg-[#D4A373] border border-[#3E2B1D] flex items-center justify-center text-[#3E2B1D] transition-colors shrink-0">
                              <TechIcon name={item.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>

                            {/* Tech Name & Link Indicator */}
                            <div className="flex items-center justify-between gap-1 flex-1 min-w-0">
                              <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase text-[#3E2B1D] truncate tracking-tight">
                                {item.name}
                              </span>
                              <ArrowUpRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6D53] group-hover:text-[#C84B31] shrink-0 transition-colors" />
                            </div>
                          </motion.a>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Status Footer */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={handlePrevTechCategory}
                        disabled={activeTechCategoryIdx === 0}
                        className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
                        title="Previous Category"
                      >
                        <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>PREV CAT</span>
                      </button>
                      <button
                        onClick={handleNextTechCategory}
                        disabled={activeTechCategoryIdx === techCategories.length - 1}
                        className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
                        title="Next Category"
                      >
                        <span>NEXT CAT</span>
                        <CaretRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LAYER 6: Featured Projects Showcase (Enters with project deck expand in Phase 5) */}
              <motion.div
                style={{
                  opacity: projectsPanelOpacity,
                  y: projectsPanelY,
                  scale: projectsPanelScale,
                  pointerEvents: projectsPointerEvents,
                  visibility: projectsPanelVisibility,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30"
              >
                <div className="w-full max-h-[calc(100dvh-175px)] md:max-h-[460px] flex flex-col bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] overflow-hidden text-left pointer-events-auto">
                  {/* Window Title Header */}
                  <div className="flex items-center justify-between px-2.5 py-1 sm:px-4 sm:py-2 bg-[#D4A373] text-[#3E2B1D] border-b-2 md:border-b-4 border-[#3E2B1D] font-mono text-[9px] sm:text-xs md:text-sm font-black tracking-wider uppercase">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>CHAPTER 05: FEATURED PROJECTS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline bg-[#F4EADA] px-1.5 py-0.5 border border-[#3E2B1D] text-[9px] font-bold">
                        {currentProject.category.toUpperCase()}
                      </span>
                      {currentProject.url && (
                        <a
                          href={currentProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => isSoundOn && playRetroSoundEffect('click')}
                          className="px-1.5 py-0.5 bg-[#C84B31] hover:bg-[#A8321D] text-[#F4EADA] border border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#3E2B1D] flex items-center gap-1 text-[8px] sm:text-[10px] cursor-pointer"
                        >
                          <span>LIVE DEMO</span>
                          <ArrowSquareOutIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Selector Pills (Tabs) */}
                  <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 bg-[#E0CEBB] border-b border-[#3E2B1D]/30 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {featuredProjects.map((proj, idx) => {
                      const isActive = activeProjectIdx === idx;
                      const shortTitle = proj.title.split('–')[0].split('-')[0].trim().toUpperCase();
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectProject(idx)}
                          className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-mono font-black uppercase transition-all whitespace-nowrap border cursor-pointer ${isActive
                            ? 'bg-[#3E2B1D] text-[#F4EADA] border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#C84B31]'
                            : 'bg-[#F4EADA] text-[#3E2B1D] hover:bg-[#D8C2AA] border-[#3E2B1D]/40'
                            }`}
                        >
                          0{idx + 1} {shortTitle}
                        </button>
                      );
                    })}
                  </div>

                  {/* Project Content Area */}
                  <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 text-[#3E2B1D] min-h-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProjectIdx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 md:gap-5 items-start"
                      >
                        {/* Left: Project Visual / Thumbnail Frame & Technologies */}
                        <div className="md:col-span-5 flex flex-col gap-2">
                          <div className="relative w-full aspect-video sm:aspect-[16/10] bg-[#F4EADA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] overflow-hidden group">
                            {currentProject.thumbnail ? (
                              <img
                                src={currentProject.thumbnail}
                                alt={currentProject.title}
                                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-[#3E2B1D] text-[#F4EADA] font-mono text-center">
                                <div className="text-[9px] sm:text-xs font-black text-[#D4A373] mb-1">SYSTEM ARCHITECTURE</div>
                                <div className="text-[10px] sm:text-xs font-bold">{currentProject.title}</div>
                                <div className="text-[8px] text-[#A89078] mt-1">PRODUCTION BACKEND API</div>
                              </div>
                            )}

                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E2B1D]/5 to-transparent pointer-events-none opacity-40" />
                          </div>

                          {/* Tag Chips */}
                          <div className="flex flex-wrap gap-1">
                            {currentProject.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-1.5 py-0.5 bg-[#F4EADA] border border-[#3E2B1D]/40 text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Technologies & Architecture (Moved below tags) */}
                          <div className="mt-0.5 sm:mt-1">
                            <div className="text-[8px] sm:text-[9px] font-mono font-black text-[#8C6D53] uppercase mb-1">
                              TECHNOLOGIES & ARCHITECTURE:
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                              {currentProject.tools.map((tool, toolIdx) => (
                                <span
                                  key={toolIdx}
                                  className="px-1.5 py-0.5 bg-[#E0CEBB] border border-[#3E2B1D] text-[8px] sm:text-[9px] font-mono font-bold text-[#3E2B1D]"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Project Details & Typewriter Excerpt */}
                        <div className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
                          <div>
                            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-[#3E2B1D] uppercase leading-tight font-mono">
                              {currentProject.title}
                            </h3>
                            <div className="text-[9px] sm:text-[11px] font-mono font-bold text-[#C84B31] uppercase mt-0.5">
                              {currentProject.category}
                            </div>
                          </div>

                          {/* Typewriter Excerpt */}
                          <div className="p-2.5 sm:p-3 bg-[#F4EADA] border border-[#3E2B1D]/40 text-[10px] sm:text-xs md:text-sm font-mono leading-relaxed text-[#3E2B1D] min-h-[90px] sm:min-h-[120px] shadow-[2px_2px_0px_#3E2B1D]/10">
                            <span>{displayedProjectExcerpt}</span>
                            <span className="inline-block w-1.5 h-3.5 sm:h-4 bg-[#C84B31] animate-pulse ml-0.5 align-middle" />
                          </div>

                          {currentProject.problem && (
                            <div className="text-[9px] sm:text-[11px] font-mono text-[#6E543F] leading-snug">
                              <span className="font-bold text-[#3E2B1D]">CORE FOCUS: </span>
                              {currentProject.goal || currentProject.problem}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Status & Navigation Footer */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={handlePrevProject}
                        disabled={activeProjectIdx === 0}
                        className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
                        title="Previous Project"
                      >
                        <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>PREV PROJ</span>
                      </button>
                      <button
                        onClick={handleNextProject}
                        disabled={activeProjectIdx === featuredProjects.length - 1}
                        className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
                        title="Next Project"
                      >
                        <span>NEXT PROJ</span>
                        <CaretRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LAYER 7: Contact Form (Chapter 06: Get in Touch) */}
              <motion.div
                style={{
                  opacity: contactPanelOpacity,
                  y: contactPanelY,
                  scale: contactPanelScale,
                  pointerEvents: contactPointerEvents,
                  visibility: contactPanelVisibility,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30"
              >
                <div className="w-full max-h-[calc(100dvh-175px)] md:max-h-[460px] flex flex-col bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] overflow-hidden text-left pointer-events-auto">
                  {/* Window Title Header */}
                  <div className="flex items-center justify-between px-2.5 py-1 sm:px-4 sm:py-2 bg-[#D4A373] text-[#3E2B1D] border-b-2 md:border-b-4 border-[#3E2B1D] font-mono text-[9px] sm:text-xs md:text-sm font-black tracking-wider uppercase">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#C84B31] border border-[#3E2B1D]" />
                      <span>CHAPTER 06: GET IN TOUCH</span>
                    </div>
                    <div className="text-[8px] sm:text-[10px] font-bold text-[#3E2B1D]">
                      {profileData.location.toUpperCase()}
                    </div>
                  </div>

                  {/* Window Content Body */}
                  <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 md:p-5 text-[#3E2B1D] min-h-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-start">
                      {/* Left: Contact Info & Direct Email */}
                      <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-3">
                        <div>
                          <h3 className="text-sm sm:text-base md:text-xl font-black text-[#3E2B1D] uppercase leading-tight font-mono">
                            Let&apos;s build together
                          </h3>
                          <p className="text-[10px] sm:text-xs text-[#6E543F] font-mono leading-relaxed mt-1">
                            Have a project in mind, a question, or a role to discuss? Send a message directly.
                          </p>
                        </div>

                        {/* Direct Email Card */}
                        <div className="p-2 sm:p-2.5 bg-[#F4EADA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D]">
                          <div className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                            DIRECT EMAIL
                          </div>
                          <a
                            href={`mailto:${profileData.email}`}
                            onClick={() => isSoundOn && playRetroSoundEffect('click')}
                            className="text-[10px] sm:text-xs font-mono font-black text-[#C84B31] hover:underline break-all"
                          >
                            {profileData.email}
                          </a>
                        </div>

                        {/* Social Links */}
                        <div>
                          <div className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-1">
                            FIND ME ON
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {profileData.socials.map((s, idx) => (
                              <a
                                key={idx}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => isSoundOn && playRetroSoundEffect('click')}
                                className="px-2 py-1 bg-[#F4EADA] hover:bg-[#D8C2AA] border border-[#3E2B1D] text-[9px] sm:text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1"
                              >
                                <span>{s.icon}</span>
                                <ArrowUpRightIcon weight="duotone" className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Clean Contact Form */}
                      <div className="md:col-span-7">
                        {contactStatus === 'success' ? (
                          <div className="p-4 bg-[#F4EADA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] flex flex-col items-center text-center gap-2">
                            <div className="w-8 h-8 bg-[#8C6D53] text-[#F4EADA] flex items-center justify-center font-bold text-base border border-[#3E2B1D]">
                              <CheckIcon weight="duotone" className="w-5 h-5 text-[#F4EADA]" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-mono font-black uppercase text-[#3E2B1D]">
                              Message Sent Successfully!
                            </h4>
                            <p className="text-[10px] sm:text-xs font-mono text-[#6E543F]">
                              Thank you for reaching out. I&apos;ll review your message and reply shortly.
                            </p>
                            <button
                              type="button"
                              onClick={() => setContactStatus('idle')}
                              className="mt-2 px-3 py-1 bg-[#D4A373] hover:bg-[#C08D5D] border border-[#3E2B1D] text-[9px] sm:text-[10px] font-mono font-bold uppercase cursor-pointer"
                            >
                              [ SEND ANOTHER MESSAGE ]
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="flex flex-col gap-2 sm:gap-2.5">
                            {contactStatus === 'error' && (
                              <div className="p-1.5 bg-[#C84B31]/10 border border-[#C84B31] text-[9px] sm:text-[10px] font-mono text-[#C84B31] font-bold">
                                {contactErrorMsg || 'Failed to send message. Please try again.'}
                              </div>
                            )}

                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                                  YOUR NAME *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={contactName}
                                  onChange={(e) => setContactName(e.target.value)}
                                  placeholder="Peter Paul"
                                  className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                                  EMAIL ADDRESS *
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={contactEmail}
                                  onChange={(e) => setContactEmail(e.target.value)}
                                  placeholder="you@domain.com"
                                  className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
                                />
                              </div>
                            </div>

                            {/* Subject */}
                            <div>
                              <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                                SUBJECT
                              </label>
                              <input
                                type="text"
                                value={contactSubject}
                                onChange={(e) => setContactSubject(e.target.value)}
                                placeholder="Project inquiry / Full-time role / Contract"
                                className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
                              />
                            </div>

                            {/* Message */}
                            <div>
                              <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                                MESSAGE *
                              </label>
                              <textarea
                                required
                                rows={3}
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                placeholder="Tell me about your goals, timeline, or requirements..."
                                className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31] resize-none"
                              />
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              disabled={isContactSubmitting}
                              className="self-start px-3 py-1.5 sm:px-4 sm:py-2 bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] disabled:opacity-60 text-[#F4EADA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] text-[10px] sm:text-xs font-mono font-black uppercase transition-all cursor-pointer disabled:cursor-wait flex items-center gap-1.5 sm:gap-2"
                            >
                              <span>{isContactSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                              <PaperPlaneTiltIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* LAYER 8: Final Screen - Fullscreen Blank Canvas & Open Thank You Screen (Chapter 07: 0.875 -> 1.00) */}
          <motion.div
            style={{
              opacity: thankYouOpacity,
              pointerEvents: thankYouPointerEvents,
              visibility: thankYouVisibility,
            }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center select-none pointer-events-none"
          >
            {/* Open Full-Screen Presentation (No Window Container Box) */}
            <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 pointer-events-auto">
              {/* Star Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-[#C84B31] font-mono font-black">
                <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
                <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
                <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
                <span className="px-3 py-1 bg-[#EADBCC] border-2 border-[#3E2B1D] text-[#3E2B1D] text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-mono shadow-[2px_2px_0px_#3E2B1D]">
                  ALL 6 CHAPTERS EXPLORED
                </span>
                <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
                <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
                <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
              </div>

              {/* Giant Headline */}
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#3E2B1D] uppercase tracking-wider font-pixelify drop-shadow-[3px_3px_0px_#D4A373] md:drop-shadow-[5px_5px_0px_#D4A373] leading-none">
                  THANK YOU FOR VISITING!
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
                  {profileData.name} ({profileData.handle}) — {profileData.role}
                </p>
              </div>

              {/* Message */}
              <p className="max-w-2xl sm:max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg font-mono text-[#4A3728] leading-relaxed font-medium px-2">
                Thanks for taking the time to journey through my portfolio! Whether you have an exciting project to build, a full-time role, contract opportunity, or just want to connect, feel free to reach out anytime.
              </p>

              {/* Action Buttons Row with target slots for the animated ENTER WORLD and SEE RESUME buttons */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4 mt-2 sm:mt-4 w-full max-w-full">
                {/* Target Slot for the animated ENTER WORLD button */}
                <div ref={thankYouButtonSlotRef} className="relative flex items-center pointer-events-none shrink-0">
                  <div className="invisible pointer-events-none inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 select-none whitespace-nowrap">
                    <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span>ENTER WORLD</span>
                  </div>
                </div>

                {/* Target Slot for the animated SEE RESUME button */}
                <div ref={thankYouResumeSlotRef} className="relative flex items-center pointer-events-none shrink-0">
                  <div className="invisible pointer-events-none inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 select-none whitespace-nowrap font-mono">
                    <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span>SEE RESUME</span>
                  </div>
                </div>

                {/* CTA: Contact Me Button (Smooth scrolls back to Chapter 06 Contact Form) */}
                <button
                  onClick={handleScrollToContact}
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3.5 bg-[#C84B31] hover:bg-[#B03E26] active:bg-[#96341F] text-[#F4EADA] font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[4px_4px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1 sm:gap-2 md:gap-3 font-pixelify whitespace-nowrap shrink-0"
                >
                  <EnvelopeSimpleIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA]" />
                  <span>CONTACT ME</span>
                </button>

                {/* CTA: Scroll to Top Button */}
                <button
                  onClick={handleScrollToTop}
                  className="px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 bg-[#E0CEBB] hover:bg-[#D4C0AB] active:bg-[#C8B29C] text-[#3E2B1D] font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1 sm:gap-1.5 font-mono whitespace-nowrap shrink-0"
                >
                  <ArrowFatUpIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 text-[#3E2B1D]" />
                  <span>SCROLL TO TOP</span>
                </button>
              </div>

              {/* Target Slot for the animated Social Links */}
              <div className="flex items-center justify-center mt-2 sm:mt-3">
                <div ref={thankYouSocialsSlotRef} className="relative flex items-center pointer-events-none">
                  <div className="invisible pointer-events-none inline-flex items-center gap-1 sm:gap-1.5 md:gap-2.5">
                    {profileData.socials.map((_, i) => (
                      <div key={i} className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D]">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                      </div>
                    ))}
                    <div className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D]">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Bottom Bar (Fixed at bottom of screen, fades out when transitioning to final thank you screen) */}
          <motion.div
            style={{
              opacity: footerOpacity,
              visibility: footerVisibility,
            }}
            className="relative z-20 w-full max-w-6xl flex flex-row items-center justify-between gap-1 sm:gap-2 md:gap-0 text-[10px] sm:text-xs md:text-sm font-mono font-bold text-[#8C6D53] border-t border-[#3E2B1D]/20 md:border-t-2 pt-1 sm:pt-1.5 md:pt-3 pointer-events-none px-1 sm:px-2 md:px-0"
          >
            {/* Target Dock Slots for both ENTER WORLD and SEE RESUME buttons side-by-side */}
            <div className="relative flex items-center justify-start gap-1 sm:gap-2 md:gap-2.5 pointer-events-none shrink-0">
              {/* Dock Slot 1: ENTER WORLD */}
              <div ref={targetSlotRef} className="relative flex items-center pointer-events-none">
                {/* Invisible footprint matching exact docked dimensions of ENTER WORLD / LOADING WORLD */}
                <div className="invisible pointer-events-none inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 select-none whitespace-nowrap">
                  <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>{isWorldCurrentlyLoading ? 'LOADING WORLD...' : 'ENTER WORLD'}</span>
                </div>
              </div>

              {/* Dock Slot 2: SEE RESUME */}
              <div ref={resumeTargetSlotRef} className="relative flex items-center pointer-events-none">
                {/* Invisible footprint matching exact docked dimensions of SEE RESUME */}
                <div className="invisible pointer-events-none inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 select-none whitespace-nowrap font-mono">
                  <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>SEE RESUME</span>
                </div>
              </div>
            </div>

            {/* Right Side: Dock Slot 3 for Social Links */}
            <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-4 pointer-events-none shrink-0">
              {/* Dock Slot 3: Socials footprint matching exact dimensions of the animated social buttons */}
              <div ref={desktopSocialsTargetRef} className="relative flex items-center pointer-events-none">
                <div className="invisible pointer-events-none inline-flex items-center gap-1 sm:gap-1.5 md:gap-2.5">
                  {profileData.socials.map((_, i) => (
                    <div key={i} className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                    </div>
                  ))}
                  <div className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2">
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

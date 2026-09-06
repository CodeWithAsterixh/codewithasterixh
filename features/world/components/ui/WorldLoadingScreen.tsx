'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';

import { useRetroAudio } from './loading/hooks/useRetroAudio';
import { useDockMorph } from './loading/hooks/useDockMorph';
import { TopHeaderBar } from './loading/sections/TopHeaderBar';
import { LeftAvatarFrame } from './loading/sections/LeftAvatarFrame';
import { HeroSection } from './loading/sections/HeroSection';
import { AboutSection } from './loading/sections/AboutSection';
import { ServicesSection } from './loading/sections/ServicesSection';
import { ExperienceSection } from './loading/sections/ExperienceSection';
import { TechStackSection } from './loading/sections/TechStackSection';
import { ProjectsSection } from './loading/sections/ProjectsSection';
import { ContactSection } from './loading/sections/ContactSection';
import { ThankYouSection } from './loading/sections/ThankYouSection';
import { DockActionButtons } from './loading/dock/DockActionButtons';
import { FooterDock } from './loading/dock/FooterDock';

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
  const { isSoundOn, toggleSound, playIfSoundOn, playRetroSoundEffect } = useRetroAudio();

  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const [activeExpIdx, setActiveExpIdx] = useState<number>(0);
  const [activeTechCategoryIdx, setActiveTechCategoryIdx] = useState<number>(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [expCharCount, setExpCharCount] = useState<number>(0);
  const [projectCharCount, setProjectCharCount] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>(profileData.images.about.src || '/images/me.png');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rawAbout = profileData.about?.content || '';
  const normalizedAbout = rawAbout.replace(/\\n/g, '\n');
  const featuredProjects = projectsData.slice(0, 4);

  // Parallax sticky scroll progress across 1200vh
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const dockMorph = useDockMorph(smoothProgress, isReady);

  // Stream characters and track chapter states on scroll
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    // About typewriter
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

    // Services
    if (latest >= 0.25) {
      setActiveServiceIdx(2);
    } else if (latest >= 0.21) {
      setActiveServiceIdx(1);
    } else if (latest >= 0.165) {
      setActiveServiceIdx(0);
    }

    // Experience
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

    // Tech stack
    if (latest >= 0.54) {
      setActiveTechCategoryIdx(2);
    } else if (latest >= 0.50) {
      setActiveTechCategoryIdx(1);
    } else if (latest >= 0.455) {
      setActiveTechCategoryIdx(0);
    }

    // Featured projects
    if (latest >= 0.595 && latest < 0.735) {
      const projRange = 0.71 - 0.61;
      const projProgress = Math.min(1, Math.max(0, (latest - 0.61) / projRange));
      const pIdx = Math.min(featuredProjects.length - 1, Math.floor(projProgress * featuredProjects.length));
      setActiveProjectIdx(pIdx);

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

  const handlePlayClick = () => {
    if (isWorldCurrentlyLoading) return;
    playIfSoundOn('start');
    if (onStart) onStart();
  };

  const handleImgError = () => {
    setImgSrc((prev) => (prev.includes('me.png') ? '/images/my-photo.png' : '/images/profile/about.png'));
  };

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      playIfSoundOn('click');
    }
  };

  const handleScrollToContact = () => {
    if (scrollContainerRef.current) {
      const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({
        top: maxScroll * 0.79,
        behavior: 'smooth',
      });
      playIfSoundOn('click');
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#F4EADA] text-[#3E2B1D] font-pixelify select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* Scroll track (1200vh tall = 7 continuous chapters) */}
      <div className="relative w-full h-[1200vh]">
        {/* Sticky viewport frame */}
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

          {/* Top Header Bar */}
          <TopHeaderBar
            opacity={dockMorph.topHeaderOpacity}
            visibility={dockMorph.topHeaderVisibility}
            isSoundOn={isSoundOn}
            onToggleSound={toggleSound}
          />

          {/* Main Side-by-Side Layout Container */}
          <div className="relative z-50 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 lg:gap-12 items-center justify-center my-auto flex-1 max-w-6xl w-full py-0.5 sm:py-2 md:py-4 pointer-events-none min-h-0">
            {/* Left Column: Fixed / Static Profile Picture Frame */}
            <LeftAvatarFrame
              opacity={dockMorph.leftAvatarOpacity}
              scale={dockMorph.leftAvatarScale}
              visibility={dockMorph.leftAvatarVisibility}
              imgSrc={imgSrc}
              onImgError={handleImgError}
            />

            {/* Right Column: Dynamic Chapter Panels */}
            <div className="col-span-1 md:col-span-7 relative w-full flex flex-col items-center md:items-start text-center md:text-left h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] max-h-[calc(100dvh-170px)] md:max-h-none justify-center pointer-events-none">
              {/* LAYER 1: Initial Intro / Stats */}
              <HeroSection
                opacity={dockMorph.initialOverviewOpacity}
                y={dockMorph.initialOverviewY}
                pointerEvents={dockMorph.initialPointerEvents}
                visibility={dockMorph.initialOverviewVisibility}
                imgSrc={imgSrc}
                onImgError={handleImgError}
              />

              {/* PERSISTENT DOCKING ACTION BUTTONS */}
              <DockActionButtons
                buttonAnchorRef={dockMorph.buttonAnchorRef}
                resumeAnchorRef={dockMorph.resumeAnchorRef}
                desktopSocialsAnchorRef={dockMorph.desktopSocialsAnchorRef}
                buttonX={dockMorph.buttonX}
                buttonY={dockMorph.buttonY}
                buttonRotateZ={dockMorph.buttonRotateZ}
                buttonRotateX={dockMorph.buttonRotateX}
                buttonScale={dockMorph.buttonScale}
                buttonShadow={dockMorph.buttonShadow}
                resumeX={dockMorph.resumeX}
                resumeY={dockMorph.resumeY}
                resumeRotateZ={dockMorph.resumeRotateZ}
                resumeRotateX={dockMorph.resumeRotateX}
                resumeScale={dockMorph.resumeScale}
                resumeShadow={dockMorph.resumeShadow}
                desktopSocialsX={dockMorph.desktopSocialsX}
                desktopSocialsY={dockMorph.desktopSocialsY}
                desktopSocialsRotateZ={dockMorph.desktopSocialsRotateZ}
                isLoading={isWorldCurrentlyLoading}
                onPlayClick={handlePlayClick}
                onLinkClick={() => playIfSoundOn('click')}
              />

              {/* LAYER 2: About Panel */}
              <AboutSection
                opacity={dockMorph.aboutPanelOpacity}
                y={dockMorph.aboutPanelY}
                rotateX={dockMorph.aboutPanelRotateX}
                scale={dockMorph.aboutPanelScale}
                pointerEvents={dockMorph.aboutPointerEvents}
                visibility={dockMorph.aboutPanelVisibility}
                charCount={charCount}
              />

              {/* LAYER 3: 3D Services Section */}
              <ServicesSection
                opacity={dockMorph.servicesPanelOpacity}
                y={dockMorph.servicesPanelY}
                scale={dockMorph.servicesPanelScale}
                rotateX={dockMorph.servicesPanelRotateX}
                pointerEvents={dockMorph.servicesPointerEvents}
                visibility={dockMorph.servicesPanelVisibility}
                activeServiceIdx={activeServiceIdx}
                onSelectService={(idx) => {
                  setActiveServiceIdx(idx);
                  playIfSoundOn('click');
                }}
              />

              {/* LAYER 4: Experience Section */}
              <ExperienceSection
                opacity={dockMorph.experiencePanelOpacity}
                y={dockMorph.experiencePanelY}
                scale={dockMorph.experiencePanelScale}
                pointerEvents={dockMorph.experiencePointerEvents}
                visibility={dockMorph.experiencePanelVisibility}
                activeExpIdx={activeExpIdx}
                expCharCount={expCharCount}
                onSelectExp={(idx) => {
                  setActiveExpIdx(idx);
                  setExpCharCount(experienceData[idx]?.description?.length || 0);
                  playIfSoundOn('click');
                }}
                onPrevExp={() => {
                  const nextIdx = Math.max(0, activeExpIdx - 1);
                  setActiveExpIdx(nextIdx);
                  setExpCharCount(experienceData[nextIdx]?.description?.length || 0);
                  playIfSoundOn('click');
                }}
                onNextExp={() => {
                  const nextIdx = Math.min(experienceData.length - 1, activeExpIdx + 1);
                  setActiveExpIdx(nextIdx);
                  setExpCharCount(experienceData[nextIdx]?.description?.length || 0);
                  playIfSoundOn('click');
                }}
              />

              {/* LAYER 5: Technologies Section */}
              <TechStackSection
                opacity={dockMorph.techPanelOpacity}
                y={dockMorph.techPanelY}
                scale={dockMorph.techPanelScale}
                pointerEvents={dockMorph.techPointerEvents}
                visibility={dockMorph.techPanelVisibility}
                activeTechCategoryIdx={activeTechCategoryIdx}
                onSelectCategory={(idx) => {
                  setActiveTechCategoryIdx(idx);
                  playIfSoundOn('click');
                }}
                onPrevCategory={() => {
                  const nextIdx = Math.max(0, activeTechCategoryIdx - 1);
                  setActiveTechCategoryIdx(nextIdx);
                  playIfSoundOn('click');
                }}
                onNextCategory={() => {
                  const techCategories = Object.keys(profileData) as any;
                  const nextIdx = Math.min(3, activeTechCategoryIdx + 1);
                  setActiveTechCategoryIdx(nextIdx);
                  playIfSoundOn('click');
                }}
                onLinkClick={() => playIfSoundOn('click')}
              />

              {/* LAYER 6: Featured Projects Section */}
              <ProjectsSection
                opacity={dockMorph.projectsPanelOpacity}
                y={dockMorph.projectsPanelY}
                scale={dockMorph.projectsPanelScale}
                pointerEvents={dockMorph.projectsPointerEvents}
                visibility={dockMorph.projectsPanelVisibility}
                activeProjectIdx={activeProjectIdx}
                projectCharCount={projectCharCount}
                onSelectProject={(idx) => {
                  setActiveProjectIdx(idx);
                  setProjectCharCount(featuredProjects[idx]?.excerpt?.length || 0);
                  playIfSoundOn('click');
                }}
                onPrevProject={() => {
                  const nextIdx = Math.max(0, activeProjectIdx - 1);
                  setActiveProjectIdx(nextIdx);
                  setProjectCharCount(featuredProjects[nextIdx]?.excerpt?.length || 0);
                  playIfSoundOn('click');
                }}
                onNextProject={() => {
                  const nextIdx = Math.min(featuredProjects.length - 1, activeProjectIdx + 1);
                  setActiveProjectIdx(nextIdx);
                  setProjectCharCount(featuredProjects[nextIdx]?.excerpt?.length || 0);
                  playIfSoundOn('click');
                }}
                onLinkClick={() => playIfSoundOn('click')}
              />

              {/* LAYER 7: Contact Form */}
              <ContactSection
                opacity={dockMorph.contactPanelOpacity}
                y={dockMorph.contactPanelY}
                scale={dockMorph.contactPanelScale}
                pointerEvents={dockMorph.contactPointerEvents}
                visibility={dockMorph.contactPanelVisibility}
                isSoundOn={isSoundOn}
                onPlaySound={playRetroSoundEffect}
              />
            </div>
          </div>

          {/* LAYER 8: Final Thank You Screen */}
          <ThankYouSection
            opacity={dockMorph.thankYouOpacity}
            pointerEvents={dockMorph.thankYouPointerEvents}
            visibility={dockMorph.thankYouVisibility}
            thankYouButtonSlotRef={dockMorph.thankYouButtonSlotRef}
            thankYouResumeSlotRef={dockMorph.thankYouResumeSlotRef}
            thankYouSocialsSlotRef={dockMorph.thankYouSocialsSlotRef}
            onContactClick={handleScrollToContact}
            onScrollToTop={handleScrollToTop}
          />

          {/* Footer Bottom Bar */}
          <FooterDock
            opacity={dockMorph.footerOpacity}
            visibility={dockMorph.footerVisibility}
            targetSlotRef={dockMorph.targetSlotRef}
            resumeTargetSlotRef={dockMorph.resumeTargetSlotRef}
            desktopSocialsTargetRef={dockMorph.desktopSocialsTargetRef}
            isLoading={isWorldCurrentlyLoading}
          />
        </div>
      </div>
    </div>
  );
};

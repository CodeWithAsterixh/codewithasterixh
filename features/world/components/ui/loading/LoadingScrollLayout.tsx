'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TopHeaderBar } from './sections/TopHeaderBar';
import { LeftAvatarFrame } from './sections/LeftAvatarFrame';
import { LoadingSectionsContainer } from './LoadingSectionsContainer';
import { LoadingThankYouContainer } from './LoadingThankYouContainer';
import { LoadingDockContainer } from './LoadingDockContainer';
import { useLoadingScroll } from './context/LoadingScrollContext';

export const LoadingScrollLayout: React.FC = () => {
  const { scrollContainerRef, smoothProgress, imgSrc, setImgSrc, audio, dockMorph } = useLoadingScroll();

  const handleImgError = () => {
    setImgSrc(imgSrc.includes('me.png') ? '/images/my-photo.png' : '/images/profile/about.png');
  };

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#F4EADA] text-[#3E2B1D] font-pixelify select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="relative w-full h-[1200vh]">
        <div className="sticky top-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col items-center justify-between p-2 sm:p-4 md:p-8 pb-2 sm:pb-3 md:pb-6 overflow-hidden pointer-events-auto">
          {/* Subtle Grid / Texture Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#3E2B1D 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Sticky Parallax Scroll Progress Bar */}
          <motion.div
            style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
            className="absolute top-0 left-0 right-0 h-1 bg-[#C84B31] z-50 shadow-[0_1px_0_#3E2B1D]"
          />

          {/* Top Header Bar */}
          <TopHeaderBar
            opacity={dockMorph.topHeaderOpacity}
            visibility={dockMorph.topHeaderVisibility}
            isSoundOn={audio.isSoundOn}
            onToggleSound={audio.toggleSound}
          />

          {/* Main Side-by-Side Layout Container */}
          <div className="relative z-50 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 md:gap-8 lg:gap-12 items-center justify-center my-auto flex-1 max-w-6xl w-full py-0.5 sm:py-2 md:py-4 pointer-events-none min-h-0">
            <LeftAvatarFrame
              opacity={dockMorph.leftAvatarOpacity}
              scale={dockMorph.leftAvatarScale}
              visibility={dockMorph.leftAvatarVisibility}
              imgSrc={imgSrc}
              onImgError={handleImgError}
            />

            {/* Right Column: Dynamic Area */}
            <div className="col-span-1 md:col-span-7 relative w-full flex flex-col items-center md:items-start text-center md:text-left h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] max-h-[calc(100dvh-170px)] md:max-h-none justify-center pointer-events-none">
              <LoadingSectionsContainer />
            </div>
          </div>

          {/* Fullscreen Thank You Section (Chapter 07) */}
          <LoadingThankYouContainer />

          {/* Fixed Footer Dock */}
          <LoadingDockContainer />
        </div>
      </div>
    </div>
  );
};


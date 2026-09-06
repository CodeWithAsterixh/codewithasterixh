'use client';

import React from 'react';
import { ThankYouSection } from './sections/ThankYouSection';
import { useLoadingScroll } from './context/LoadingScrollContext';

export const LoadingThankYouContainer: React.FC = () => {
  const { scrollContainerRef, audio, dockMorph } = useLoadingScroll();

  const handleScrollToTop = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      if (audio.isSoundOn) audio.playRetroSoundEffect('click');
    }
  };

  const handleScrollToContact = () => {
    if (scrollContainerRef?.current) {
      const scrollH = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({ top: scrollH * 0.79, behavior: 'smooth' });
      if (audio.isSoundOn) audio.playRetroSoundEffect('click');
    }
  };

  return (
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
  );
};

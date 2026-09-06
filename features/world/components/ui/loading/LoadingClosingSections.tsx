'use client';

import React from 'react';
import { ContactSection } from './sections/ContactSection';
import { useLoadingScroll } from './context/LoadingScrollContext';

export const LoadingClosingSections: React.FC = () => {
  const { audio, dockMorph } = useLoadingScroll();

  return (
    <ContactSection
      opacity={dockMorph.contactPanelOpacity}
      y={dockMorph.contactPanelY}
      scale={dockMorph.contactPanelScale}
      pointerEvents={dockMorph.contactPointerEvents}
      visibility={dockMorph.contactPanelVisibility}
      isSoundOn={audio.isSoundOn}
      onPlaySound={audio.playRetroSoundEffect}
    />
  );
};

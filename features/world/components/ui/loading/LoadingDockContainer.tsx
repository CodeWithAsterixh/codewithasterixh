'use client';

import React from 'react';
import { FooterDock } from './dock/FooterDock';
import { useLoadingScroll } from './context/LoadingScrollContext';

export const LoadingDockContainer: React.FC = () => {
  const { dockMorph, isWorldCurrentlyLoading } = useLoadingScroll();

  return (
    <FooterDock
      opacity={dockMorph.footerOpacity}
      visibility={dockMorph.footerVisibility}
      targetSlotRef={dockMorph.targetSlotRef}
      resumeTargetSlotRef={dockMorph.resumeTargetSlotRef}
      desktopSocialsTargetRef={dockMorph.desktopSocialsTargetRef}
      isLoading={isWorldCurrentlyLoading}
    />
  );
};


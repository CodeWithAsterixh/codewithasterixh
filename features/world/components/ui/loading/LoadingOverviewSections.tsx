'use client';

import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { DockActionButtons } from './dock/DockActionButtons';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { useLoadingScroll } from './context/LoadingScrollContext';

export const LoadingOverviewSections: React.FC = () => {
  const {
    imgSrc,
    setImgSrc,
    activeServiceIdx,
    setActiveServiceIdx,
    charCount,
    audio,
    dockMorph,
    isWorldCurrentlyLoading,
    onStart,
  } = useLoadingScroll();

  const handleImgError = () => {
    setImgSrc(imgSrc.includes('me.png') ? '/images/my-photo.png' : '/images/profile/about.png');
  };

  const handleSelectService = (idx: number) => {
    setActiveServiceIdx(idx);
    if (audio.isSoundOn) audio.playRetroSoundEffect('click');
  };

  const handlePlayClick = () => {
    if (isWorldCurrentlyLoading) return;
    if (audio.isSoundOn) audio.playRetroSoundEffect('start');
    if (onStart) onStart();
  };

  const handleLinkClick = () => {
    if (audio.isSoundOn) audio.playRetroSoundEffect('click');
  };

  return (
    <>
      <HeroSection
        opacity={dockMorph.initialOverviewOpacity}
        y={dockMorph.initialOverviewY}
        pointerEvents={dockMorph.initialPointerEvents}
        visibility={dockMorph.initialOverviewVisibility}
        imgSrc={imgSrc}
        onImgError={handleImgError}
      />
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
        onLinkClick={handleLinkClick}
      />
      <AboutSection
        opacity={dockMorph.aboutPanelOpacity}
        y={dockMorph.aboutPanelY}
        rotateX={dockMorph.aboutPanelRotateX}
        scale={dockMorph.aboutPanelScale}
        pointerEvents={dockMorph.aboutPointerEvents}
        visibility={dockMorph.aboutPanelVisibility}
        charCount={charCount}
      />
      <ServicesSection
        opacity={dockMorph.servicesPanelOpacity}
        y={dockMorph.servicesPanelY}
        scale={dockMorph.servicesPanelScale}
        rotateX={dockMorph.servicesPanelRotateX}
        pointerEvents={dockMorph.servicesPointerEvents}
        visibility={dockMorph.servicesPanelVisibility}
        activeServiceIdx={activeServiceIdx}
        onSelectService={handleSelectService}
      />
    </>
  );
};

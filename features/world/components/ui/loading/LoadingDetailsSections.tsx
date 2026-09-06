'use client';

import React from 'react';
import { ExperienceSection } from './sections/ExperienceSection';
import { TechStackSection } from './sections/TechStackSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { useLoadingScroll } from './context/LoadingScrollContext';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';

export const LoadingDetailsSections: React.FC = () => {
  const {
    activeExpIdx,
    setActiveExpIdx,
    activeTechCategoryIdx,
    setActiveTechCategoryIdx,
    activeProjectIdx,
    setActiveProjectIdx,
    expCharCount,
    setExpCharCount,
    projectCharCount,
    setProjectCharCount,
    audio,
    dockMorph,
  } = useLoadingScroll();

  const handleSelectExp = (idx: number) => {
    setActiveExpIdx(idx);
    setExpCharCount(experienceData[idx]?.description?.length || 0);
    if (audio.isSoundOn) audio.playRetroSoundEffect('click');
  };

  const handleSelectProject = (idx: number) => {
    setActiveProjectIdx(idx);
    setProjectCharCount(projectsData[idx]?.excerpt?.length || 0);
    if (audio.isSoundOn) audio.playRetroSoundEffect('click');
  };

  const handleSelectTechCat = (idx: number) => {
    setActiveTechCategoryIdx(idx);
    if (audio.isSoundOn) audio.playRetroSoundEffect('click');
  };

  return (
    <>
      <ExperienceSection
        opacity={dockMorph.experiencePanelOpacity}
        y={dockMorph.experiencePanelY}
        scale={dockMorph.experiencePanelScale}
        pointerEvents={dockMorph.experiencePointerEvents}
        visibility={dockMorph.experiencePanelVisibility}
        activeExpIdx={activeExpIdx}
        expCharCount={expCharCount}
        onSelectExp={handleSelectExp}
        onPrevExp={() => handleSelectExp(Math.max(0, activeExpIdx - 1))}
        onNextExp={() => handleSelectExp(Math.min(experienceData.length - 1, activeExpIdx + 1))}
      />
      <TechStackSection
        opacity={dockMorph.techPanelOpacity}
        y={dockMorph.techPanelY}
        scale={dockMorph.techPanelScale}
        pointerEvents={dockMorph.techPointerEvents}
        visibility={dockMorph.techPanelVisibility}
        activeTechCategoryIdx={activeTechCategoryIdx}
        onSelectCategory={handleSelectTechCat}
        onPrevCategory={() => handleSelectTechCat(Math.max(0, activeTechCategoryIdx - 1))}
        onNextCategory={() => handleSelectTechCat(Math.min(5, activeTechCategoryIdx + 1))}
        onLinkClick={() => audio.isSoundOn && audio.playRetroSoundEffect('click')}
      />
      <ProjectsSection
        opacity={dockMorph.projectsPanelOpacity}
        y={dockMorph.projectsPanelY}
        scale={dockMorph.projectsPanelScale}
        pointerEvents={dockMorph.projectsPointerEvents}
        visibility={dockMorph.projectsPanelVisibility}
        activeProjectIdx={activeProjectIdx}
        projectCharCount={projectCharCount}
        onSelectProject={handleSelectProject}
        onPrevProject={() => handleSelectProject(Math.max(0, activeProjectIdx - 1))}
        onNextProject={() => handleSelectProject(Math.min(3, activeProjectIdx + 1))}
        onLinkClick={() => audio.isSoundOn && audio.playRetroSoundEffect('click')}
      />
    </>
  );
};

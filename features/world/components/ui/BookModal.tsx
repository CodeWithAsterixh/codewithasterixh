'use client';

import React, { useMemo, useState } from 'react';
import projectsData from '@/data/projects.json';
import profileData from '@/data/profile.json';
import techStackData from '@/data/tech-stack.json';
import { useBookAnimation } from './book/hooks/useBookAnimation';
import { MobileBookView } from './book/MobileBookView';
import { DesktopBookSpread } from './book/DesktopBookSpread';
import { useModalContext } from '../../context/ModalStateContext';

const CATEGORIES = ['All', 'Web Development', 'Full-stack'];

export const BookModal: React.FC = () => {
  const {
    bookModalState,
    setBookModalState,
    handleOpenContactTileset,
    handleOpenProjectDetailFromBook,
  } = useModalContext();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

  const handleClose = () => setBookModalState((prev) => ({ ...prev, isOpen: false }));

  const { canvasRef, animState, currentTab, setCurrentTab, handleTriggerClose } = useBookAnimation(
    bookModalState.isOpen,
    bookModalState.mode,
    handleClose
  );

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p: any) => p.category === selectedCategory || p.tags?.includes(selectedCategory));
  }, [selectedCategory]);

  const activeProject = filteredProjects[selectedProjectIndex] || filteredProjects[0] || projectsData[0];

  const skillsList = useMemo(() => {
    return Array.from(
      new Set([
        ...(techStackData.Technical?.map((s) => s.name) || []),
        ...(techStackData['Creative & UI']?.map((s) => s.name) || []),
        ...(techStackData['Other Skills']?.map((s) => s.name) || []),
        ...(profileData.hero?.badges?.flatMap((b: any) => b.items) || []),
      ])
    );
  }, []);

  if (!bookModalState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none font-pixelify">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,155,243,0.15)_0%,transparent_70%)] pointer-events-none" />

      {animState !== 'opened' && (
        <div className="flex flex-col items-center justify-center">
          <canvas ref={canvasRef} width={272} height={272} className="w-56 h-56 sm:w-72 sm:h-72 drop-shadow-2xl" />
          <span className="text-xs uppercase tracking-widest text-[#EADBCC] opacity-80 mt-2 animate-pulse">
            {animState === 'opening' ? 'Opening Book...' : 'Closing Book...'}
          </span>
        </div>
      )}

      {animState === 'opened' && (
        <>
          <MobileBookView
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onClose={handleTriggerClose}
            onOpenContact={handleOpenContactTileset}
            onOpenProjectDetail={handleOpenProjectDetailFromBook}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProjectIndex={selectedProjectIndex}
            setSelectedProjectIndex={setSelectedProjectIndex}
            filteredProjects={filteredProjects}
            activeProject={activeProject}
            categories={CATEGORIES}
            skillsList={skillsList}
          />
          <DesktopBookSpread
            currentTab={currentTab}
            onClose={handleTriggerClose}
            onOpenContact={handleOpenContactTileset}
            onOpenProjectDetail={handleOpenProjectDetailFromBook}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProjectIndex={selectedProjectIndex}
            setSelectedProjectIndex={setSelectedProjectIndex}
            filteredProjects={filteredProjects}
            activeProject={activeProject}
            categories={CATEGORIES}
            skillsList={skillsList}
          />
        </>
      )}
    </div>
  );
};

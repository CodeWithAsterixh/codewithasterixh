'use client';

import React, { createContext, useContext, useState, useRef } from 'react';
import { useScroll, useSpring, MotionValue } from 'framer-motion';
import profileData from '@/data/profile.json';
import { useRetroAudio } from '../hooks/useRetroAudio';
import { useDockMorph } from '../hooks/useDockMorph';
import { useScrollProgressSync } from '../hooks/useScrollProgressSync';

interface LoadingScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  smoothProgress: MotionValue<number>;
  activeServiceIdx: number;
  setActiveServiceIdx: React.Dispatch<React.SetStateAction<number>>;
  activeExpIdx: number;
  setActiveExpIdx: React.Dispatch<React.SetStateAction<number>>;
  activeTechCategoryIdx: number;
  setActiveTechCategoryIdx: React.Dispatch<React.SetStateAction<number>>;
  activeProjectIdx: number;
  setActiveProjectIdx: React.Dispatch<React.SetStateAction<number>>;
  charCount: number;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
  expCharCount: number;
  setExpCharCount: React.Dispatch<React.SetStateAction<number>>;
  projectCharCount: number;
  setProjectCharCount: React.Dispatch<React.SetStateAction<number>>;
  imgSrc: string;
  setImgSrc: (src: string) => void;
  audio: ReturnType<typeof useRetroAudio>;
  dockMorph: ReturnType<typeof useDockMorph>;
  isWorldCurrentlyLoading: boolean;
  onStart?: () => void;
}

const LoadingScrollContext = createContext<LoadingScrollContextType | null>(null);

export const LoadingScrollProvider: React.FC<{
  children: React.ReactNode;
  isLoading?: boolean;
  onStart?: () => void;
}> = ({ children, isLoading = false, onStart }) => {
  const isWorldCurrentlyLoading = Boolean(isLoading);
  const audio = useRetroAudio();

  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeExpIdx, setActiveExpIdx] = useState(0);
  const [activeTechCategoryIdx, setActiveTechCategoryIdx] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [expCharCount, setExpCharCount] = useState(0);
  const [projectCharCount, setProjectCharCount] = useState(0);
  const [imgSrc, setImgSrc] = useState(profileData.images.about.src || '/images/me.png');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const dockMorph = useDockMorph(smoothProgress, true);

  useScrollProgressSync(smoothProgress, {
    setCharCount,
    setActiveServiceIdx,
    setActiveExpIdx,
    setExpCharCount,
    setActiveTechCategoryIdx,
    setActiveProjectIdx,
    setProjectCharCount,
  });

  return (
    <LoadingScrollContext.Provider
      value={{
        scrollContainerRef,
        smoothProgress,
        activeServiceIdx,
        setActiveServiceIdx,
        activeExpIdx,
        setActiveExpIdx,
        activeTechCategoryIdx,
        setActiveTechCategoryIdx,
        activeProjectIdx,
        setActiveProjectIdx,
        charCount,
        setCharCount,
        expCharCount,
        setExpCharCount,
        projectCharCount,
        setProjectCharCount,
        imgSrc,
        setImgSrc,
        audio,
        dockMorph,
        isWorldCurrentlyLoading,
        onStart,
      }}
    >
      {children}
    </LoadingScrollContext.Provider>
  );
};

export function useLoadingScroll(): LoadingScrollContextType {
  const ctx = useContext(LoadingScrollContext);
  if (!ctx) throw new Error('useLoadingScroll must be used within LoadingScrollProvider');
  return ctx;
}


'use client';

import { useMotionValueEvent, MotionValue } from 'framer-motion';
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';

interface ScrollSyncHandlers {
  setCharCount: (n: number) => void;
  setActiveServiceIdx: (n: number) => void;
  setActiveExpIdx: (n: number) => void;
  setExpCharCount: (n: number) => void;
  setActiveTechCategoryIdx: (n: number) => void;
  setActiveProjectIdx: (n: number) => void;
  setProjectCharCount: (n: number) => void;
}

export function useScrollProgressSync(
  smoothProgress: MotionValue<number>,
  handlers: ScrollSyncHandlers
) {
  const normalizedAbout = (profileData.about?.content || '').replace(/\\n/g, '\n');

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    // About typewriter
    if (latest <= 0.04) handlers.setCharCount(0);
    else if (latest >= 0.13) handlers.setCharCount(normalizedAbout.length);
    else handlers.setCharCount(Math.round(((latest - 0.04) / 0.09) * normalizedAbout.length));

    // Services
    if (latest >= 0.25) handlers.setActiveServiceIdx(2);
    else if (latest >= 0.21) handlers.setActiveServiceIdx(1);
    else if (latest >= 0.165) handlers.setActiveServiceIdx(0);

    // Experience
    const expIdx = latest >= 0.41 ? 3 : latest >= 0.375 ? 2 : latest >= 0.34 ? 1 : 0;
    handlers.setActiveExpIdx(expIdx);
    const expDesc = experienceData[expIdx]?.description || '';
    const tStart = 0.305 + expIdx * 0.035;
    if (latest <= tStart) handlers.setExpCharCount(0);
    else if (latest >= tStart + 0.025) handlers.setExpCharCount(expDesc.length);
    else handlers.setExpCharCount(Math.round(((latest - tStart) / 0.025) * expDesc.length));

    // Tech stack
    if (latest >= 0.58) handlers.setActiveTechCategoryIdx(2);
    else if (latest >= 0.52) handlers.setActiveTechCategoryIdx(1);
    else if (latest >= 0.46) handlers.setActiveTechCategoryIdx(0);

    // Projects
    const projIdx = latest >= 0.77 ? 3 : latest >= 0.72 ? 2 : latest >= 0.67 ? 1 : 0;
    handlers.setActiveProjectIdx(projIdx);
    const pDesc = projectsData[projIdx]?.problem || projectsData[projIdx]?.excerpt || '';
    const pStart = 0.63 + projIdx * 0.045;
    if (latest <= pStart) handlers.setProjectCharCount(0);
    else if (latest >= pStart + 0.03) handlers.setProjectCharCount(pDesc.length);
    else handlers.setProjectCharCount(Math.round(((latest - pStart) / 0.03) * pDesc.length));
  });
}

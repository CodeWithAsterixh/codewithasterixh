'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MotionValue } from 'framer-motion';

export function useDockMorphDeltas(isReady: boolean, smoothProgress?: MotionValue<number>) {
  const buttonAnchorRef = useRef<HTMLDivElement>(null);
  const targetSlotRef = useRef<HTMLDivElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const resumeAnchorRef = useRef<HTMLDivElement>(null);
  const resumeTargetSlotRef = useRef<HTMLDivElement>(null);
  const [resumeDelta, setResumeDelta] = useState({ x: 0, y: 0 });

  const desktopSocialsAnchorRef = useRef<HTMLDivElement>(null);
  const desktopSocialsTargetRef = useRef<HTMLDivElement>(null);
  const [desktopSocialsDelta, setDesktopSocialsDelta] = useState({ x: 0, y: 0 });

  const thankYouButtonSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouButtonDelta, setThankYouButtonDelta] = useState({ x: 0, y: 0 });
  const thankYouResumeSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouResumeDelta, setThankYouResumeDelta] = useState({ x: 0, y: 0 });
  const thankYouSocialsSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouSocialsDelta, setThankYouSocialsDelta] = useState({ x: 0, y: 0 });

  const updateDeltas = useCallback(() => {
    if (buttonAnchorRef.current && targetSlotRef.current) {
      const anchor = buttonAnchorRef.current.getBoundingClientRect();
      const target = targetSlotRef.current.getBoundingClientRect();
      setDelta({ x: target.left - anchor.left, y: target.top - anchor.top });
    }
    if (resumeAnchorRef.current && resumeTargetSlotRef.current) {
      const anchor = resumeAnchorRef.current.getBoundingClientRect();
      const target = resumeTargetSlotRef.current.getBoundingClientRect();
      setResumeDelta({ x: target.left - anchor.left, y: target.top - anchor.top });
    }
    if (desktopSocialsAnchorRef.current && desktopSocialsTargetRef.current) {
      const anchor = desktopSocialsAnchorRef.current.getBoundingClientRect();
      const target = desktopSocialsTargetRef.current.getBoundingClientRect();
      setDesktopSocialsDelta({ x: target.left - anchor.left, y: target.top - anchor.top });
    }
    if (buttonAnchorRef.current && thankYouButtonSlotRef.current) {
      const anchor = buttonAnchorRef.current.getBoundingClientRect();
      const target = thankYouButtonSlotRef.current.getBoundingClientRect();
      setThankYouButtonDelta({ x: target.left - anchor.left, y: target.top - anchor.top });
    }
    if (resumeAnchorRef.current && thankYouResumeSlotRef.current) {
      const anchor = resumeAnchorRef.current.getBoundingClientRect();
      const target = thankYouResumeSlotRef.current.getBoundingClientRect();
      setThankYouResumeDelta({ x: target.left - anchor.left, y: target.top - anchor.top });
    }
    if (desktopSocialsAnchorRef.current && thankYouSocialsSlotRef.current) {
      const anchor = desktopSocialsAnchorRef.current.getBoundingClientRect();
      const target = thankYouSocialsSlotRef.current.getBoundingClientRect();
      setThankYouSocialsDelta({ x: target.left - anchor.left, y: target.top - anchor.top });
    }
  }, []);

  useEffect(() => {
    updateDeltas();
    const rafId = requestAnimationFrame(updateDeltas);
    const t1 = setTimeout(updateDeltas, 100);
    const t2 = setTimeout(updateDeltas, 300);
    const t3 = setTimeout(updateDeltas, 800);
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updateDeltas).catch(() => {});
    }
    window.addEventListener('resize', updateDeltas);
    window.addEventListener('load', updateDeltas);

    let unsubscribe: (() => void) | undefined;
    if (smoothProgress) {
      let lastP = 0;
      unsubscribe = smoothProgress.on('change', (p) => {
        if (Math.abs(p - lastP) > 0.04 || (p > 0.80 && lastP <= 0.80)) {
          lastP = p;
          updateDeltas();
        }
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateDeltas);
      window.removeEventListener('load', updateDeltas);
      if (unsubscribe) unsubscribe();
    };
  }, [isReady, updateDeltas, smoothProgress]);

  return {
    buttonAnchorRef,
    targetSlotRef,
    delta,
    resumeAnchorRef,
    resumeTargetSlotRef,
    resumeDelta,
    desktopSocialsAnchorRef,
    desktopSocialsTargetRef,
    desktopSocialsDelta,
    thankYouButtonSlotRef,
    thankYouButtonDelta,
    thankYouResumeSlotRef,
    thankYouResumeDelta,
    thankYouSocialsSlotRef,
    thankYouSocialsDelta,
  };
}

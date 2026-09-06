'use client';

import { useState, useRef, useEffect } from 'react';
import { MotionValue, useTransform } from 'framer-motion';

export function useDockMorph(smoothProgress: MotionValue<number>, isReady: boolean) {
  // Enter button anchors & deltas
  const buttonAnchorRef = useRef<HTMLDivElement>(null);
  const targetSlotRef = useRef<HTMLDivElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  // Resume button anchors & deltas
  const resumeAnchorRef = useRef<HTMLDivElement>(null);
  const resumeTargetSlotRef = useRef<HTMLDivElement>(null);
  const [resumeDelta, setResumeDelta] = useState({ x: 0, y: 0 });

  // Desktop Social buttons anchors & deltas
  const desktopSocialsAnchorRef = useRef<HTMLDivElement>(null);
  const desktopSocialsTargetRef = useRef<HTMLDivElement>(null);
  const [desktopSocialsDelta, setDesktopSocialsDelta] = useState({ x: 0, y: 0 });

  // Thank You screen target slots & deltas
  const thankYouButtonSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouButtonDelta, setThankYouButtonDelta] = useState({ x: 0, y: 0 });
  const thankYouResumeSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouResumeDelta, setThankYouResumeDelta] = useState({ x: 0, y: 0 });
  const thankYouSocialsSlotRef = useRef<HTMLDivElement>(null);
  const [thankYouSocialsDelta, setThankYouSocialsDelta] = useState({ x: 0, y: 0 });

  // Calculate dynamic deltas for buttons & desktop socials to dock at bottom
  useEffect(() => {
    const updateDeltas = () => {
      if (buttonAnchorRef.current && targetSlotRef.current) {
        const anchorRect = buttonAnchorRef.current.getBoundingClientRect();
        const targetRect = targetSlotRef.current.getBoundingClientRect();
        setDelta({
          x: targetRect.left - anchorRect.left,
          y: targetRect.top - anchorRect.top,
        });
      }
      if (resumeAnchorRef.current && resumeTargetSlotRef.current) {
        const resumeAnchorRect = resumeAnchorRef.current.getBoundingClientRect();
        const resumeTargetRect = resumeTargetSlotRef.current.getBoundingClientRect();
        setResumeDelta({
          x: resumeTargetRect.left - resumeAnchorRect.left,
          y: resumeTargetRect.top - resumeAnchorRect.top,
        });
      }
      if (desktopSocialsAnchorRef.current && desktopSocialsTargetRef.current) {
        const socialsAnchorRect = desktopSocialsAnchorRef.current.getBoundingClientRect();
        const socialsTargetRect = desktopSocialsTargetRef.current.getBoundingClientRect();
        setDesktopSocialsDelta({
          x: socialsTargetRect.left - socialsAnchorRect.left,
          y: socialsTargetRect.top - socialsAnchorRect.top,
        });
      }
      // Target slot measurements on final Thank You screen
      if (buttonAnchorRef.current && thankYouButtonSlotRef.current) {
        const anchorRect = buttonAnchorRef.current.getBoundingClientRect();
        const targetRect = thankYouButtonSlotRef.current.getBoundingClientRect();
        setThankYouButtonDelta({
          x: targetRect.left - anchorRect.left,
          y: targetRect.top - anchorRect.top,
        });
      }
      if (resumeAnchorRef.current && thankYouResumeSlotRef.current) {
        const resumeAnchorRect = resumeAnchorRef.current.getBoundingClientRect();
        const resumeTargetRect = thankYouResumeSlotRef.current.getBoundingClientRect();
        setThankYouResumeDelta({
          x: resumeTargetRect.left - resumeAnchorRect.left,
          y: resumeTargetRect.top - resumeAnchorRect.top,
        });
      }
      if (desktopSocialsAnchorRef.current && thankYouSocialsSlotRef.current) {
        const socialsAnchorRect = desktopSocialsAnchorRef.current.getBoundingClientRect();
        const socialsTargetRect = thankYouSocialsSlotRef.current.getBoundingClientRect();
        setThankYouSocialsDelta({
          x: socialsTargetRect.left - socialsAnchorRect.left,
          y: socialsTargetRect.top - socialsAnchorRect.top,
        });
      }
    };

    updateDeltas();
    const rafId = requestAnimationFrame(updateDeltas);
    const timeout1 = setTimeout(updateDeltas, 100);
    const timeout2 = setTimeout(updateDeltas, 300);
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(updateDeltas).catch(() => { });
    }
    window.addEventListener('resize', updateDeltas);
    window.addEventListener('load', updateDeltas);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      window.removeEventListener('resize', updateDeltas);
      window.removeEventListener('load', updateDeltas);
    };
  }, [isReady]);

  // Motion transforms for ENTER WORLD button
  const buttonX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * delta.x;
    }
    if (p < 0.855) {
      return delta.x;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return delta.x + t2 * (thankYouButtonDelta.x - delta.x);
  });
  const buttonY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * delta.y;
    }
    if (p < 0.855) {
      return delta.y;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return delta.y + t2 * (thankYouButtonDelta.y - delta.y);
  });
  const buttonRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, -2, 1, 0, 0, 1.5, 0]);
  const buttonRotateX = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [0, 10, 0, 0, 8, 0]);
  const buttonScale = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [1, 1.02, 1, 1, 1.03, 1]);
  const buttonShadow = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [
    '4px 4px 0px #3E2B1D',
    '8px 8px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '6px 6px 0px #3E2B1D',
    '4px 4px 0px #3E2B1D',
  ]);

  // Motion transforms for SEE RESUME button
  const resumeX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * resumeDelta.x;
    }
    if (p < 0.855) {
      return resumeDelta.x;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return resumeDelta.x + t2 * (thankYouResumeDelta.x - resumeDelta.x);
  });
  const resumeY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * resumeDelta.y;
    }
    if (p < 0.855) {
      return resumeDelta.y;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return resumeDelta.y + t2 * (thankYouResumeDelta.y - resumeDelta.y);
  });
  const resumeRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, 2, -1, 0, 0, -1.5, 0]);
  const resumeRotateX = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [0, 10, 0, 0, 8, 0]);
  const resumeScale = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [1, 1.02, 1, 1, 1.03, 1]);
  const resumeShadow = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [
    '3px 3px 0px #3E2B1D',
    '8px 8px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
    '6px 6px 0px #3E2B1D',
    '3px 3px 0px #3E2B1D',
  ]);

  // Motion transforms for Desktop Social buttons
  const desktopSocialsX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * desktopSocialsDelta.x;
    }
    if (p < 0.855) {
      return desktopSocialsDelta.x;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return desktopSocialsDelta.x + t2 * (thankYouSocialsDelta.x - desktopSocialsDelta.x);
  });
  const desktopSocialsY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) {
      const t1 = Math.max(0, p / 0.035);
      return t1 * desktopSocialsDelta.y;
    }
    if (p < 0.855) {
      return desktopSocialsDelta.y;
    }
    const t2 = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return desktopSocialsDelta.y + t2 * (thankYouSocialsDelta.y - desktopSocialsDelta.y);
  });
  const desktopSocialsRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, -1.5, 1, 0, 0, 1, 0]);

  // Common Header & Avatar Visibility
  const topHeaderOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const topHeaderVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  const leftAvatarOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const leftAvatarScale = useTransform(smoothProgress, [0.855, 0.875], [1, 0.92]);
  const leftAvatarVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  // Layer Visibility and Transitions
  const initialOverviewOpacity = useTransform(smoothProgress, [0, 0.03], [1, 0]);
  const initialOverviewY = useTransform(smoothProgress, [0, 0.03], [0, -10]);
  const initialPointerEvents = useTransform(smoothProgress, (p) => (p > 0.03 ? 'none' : 'auto'));
  const initialOverviewVisibility = useTransform(smoothProgress, (p) => (p < 0.035 ? 'visible' : 'hidden'));

  const aboutPanelOpacity = useTransform(smoothProgress, [0.015, 0.035, 0.145, 0.16], [0, 1, 1, 0]);
  const aboutPanelY = useTransform(smoothProgress, [0.015, 0.035, 0.145, 0.16], [14, 0, 0, -20]);
  const aboutPanelRotateX = useTransform(smoothProgress, [0.145, 0.16], [0, 20]);
  const aboutPanelScale = useTransform(smoothProgress, [0.145, 0.16], [1, 0.88]);
  const aboutPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.025 && p < 0.16 ? 'auto' : 'none'));
  const aboutPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.015 && p < 0.16 ? 'visible' : 'hidden'));

  const servicesPanelOpacity = useTransform(smoothProgress, [0.16, 0.175, 0.285, 0.30], [0, 1, 1, 0]);
  const servicesPanelY = useTransform(smoothProgress, [0.16, 0.175, 0.285, 0.30], [16, 0, 0, -18]);
  const servicesPanelScale = useTransform(smoothProgress, [0.16, 0.18, 0.285, 0.30], [0.92, 1, 1, 0.90]);
  const servicesPanelRotateX = useTransform(smoothProgress, [0.16, 0.18, 0.285, 0.30], [-12, 0, 0, 14]);
  const servicesPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.16 && p < 0.30 ? 'auto' : 'none'));
  const servicesPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.16 && p < 0.30 ? 'visible' : 'hidden'));

  const experiencePanelOpacity = useTransform(smoothProgress, [0.30, 0.315, 0.435, 0.45], [0, 1, 1, 0]);
  const experiencePanelY = useTransform(smoothProgress, [0.30, 0.315, 0.435, 0.45], [16, 0, 0, -18]);
  const experiencePanelScale = useTransform(smoothProgress, [0.30, 0.32, 0.435, 0.45], [0.92, 1, 1, 1.05]);
  const experiencePointerEvents = useTransform(smoothProgress, (p) => (p >= 0.30 && p < 0.45 ? 'auto' : 'none'));
  const experiencePanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.30 && p < 0.45 ? 'visible' : 'hidden'));

  const techPanelOpacity = useTransform(smoothProgress, [0.45, 0.465, 0.575, 0.59], [0, 1, 1, 0]);
  const techPanelY = useTransform(smoothProgress, [0.45, 0.465, 0.575, 0.59], [16, 0, 0, -18]);
  const techPanelScale = useTransform(smoothProgress, [0.45, 0.47, 0.575, 0.59], [0.94, 1, 1, 0.90]);
  const techPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.45 && p < 0.59 ? 'auto' : 'none'));
  const techPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.45 && p < 0.59 ? 'visible' : 'hidden'));

  const projectsPanelOpacity = useTransform(smoothProgress, [0.59, 0.605, 0.715, 0.73], [0, 1, 1, 0]);
  const projectsPanelY = useTransform(smoothProgress, [0.59, 0.605, 0.715, 0.73], [16, 0, 0, -18]);
  const projectsPanelScale = useTransform(smoothProgress, [0.59, 0.61, 0.715, 0.73], [0.94, 1, 1, 0.90]);
  const projectsPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.59 && p < 0.73 ? 'auto' : 'none'));
  const projectsPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.59 && p < 0.73 ? 'visible' : 'hidden'));

  const contactPanelOpacity = useTransform(smoothProgress, [0.73, 0.745, 0.855, 0.87], [0, 1, 1, 0]);
  const contactPanelY = useTransform(smoothProgress, [0.73, 0.745, 0.855, 0.87], [16, 0, 0, -18]);
  const contactPanelScale = useTransform(smoothProgress, [0.73, 0.75, 0.855, 0.87], [0.94, 1, 1, 0.90]);
  const contactPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.73 && p < 0.87 ? 'auto' : 'none'));
  const contactPanelVisibility = useTransform(smoothProgress, (p) => (p >= 0.73 && p < 0.87 ? 'visible' : 'hidden'));

  const thankYouOpacity = useTransform(smoothProgress, [0.87, 0.89], [0, 1]);
  const thankYouPointerEvents = useTransform(smoothProgress, (p) => (p >= 0.87 ? 'auto' : 'none'));
  const thankYouVisibility = useTransform(smoothProgress, (p) => (p >= 0.87 ? 'visible' : 'hidden'));

  const footerOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const footerVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  return {
    // Refs
    buttonAnchorRef,
    targetSlotRef,
    resumeAnchorRef,
    resumeTargetSlotRef,
    desktopSocialsAnchorRef,
    desktopSocialsTargetRef,
    thankYouButtonSlotRef,
    thankYouResumeSlotRef,
    thankYouSocialsSlotRef,

    // Button transforms
    buttonX,
    buttonY,
    buttonRotateZ,
    buttonRotateX,
    buttonScale,
    buttonShadow,

    // Resume transforms
    resumeX,
    resumeY,
    resumeRotateZ,
    resumeRotateX,
    resumeScale,
    resumeShadow,

    // Socials transforms
    desktopSocialsX,
    desktopSocialsY,
    desktopSocialsRotateZ,

    // Visibility / Opacity
    topHeaderOpacity,
    topHeaderVisibility,
    leftAvatarOpacity,
    leftAvatarScale,
    leftAvatarVisibility,
    initialOverviewOpacity,
    initialOverviewY,
    initialPointerEvents,
    initialOverviewVisibility,
    aboutPanelOpacity,
    aboutPanelY,
    aboutPanelRotateX,
    aboutPanelScale,
    aboutPointerEvents,
    aboutPanelVisibility,
    servicesPanelOpacity,
    servicesPanelY,
    servicesPanelScale,
    servicesPanelRotateX,
    servicesPointerEvents,
    servicesPanelVisibility,
    experiencePanelOpacity,
    experiencePanelY,
    experiencePanelScale,
    experiencePointerEvents,
    experiencePanelVisibility,
    techPanelOpacity,
    techPanelY,
    techPanelScale,
    techPointerEvents,
    techPanelVisibility,
    projectsPanelOpacity,
    projectsPanelY,
    projectsPanelScale,
    projectsPointerEvents,
    projectsPanelVisibility,
    contactPanelOpacity,
    contactPanelY,
    contactPanelScale,
    contactPointerEvents,
    contactPanelVisibility,
    thankYouOpacity,
    thankYouPointerEvents,
    thankYouVisibility,
    footerOpacity,
    footerVisibility,
  };
}

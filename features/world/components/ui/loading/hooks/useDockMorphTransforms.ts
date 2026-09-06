'use client';

import { MotionValue, useTransform } from 'framer-motion';

interface DeltasInput {
  delta: { x: number; y: number };
  resumeDelta: { x: number; y: number };
  desktopSocialsDelta: { x: number; y: number };
  thankYouButtonDelta: { x: number; y: number };
  thankYouResumeDelta: { x: number; y: number };
  thankYouSocialsDelta: { x: number; y: number };
}

export function useDockMorphTransforms(smoothProgress: MotionValue<number>, d: DeltasInput) {
  const buttonX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) return Math.max(0, p / 0.035) * d.delta.x;
    if (p < 0.855) return d.delta.x;
    const t = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return d.delta.x + t * (d.thankYouButtonDelta.x - d.delta.x);
  });
  const buttonY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) return Math.max(0, p / 0.035) * d.delta.y;
    if (p < 0.855) return d.delta.y;
    const t = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return d.delta.y + t * (d.thankYouButtonDelta.y - d.delta.y);
  });
  const buttonRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, -2, 1, 0, 0, 1.5, 0]);
  const buttonRotateX = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [0, 10, 0, 0, 8, 0]);
  const buttonScale = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [1, 1.02, 1, 1, 1.03, 1]);
  const buttonShadow = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [
    '4px 4px 0px #3E2B1D', '8px 8px 0px #3E2B1D', '3px 3px 0px #3E2B1D', '3px 3px 0px #3E2B1D', '6px 6px 0px #3E2B1D', '4px 4px 0px #3E2B1D',
  ]);

  const resumeX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) return Math.max(0, p / 0.035) * d.resumeDelta.x;
    if (p < 0.855) return d.resumeDelta.x;
    const t = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return d.resumeDelta.x + t * (d.thankYouResumeDelta.x - d.resumeDelta.x);
  });
  const resumeY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) return Math.max(0, p / 0.035) * d.resumeDelta.y;
    if (p < 0.855) return d.resumeDelta.y;
    const t = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return d.resumeDelta.y + t * (d.thankYouResumeDelta.y - d.resumeDelta.y);
  });
  const resumeRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, 2, -1, 0, 0, -1.5, 0]);
  const resumeRotateX = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [0, 10, 0, 0, 8, 0]);
  const resumeScale = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [1, 1.02, 1, 1, 1.03, 1]);
  const resumeShadow = useTransform(smoothProgress, [0, 0.018, 0.035, 0.855, 0.87, 0.885], [
    '3px 3px 0px #3E2B1D', '8px 8px 0px #3E2B1D', '3px 3px 0px #3E2B1D', '3px 3px 0px #3E2B1D', '6px 6px 0px #3E2B1D', '3px 3px 0px #3E2B1D',
  ]);

  const desktopSocialsX = useTransform(smoothProgress, (p) => {
    if (p < 0.035) return Math.max(0, p / 0.035) * d.desktopSocialsDelta.x;
    if (p < 0.855) return d.desktopSocialsDelta.x;
    const t = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return d.desktopSocialsDelta.x + t * (d.thankYouSocialsDelta.x - d.desktopSocialsDelta.x);
  });
  const desktopSocialsY = useTransform(smoothProgress, (p) => {
    if (p < 0.035) return Math.max(0, p / 0.035) * d.desktopSocialsDelta.y;
    if (p < 0.855) return d.desktopSocialsDelta.y;
    const t = Math.min(1, Math.max(0, (p - 0.855) / 0.03));
    return d.desktopSocialsDelta.y + t * (d.thankYouSocialsDelta.y - d.desktopSocialsDelta.y);
  });
  const desktopSocialsRotateZ = useTransform(smoothProgress, [0, 0.015, 0.025, 0.035, 0.855, 0.87, 0.885], [0, -1.5, 1, 0, 0, 1, 0]);

  return {
    buttonX, buttonY, buttonRotateZ, buttonRotateX, buttonScale, buttonShadow,
    resumeX, resumeY, resumeRotateZ, resumeRotateX, resumeScale, resumeShadow,
    desktopSocialsX, desktopSocialsY, desktopSocialsRotateZ,
  };
}

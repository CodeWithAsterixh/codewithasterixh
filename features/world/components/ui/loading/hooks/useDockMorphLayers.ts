'use client';

import { MotionValue, useTransform } from 'framer-motion';

export function useDockMorphLayers(smoothProgress: MotionValue<number>) {
  const topHeaderOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const topHeaderVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

  const leftAvatarOpacity = useTransform(smoothProgress, [0.855, 0.875], [1, 0]);
  const leftAvatarScale = useTransform(smoothProgress, [0.855, 0.875], [1, 0.92]);
  const leftAvatarVisibility = useTransform(smoothProgress, (p) => (p > 0.875 ? 'hidden' : 'visible'));

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
    topHeaderOpacity, topHeaderVisibility,
    leftAvatarOpacity, leftAvatarScale, leftAvatarVisibility,
    initialOverviewOpacity, initialOverviewY, initialPointerEvents, initialOverviewVisibility,
    aboutPanelOpacity, aboutPanelY, aboutPanelRotateX, aboutPanelScale, aboutPointerEvents, aboutPanelVisibility,
    servicesPanelOpacity, servicesPanelY, servicesPanelScale, servicesPanelRotateX, servicesPointerEvents, servicesPanelVisibility,
    experiencePanelOpacity, experiencePanelY, experiencePanelScale, experiencePointerEvents, experiencePanelVisibility,
    techPanelOpacity, techPanelY, techPanelScale, techPointerEvents, techPanelVisibility,
    projectsPanelOpacity, projectsPanelY, projectsPanelScale, projectsPointerEvents, projectsPanelVisibility,
    contactPanelOpacity, contactPanelY, contactPanelScale, contactPointerEvents, contactPanelVisibility,
    thankYouOpacity, thankYouPointerEvents, thankYouVisibility,
    footerOpacity, footerVisibility,
  };
}

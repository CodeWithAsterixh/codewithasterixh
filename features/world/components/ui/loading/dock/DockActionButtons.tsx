'use client';

import React from 'react';
import { MotionValue } from 'framer-motion';
import { EnterWorldButton } from './EnterWorldButton';
import { SeeResumeButton } from './SeeResumeButton';
import { DockSocialButtons } from './DockSocialButtons';

interface DockActionButtonsProps {
  buttonAnchorRef: React.RefObject<HTMLDivElement | null>;
  resumeAnchorRef: React.RefObject<HTMLDivElement | null>;
  desktopSocialsAnchorRef: React.RefObject<HTMLDivElement | null>;
  buttonX: MotionValue<number>;
  buttonY: MotionValue<number>;
  buttonRotateZ: MotionValue<number>;
  buttonRotateX: MotionValue<number>;
  buttonScale: MotionValue<number>;
  buttonShadow: MotionValue<string>;
  resumeX: MotionValue<number>;
  resumeY: MotionValue<number>;
  resumeRotateZ: MotionValue<number>;
  resumeRotateX: MotionValue<number>;
  resumeScale: MotionValue<number>;
  resumeShadow: MotionValue<string>;
  desktopSocialsX: MotionValue<number>;
  desktopSocialsY: MotionValue<number>;
  desktopSocialsRotateZ: MotionValue<number>;
  isLoading: boolean;
  onPlayClick: () => void;
  onLinkClick: () => void;
}

export const DockActionButtons: React.FC<DockActionButtonsProps> = (props) => {
  return (
    <div className="relative z-[60] flex flex-col items-center md:items-start gap-1.5 sm:gap-2.5 md:gap-3.5 mt-1.5 sm:mt-2 md:mt-4 w-full max-w-full pointer-events-none">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-2.5 max-w-full pointer-events-none">
        <EnterWorldButton
          buttonAnchorRef={props.buttonAnchorRef}
          buttonX={props.buttonX}
          buttonY={props.buttonY}
          buttonRotateZ={props.buttonRotateZ}
          buttonRotateX={props.buttonRotateX}
          buttonScale={props.buttonScale}
          buttonShadow={props.buttonShadow}
          isLoading={props.isLoading}
          onPlayClick={props.onPlayClick}
        />
        <SeeResumeButton
          resumeAnchorRef={props.resumeAnchorRef}
          resumeX={props.resumeX}
          resumeY={props.resumeY}
          resumeRotateZ={props.resumeRotateZ}
          resumeRotateX={props.resumeRotateX}
          resumeScale={props.resumeScale}
          resumeShadow={props.resumeShadow}
          onLinkClick={props.onLinkClick}
        />
      </div>
      <DockSocialButtons
        desktopSocialsAnchorRef={props.desktopSocialsAnchorRef}
        desktopSocialsX={props.desktopSocialsX}
        desktopSocialsY={props.desktopSocialsY}
        desktopSocialsRotateZ={props.desktopSocialsRotateZ}
        onLinkClick={props.onLinkClick}
      />
    </div>
  );
};


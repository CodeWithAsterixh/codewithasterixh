'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import {
  PlayIcon,
  SpinnerIcon,
  FilePdfIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

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

export const DockActionButtons: React.FC<DockActionButtonsProps> = ({
  buttonAnchorRef,
  resumeAnchorRef,
  desktopSocialsAnchorRef,
  buttonX,
  buttonY,
  buttonRotateZ,
  buttonRotateX,
  buttonScale,
  buttonShadow,
  resumeX,
  resumeY,
  resumeRotateZ,
  resumeRotateX,
  resumeScale,
  resumeShadow,
  desktopSocialsX,
  desktopSocialsY,
  desktopSocialsRotateZ,
  isLoading,
  onPlayClick,
  onLinkClick,
}) => {
  return (
    <div className="relative z-[60] flex flex-col items-center md:items-start gap-1.5 sm:gap-2.5 md:gap-3.5 mt-1.5 sm:mt-2 md:mt-4 w-full max-w-full pointer-events-none">
      {/* Row 1: ENTER WORLD & SEE RESUME */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-2.5 max-w-full pointer-events-none">
        {/* ENTER WORLD BUTTON */}
        <div ref={buttonAnchorRef} className="relative inline-block z-[60] pointer-events-none shrink-0">
          <motion.button
            onClick={isLoading ? undefined : onPlayClick}
            disabled={isLoading}
            style={{
              x: buttonX,
              y: buttonY,
              rotateZ: buttonRotateZ,
              rotateX: buttonRotateX,
              scale: buttonScale,
              boxShadow: buttonShadow,
              transformPerspective: 1000,
            }}
            className={`group relative z-[60] inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors select-none whitespace-nowrap pointer-events-auto ${isLoading
              ? 'bg-[#A89078] text-[#F4EADA]/90 cursor-wait'
              : 'bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] text-[#F4EADA] cursor-pointer'
              }`}
            title={isLoading ? 'Loading World...' : 'Enter World'}
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                <SpinnerIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA] animate-spin" />
                <span className="animate-pulse">LOADING WORLD...</span>
              </span>
            ) : (
              <>
                <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA] fill-current" />
                <span className="whitespace-nowrap">ENTER WORLD</span>
              </>
            )}
          </motion.button>
        </div>

        {/* SEE RESUME BUTTON */}
        <div ref={resumeAnchorRef} className="relative inline-block z-[60] pointer-events-none shrink-0">
          <motion.a
            href="/resume/peterpaulresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
            style={{
              x: resumeX,
              y: resumeY,
              rotateZ: resumeRotateZ,
              rotateX: resumeRotateX,
              scale: resumeScale,
              boxShadow: resumeShadow,
              transformPerspective: 1000,
            }}
            className="group relative z-[60] inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 bg-[#EADBCC] hover:bg-[#D8C2AA] text-[#3E2B1D] font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors cursor-pointer select-none whitespace-nowrap font-mono pointer-events-auto"
            title="See Resume"
          >
            <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3E2B1D]" />
            SEE RESUME
          </motion.a>
        </div>
      </div>

      {/* Row 2: Universal Social Links */}
      <div ref={desktopSocialsAnchorRef} className="relative z-[60] pointer-events-none">
        <motion.div
          style={{
            x: desktopSocialsX,
            y: desktopSocialsY,
            rotateZ: desktopSocialsRotateZ,
            transformPerspective: 1000,
          }}
          className="group relative z-[60] inline-flex items-center gap-1 sm:gap-1.5 md:gap-2.5 pointer-events-none"
        >
          {profileData.socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
              title={social.icon.toUpperCase()}
              className="p-1 sm:p-1.5 md:p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D] flex items-center justify-center cursor-pointer pointer-events-auto"
            >
              {social.icon === 'github' && (
                <GithubLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
              )}
              {social.icon === 'linkedin' && (
                <LinkedinLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
              )}
              {social.icon === 'twitter' && (
                <TwitterLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
              )}
            </a>
          ))}

          {/* Email Icon Button */}
          <a
            href={`mailto:${profileData.email}`}
            onClick={onLinkClick}
            title="EMAIL"
            className="p-1 sm:p-1.5 md:p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D] flex items-center justify-center cursor-pointer pointer-events-auto"
          >
            <EnvelopeSimpleIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

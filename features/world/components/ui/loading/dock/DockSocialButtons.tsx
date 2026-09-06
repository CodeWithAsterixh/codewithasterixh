'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface DockSocialButtonsProps {
  desktopSocialsAnchorRef: React.RefObject<HTMLDivElement | null>;
  desktopSocialsX: MotionValue<number>;
  desktopSocialsY: MotionValue<number>;
  desktopSocialsRotateZ: MotionValue<number>;
  onLinkClick: () => void;
}

export const DockSocialButtons: React.FC<DockSocialButtonsProps> = ({
  desktopSocialsAnchorRef,
  desktopSocialsX,
  desktopSocialsY,
  desktopSocialsRotateZ,
  onLinkClick,
}) => {
  return (
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
            {social.icon === 'github' && <GithubLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />}
            {social.icon === 'linkedin' && <LinkedinLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />}
            {social.icon === 'twitter' && <TwitterLogoIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />}
          </a>
        ))}

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
  );
};

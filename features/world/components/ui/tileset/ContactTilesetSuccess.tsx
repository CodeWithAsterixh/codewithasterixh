'use client';

import React from 'react';
import { CheckCircleIcon } from '@phosphor-icons/react';

const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';

interface ContactTilesetSuccessProps {
  name: string;
  onReset: () => void;
}

export const ContactTilesetSuccess: React.FC<ContactTilesetSuccessProps> = ({ name, onReset }) => {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
      <div
        style={{ clipPath: PIXEL_CLIP_MD }}
        className="w-12 h-12 bg-[#059669]/20 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center text-[#059669]"
      >
        <CheckCircleIcon size={28} weight="duotone" />
      </div>
      <div>
        <h3 className="text-base font-extrabold text-[#1F1914]">Message Sent!</h3>
        <p className="text-xs text-[#5C4F41] mt-1">
          Thanks <span className="font-bold">{name}</span>, your message has been received.
        </p>
      </div>
      <button
        onClick={onReset}
        className="py-2 px-5 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        Close
      </button>
    </div>
  );
};

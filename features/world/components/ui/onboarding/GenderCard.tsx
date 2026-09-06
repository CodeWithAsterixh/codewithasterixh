'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { Gender, CharacterId } from '../../../types';
import { drawCharacterPortrait } from '../../../engine/characterAnimator';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_LG = 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))';

interface GenderCardProps {
  gender: Gender;
  charId: CharacterId;
  title: string;
  subtitle: string;
  onSelect: () => void;
}

export const GenderCard: React.FC<GenderCardProps> = ({
  charId,
  title,
  subtitle,
  onSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let startTime = performance.now();
    let animFrame: number;

    const animate = (time: number) => {
      const elapsedSec = (time - startTime) / 1000;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawCharacterPortrait(ctx, charId, canvas.width, canvas.height, elapsedSec, 130);
        }
      }
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [charId]);

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{ clipPath: PIXEL_CLIP_LG }}
      className="group relative w-full cursor-pointer transition-transform active:translate-y-0.5 text-center bg-[#FAF5E6] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 flex flex-col items-center hover:bg-white"
    >
      <div
        style={{
          backgroundImage: 'url(/books/tile_avatar_box.png)',
          backgroundSize: '100% 100%',
          imageRendering: 'pixelated',
        }}
        className="w-40 h-36 flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform"
      >
        <canvas ref={canvasRef} width={160} height={145} className="w-36 h-32 drop-shadow-md" />
      </div>

      <h4 className="text-base font-extrabold text-[#1F1914]">{title}</h4>
      <p className="text-xs text-[#5C4F41] mb-3">{subtitle}</p>

      <div
        style={{ clipPath: PIXEL_CLIP_SM }}
        className="px-4 py-2 bg-[#D9A441] text-[#1A1D24] font-black uppercase text-xs flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:bg-[#E5B152]"
      >
        <span>Select {title}</span>
        <ArrowRightIcon size={12} weight="bold" />
      </div>
    </button>
  );
};

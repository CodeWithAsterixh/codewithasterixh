'use client';

import React, { useEffect, useRef } from 'react';
import { CharacterId } from '../../../types';
import { CHARACTER_DEFS } from '../../../data/characterData';
import { CHARACTER_BIOS } from '../../../data/characterBios';
import { drawCharacterPortrait } from '../../../engine/characterAnimator';

const PIXEL_CLIP_LG = 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))';

interface CharacterPreviewCanvasProps {
  selectedCharId: CharacterId;
}

export const CharacterPreviewCanvas: React.FC<CharacterPreviewCanvasProps> = ({ selectedCharId }) => {
  const charCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    let startTime = performance.now();
    const animate = (time: number) => {
      const elapsedSec = (time - startTime) / 1000;
      const canvas = charCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawCharacterPortrait(ctx, selectedCharId, canvas.width, canvas.height, elapsedSec, 140);
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedCharId]);

  const activeCharDef = CHARACTER_DEFS[selectedCharId];
  const activeCharBio = CHARACTER_BIOS[selectedCharId] || {
    role: 'Software Engineer',
    desc: 'Ready to explore Asterixh’s portfolio and projects.',
    trait: 'Developer',
  };

  return (
    <div style={{ clipPath: PIXEL_CLIP_LG }} className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF5E6] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <div
        style={{
          backgroundImage: 'url(/books/tile_avatar_box.png)',
          backgroundSize: '100% 100%',
          imageRendering: 'pixelated',
        }}
        className="w-40 h-36 flex items-center justify-center p-2 mb-1"
      >
        <canvas ref={charCanvasRef} width={160} height={145} className="w-36 h-32 drop-shadow-md" />
      </div>

      <h4 className="text-base font-extrabold text-[#1F1914]">{activeCharDef.name}</h4>
      <span className="text-xs font-bold text-[#243C6E]">{activeCharBio.role}</span>
      <p className="text-[11px] text-[#5C4F41] text-center mt-1">{activeCharBio.desc}</p>
    </div>
  );
};

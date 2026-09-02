'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Gender, CharacterId } from '../../types';
import { GENDER_CHARACTERS, CHARACTER_DEFS } from '../../data/characterData';
import { drawCharacterPortrait, characterSpriteManager } from '../../engine/characterAnimator';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  PlayIcon,
  SparkleIcon,
  UserIcon,
} from '@phosphor-icons/react';
import clsx from 'clsx';

interface CharacterOnboardingScreenProps {
  onComplete: (gender: Gender, characterId: CharacterId) => void;
}

const CHARACTER_BIOS: Record<CharacterId, { role: string; desc: string; trait: string }> = {
  Fighter: {
    role: 'Fullstack Engineer',
    desc: 'Builds end-to-end web apps with TypeScript, React, and Node.js.',
    trait: 'Full-Stack',
  },
  Samurai: {
    role: 'System Architect',
    desc: 'Designs modular software, robust databases, and scalable cloud systems.',
    trait: 'Architecture',
  },
  Shinobi: {
    role: 'Backend Specialist',
    desc: 'Optimizes microservices, real-time networking, and high-speed APIs.',
    trait: 'APIs & Data',
  },
  Girl_1: {
    role: 'Frontend Engineer',
    desc: 'Builds responsive interfaces, interactive canvas widgets, and web apps.',
    trait: 'Frontend & UI',
  },
  Girl_2: {
    role: 'Cloud & DevOps',
    desc: 'Handles deployments, CI/CD automation, and cloud infrastructure.',
    trait: 'DevOps & Cloud',
  },
  Girl_3: {
    role: 'UI / UX Developer',
    desc: 'Crafts intuitive design systems, animations, and accessible experiences.',
    trait: 'UI & Design',
  },
};

export const CharacterOnboardingScreen: React.FC<CharacterOnboardingScreenProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>('Fighter');

  // Canvas refs for live sprite animation
  const maleCanvasRef = useRef<HTMLCanvasElement>(null);
  const femaleCanvasRef = useRef<HTMLCanvasElement>(null);
  const charCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Preload initial characters
  useEffect(() => {
    characterSpriteManager.preloadCharacter('Fighter');
    characterSpriteManager.preloadCharacter('Girl_1');
    GENDER_CHARACTERS[selectedGender].forEach((charId) => {
      characterSpriteManager.preloadCharacter(charId);
    });
  }, [selectedGender]);

  // Live Canvas Sprite Animation
  useEffect(() => {
    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsedSec = (time - startTime) / 1000;

      if (step === 1) {
        const maleCanvas = maleCanvasRef.current;
        if (maleCanvas) {
          const ctx = maleCanvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, maleCanvas.width, maleCanvas.height);
            drawCharacterPortrait(ctx, 'Fighter', maleCanvas.width, maleCanvas.height, elapsedSec, 130);
          }
        }

        const femaleCanvas = femaleCanvasRef.current;
        if (femaleCanvas) {
          const ctx = femaleCanvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, femaleCanvas.width, femaleCanvas.height);
            drawCharacterPortrait(ctx, 'Girl_1', femaleCanvas.width, femaleCanvas.height, elapsedSec, 130);
          }
        }
      } else if (step === 2) {
        const canvas = charCanvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCharacterPortrait(ctx, selectedCharId, canvas.width, canvas.height, elapsedSec, 140);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step, selectedCharId]);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    const defaultChar = gender === 'male' ? 'Fighter' : 'Girl_1';
    setSelectedCharId(defaultChar);
    setStep(2);
  };

  const handleStartGame = () => {
    onComplete(selectedGender, selectedCharId);
  };

  const activeCharDef = CHARACTER_DEFS[selectedCharId];
  const activeCharBio = CHARACTER_BIOS[selectedCharId] || {
    role: 'Software Engineer',
    desc: 'Ready to explore Asterixh’s portfolio and projects.',
    trait: 'Developer',
  };
  const availableCharacters = GENDER_CHARACTERS[selectedGender];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md select-none font-pixelify p-3 sm:p-5">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,60,110,0.25)_0%,transparent_70%)] pointer-events-none" />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-3xl bg-[#EFE3C3] border-4 border-[#243C6E] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_0_2px_#D6C296] overflow-hidden text-[#241F1A] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">

        {/* Corner Rivets */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 bg-[#E8DAAF]/90 border-b-2 border-[#D6C296]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-[#243C6E] border border-[#D6C296] flex items-center justify-center text-white shrink-0 shadow-xs">
              <SparkleIcon size={16} weight="duotone" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E5C3B] block truncate">
                Asterixh Portfolio
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-[#1F1914] truncate">
                {step === 1 ? 'Step 1: Select Gender' : 'Step 2: Select Character'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold shrink-0">
            <span
              style={{
                backgroundImage: step === 1 ? 'url(/btns/button2_tight.png)' : 'url(/btns/button1_tight.png)',
                backgroundSize: '100% 100%',
              }}
              className={`px-3 py-1.5 rounded-lg text-xs ${step === 1 ? 'text-[#062c3f] font-extrabold' : 'text-[#f5edf9]'}`}
            >
              1. Gender
            </span>
            <span className="text-[#6E5C3B]">
              <ArrowRightIcon size={14} weight="duotone" />
            </span>
            <span
              style={{
                backgroundImage: step === 2 ? 'url(/btns/button2_tight.png)' : 'url(/btns/button1_tight.png)',
                backgroundSize: '100% 100%',
              }}
              className={`px-3 py-1.5 rounded-lg text-xs ${step === 2 ? 'text-[#062c3f] font-extrabold' : 'text-[#f5edf9]'}`}
            >
              2. Character
            </span>
          </div>
        </div>

        {/* STEP 1: SELECT GENDER */}
        {step === 1 && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#EFE3C3] via-[#E8DCB7] to-[#DFD0A8]">
            <div className="text-center space-y-1 max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1F1914]">
                Welcome to Asterixh’s World
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4F41]">
                Select a character to explore projects, skills, and interactive demos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto w-full">
              {/* Male Card */}
              <button
                type="button"
                onClick={() => handleGenderSelect('male')}
                className="group relative w-full cursor-pointer transition-transform active:translate-y-0.5 text-center"
              >
                <div className="absolute inset-x-0 top-2 bottom-0 rounded-2xl bg-[#16294D] border border-[#0D1C38]" />
                <div className="relative z-10 flex flex-col items-center p-4 rounded-2xl bg-[#FAF5E6] border-2 border-[#D5C49B] group-hover:border-[#243C6E] transition-all">
                  <div
                    style={{
                      backgroundImage: 'url(/books/tile_avatar_box.png)',
                      backgroundSize: '100% 100%',
                      imageRendering: 'pixelated',
                    }}
                    className="w-40 h-36 flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform"
                  >
                    <canvas ref={maleCanvasRef} width={160} height={145} className="w-36 h-32 drop-shadow-md" />
                  </div>

                  <h4 className="text-base font-extrabold text-[#1F1914]">Male</h4>
                  <p className="text-xs text-[#5C4F41] mb-3">Fighter • Samurai • Shinobi</p>

                  <div
                    style={{
                      backgroundImage: 'url(/btns/button2_tight.png)',
                      backgroundSize: '100% 100%',
                    }}
                    className="px-4 py-2 rounded-md text-xs font-extrabold text-[#062c3f] flex items-center gap-1.5 shadow-sm group-hover:brightness-110"
                  >
                    <span>Select Male</span>
                    <ArrowRightIcon size={12} weight="duotone" />
                  </div>
                </div>
              </button>

              {/* Female Card */}
              <button
                type="button"
                onClick={() => handleGenderSelect('female')}
                className="group relative w-full cursor-pointer transition-transform active:translate-y-0.5 text-center"
              >
                <div className="absolute inset-x-0 top-2 bottom-0 rounded-2xl bg-[#16294D] border border-[#0D1C38]" />
                <div className="relative z-10 flex flex-col items-center p-4 rounded-2xl bg-[#FAF5E6] border-2 border-[#D5C49B] group-hover:border-[#243C6E] transition-all">
                  <div
                    style={{
                      backgroundImage: 'url(/books/tile_avatar_box.png)',
                      backgroundSize: '100% 100%',
                    }}
                    className="w-40 h-36 flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform"
                  >
                    <canvas ref={femaleCanvasRef} width={160} height={145} className="w-36 h-32 drop-shadow-md" />
                  </div>

                  <h4 className="text-base font-extrabold text-[#1F1914]">Female</h4>
                  <p className="text-xs text-[#5C4F41] mb-3">Girl 1 • Girl 2 • Girl 3</p>

                  <div
                    style={{
                      backgroundImage: 'url(/btns/button2_tight.png)',
                      backgroundSize: '100% 100%',
                    }}
                    className="px-4 py-2 rounded-md text-xs font-extrabold text-[#062c3f] flex items-center gap-1.5 shadow-sm group-hover:brightness-110"
                  >
                    <span>Select Female</span>
                    <ArrowRightIcon size={12} weight="duotone" />
                  </div>
                </div>
              </button>
            </div>

            <div className="text-center text-[11px] text-[#6E5C3B] pt-2">
              You can switch your character or gender anytime from the Pause Menu.
            </div>
          </div>
        )}

        {/* STEP 2: SELECT CHARACTER */}
        {step === 2 && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#EFE3C3] via-[#E8DCB7] to-[#DFD0A8]">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

              {/* Left Column: Character List */}
              <div className="sm:col-span-7 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6E5C3B]">
                  Choose Character
                </div>

                <div className="space-y-2">
                  {availableCharacters.map((charId) => {
                    const def = CHARACTER_DEFS[charId];
                    const bio = CHARACTER_BIOS[charId];
                    const isSelected = selectedCharId === charId;
                    return (
                      <button
                        key={charId}
                        type="button"
                        onClick={() => setSelectedCharId(charId)}
                        className={`w-full text-left p-3 rounded-md border-2 transition-all flex items-center justify-between cursor-pointer ${isSelected
                            ? 'bg-[#FAF5E6] border-[#243C6E] shadow-sm ring-1 ring-[#243C6E]'
                            : 'bg-[#FAF5E6]/70 border-[#D5C49B] hover:bg-[#FAF5E6] hover:border-[#243C6E]'
                          }`}
                      >
                        <div>
                          <div className="text-sm font-extrabold flex items-center gap-2 text-[#1F1914]">
                            <span>{def.name}</span>
                            <span className="text-[10px] text-[#243C6E] font-bold">
                              ({bio?.role})
                            </span>
                          </div>
                          <div className="text-xs text-[#5C4F41] mt-0.5">
                            {bio?.desc}
                          </div>
                        </div>
                        <ArrowRightIcon
                          size={16}
                          weight="duotone"
                          className={isSelected ? 'text-[#243C6E]' : 'text-[#A09585]'}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Preview Canvas */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF5E6]/80 border-2 border-[#D5C49B]">
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

                <h4 className="text-base font-extrabold text-[#1F1914]">
                  {activeCharDef.name}
                </h4>
                <span className="text-xs font-bold text-[#243C6E]">
                  {activeCharBio.role}
                </span>
                <p className="text-[11px] text-[#5C4F41] text-center mt-1">
                  {activeCharBio.desc}
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-[#D6C296]">
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  backgroundImage: 'url(/btns/button1_tight.png)',
                  backgroundSize: '100% 100%',
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-md text-xs font-bold text-[#f5edf9] flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 active:translate-y-0.5"
              >
                <ArrowLeftIcon size={14} weight="duotone" />
                <span>Back to Gender</span>
              </button>

              <button
                type="button"
                onClick={handleStartGame}
                style={{
                  backgroundImage: 'url(/btns/button2_tight.png)',
                  backgroundSize: '100% 100%',
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-md text-xs sm:text-sm font-extrabold text-[#062c3f] flex items-center justify-center gap-2 shadow-md cursor-pointer hover:brightness-110 active:translate-y-0.5"
              >
                <PlayIcon size={16} weight="duotone" />
                <span>Enter World with {activeCharDef.name}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

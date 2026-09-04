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
  onComplete: (gender: Gender, characterId: CharacterId, isCombatActive: boolean) => void;
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
  Xavier: {
    role: 'DevSecOps & Platform',
    desc: 'Secures infrastructure, enforces cryptographic protocols, and hardening.',
    trait: 'Security & Cloud',
  },
  Countess_claire: {
    role: 'Frontend Architect',
    desc: 'Crafts responsive interfaces, interactive canvas engines, and UI systems.',
    trait: 'Frontend & UI',
  },
  bridget: {
    role: 'Creative Developer',
    desc: 'Designs engaging web experiences, fluid animations, and visual storytelling.',
    trait: 'Creative & UX',
  },
};

export const CharacterOnboardingScreen: React.FC<CharacterOnboardingScreenProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>('Fighter');
  const [isCombatActive, setIsCombatActive] = useState<boolean>(false);

  // Canvas refs for live sprite animation
  const maleCanvasRef = useRef<HTMLCanvasElement>(null);
  const femaleCanvasRef = useRef<HTMLCanvasElement>(null);
  const charCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Preload initial characters
  useEffect(() => {
    characterSpriteManager.preloadCharacter('Fighter');
    characterSpriteManager.preloadCharacter('Countess_claire');
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
            drawCharacterPortrait(ctx, 'Countess_claire', femaleCanvas.width, femaleCanvas.height, elapsedSec, 130);
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
    const defaultChar = gender === 'male' ? 'Fighter' : 'Countess_claire';
    setSelectedCharId(defaultChar);
    setStep(2);
  };

  const handleStartGame = () => {
    onComplete(selectedGender, selectedCharId, isCombatActive);
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

      {/* PIXELATED ONBOARDING MODAL CONTAINER */}
      <div
        style={{
          clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
        }}
        className="relative w-full max-w-3xl bg-[#EFE3C3] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden text-[#241F1A] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >

        {/* Corner Rivets */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#243C6E] pointer-events-none z-20" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 bg-[#E8DAAF]/90 border-b-2 border-[#D6C296]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className="w-8 h-8 bg-[#243C6E] border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white shrink-0"
            >
              <SparkleIcon size={16} weight="duotone" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6E5C3B] block truncate">
                Asterixh Portfolio
              </span>
              <h2 className="text-sm sm:text-base font-black uppercase text-[#1F1914] truncate font-mono">
                {step === 1 ? 'Step 1: Select Gender' : 'Step 2: Select Character'}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-black shrink-0 uppercase font-mono">
            <span
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className={`px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[10px] sm:text-xs ${
                step === 1 ? 'bg-[#D9A441] text-[#1A1D24]' : 'bg-[#2C3440] text-white/70'
              }`}
            >
              1. Gender
            </span>
            <span className="text-[#6E5C3B]">
              <ArrowRightIcon size={14} weight="bold" />
            </span>
            <span
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className={`px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[10px] sm:text-xs ${
                step === 2 ? 'bg-[#D9A441] text-[#1A1D24]' : 'bg-[#2C3440] text-white/70'
              }`}
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
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
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
                  <canvas ref={maleCanvasRef} width={160} height={145} className="w-36 h-32 drop-shadow-md" />
                </div>

                <h4 className="text-base font-extrabold text-[#1F1914]">Male</h4>
                <p className="text-xs text-[#5C4F41] mb-3">Fighter • Samurai • Shinobi • Xavier</p>

                <div
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="px-4 py-2 bg-[#D9A441] text-[#1A1D24] font-black uppercase text-xs flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:bg-[#E5B152]"
                >
                  <span>Select Male</span>
                  <ArrowRightIcon size={12} weight="bold" />
                </div>
              </button>

              {/* Female Card */}
              <button
                type="button"
                onClick={() => handleGenderSelect('female')}
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
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
                  <canvas ref={femaleCanvasRef} width={160} height={145} className="w-36 h-32 drop-shadow-md" />
                </div>

                <h4 className="text-base font-extrabold text-[#1F1914]">Female</h4>
                <p className="text-xs text-[#5C4F41] mb-3">Countess Claire • Bridget</p>

                <div
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="px-4 py-2 bg-[#D9A441] text-[#1A1D24] font-black uppercase text-xs flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:bg-[#E5B152]"
                >
                  <span>Select Female</span>
                  <ArrowRightIcon size={12} weight="bold" />
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
                <div className="text-xs font-black uppercase tracking-wider text-[#6E5C3B] font-mono">
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
                        style={{
                          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                        }}
                        className={`w-full text-left p-3 border-2 border-black transition-all flex items-center justify-between cursor-pointer ${isSelected
                            ? 'bg-[#FAF5E6] shadow-[3px_3px_0px_#243C6E] translate-x-1'
                            : 'bg-[#FAF5E6]/70 shadow-[2px_2px_0px_rgba(0,0,0,0.6)] hover:bg-[#FAF5E6]'
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
                          weight="bold"
                          className={isSelected ? 'text-[#243C6E]' : 'text-[#A09585]'}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Preview Canvas */}
              <div
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-[#FAF5E6] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
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

              {/* Combat Mode Activation Toggle */}
              <div
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className="sm:col-span-12 flex items-center justify-between p-2.5 px-3.5 bg-[#FAF5E6] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    style={{
                      clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                    }}
                    className={clsx(
                      'w-7 h-7 flex items-center justify-center border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,1)] text-xs font-black select-none',
                      isCombatActive
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-[#2C3440] text-white/70'
                    )}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                      <path d="M1 1h2v2H1V1zm2 2h2v2H3V3zm2 2h2v2H5V5zm4 0h2v2H9V5zm2-2h2v2h-2V3zm2-2h2v2h-2V1zm-4 6h2v2H9V7zm-2 2h2v2H7V9zm-2 2h2v2H5v-2zm-2 2h2v2H3v-2zm-2 2h2v2H1v-2zm12-4h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2H9v-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#1F1914] flex items-center gap-1.5">
                      <span>Activate Fighting & Enemy Ninjas</span>
                      <span
                        style={{
                          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                        }}
                        className={clsx(
                          'text-[9px] px-2 py-0.5 border border-black shadow-[1px_1px_0_rgba(0,0,0,1)] font-mono font-bold uppercase tracking-wider',
                          isCombatActive ? 'bg-[#DC2626] text-white' : 'bg-[#4B5563] text-white'
                        )}
                      >
                        {isCombatActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#635547]">
                      {isCombatActive
                        ? 'Enemy shadow ninjas will spawn periodically in the wild to challenge you!'
                        : 'Peaceful exploration mode (default: no enemies will spawn).'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCombatActive(!isCombatActive)}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className={clsx(
                    'relative w-14 h-7 transition-colors duration-200 cursor-pointer p-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]',
                    isCombatActive ? 'bg-[#DC2626]' : 'bg-[#4B5563]'
                  )}
                >
                  <div
                    className={clsx(
                      'w-5 h-5 bg-white border border-black transition-transform duration-200',
                      isCombatActive ? 'translate-x-7' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-[#D6C296]">
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#2C3440] hover:bg-[#374151] text-white font-black uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-px active:translate-y-px"
              >
                <ArrowLeftIcon size={14} weight="bold" />
                <span>Back to Gender</span>
              </button>

              <button
                type="button"
                onClick={handleStartGame}
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs sm:text-sm flex items-center justify-center gap-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
              >
                <PlayIcon size={16} weight="fill" />
                <span>Enter World with {activeCharDef.name}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

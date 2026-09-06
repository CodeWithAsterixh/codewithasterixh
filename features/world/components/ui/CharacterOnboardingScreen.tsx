'use client';

import React, { useState, useEffect } from 'react';
import { Gender, CharacterId } from '../../types';
import { GENDER_CHARACTERS } from '../../data/characterData';
import { characterSpriteManager } from '../../engine/characterAnimator';
import { SparkleIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { OnboardingStepGender } from './onboarding/OnboardingStepGender';
import { OnboardingStepCharacter } from './onboarding/OnboardingStepCharacter';
import { useCharacterContext } from '../../context/CharacterStateContext';
import { useGameStateContext } from '../../context/GameStateContext';

export const CharacterOnboardingScreen: React.FC = () => {
  const { gender, characterId, isCombatActive, setIsCombatActive, handleOnboardingComplete } =
    useCharacterContext();
  const { setIsOnboarding } = useGameStateContext();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGender, setSelectedGender] = useState<Gender>(gender);
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>(characterId);

  useEffect(() => {
    characterSpriteManager.preloadCharacter('Fighter');
    characterSpriteManager.preloadCharacter('Countess_claire');
    GENDER_CHARACTERS[selectedGender].forEach((charId) => {
      characterSpriteManager.preloadCharacter(charId);
    });
  }, [selectedGender]);

  const handleGenderSelect = (g: Gender) => {
    setSelectedGender(g);
    setSelectedCharId(g === 'male' ? 'Fighter' : 'Countess_claire');
    setStep(2);
  };

  const handleStartGame = () => {
    handleOnboardingComplete(selectedGender, selectedCharId, isCombatActive);
    setIsOnboarding(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md select-none font-pixelify p-3 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,60,110,0.25)_0%,transparent_70%)] pointer-events-none" />

      <div
        style={{
          clipPath:
            'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        }}
        className="relative w-full max-w-3xl bg-[#EFE3C3] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden text-[#241F1A] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 bg-[#E8DAAF]/90 border-b-2 border-[#D6C296]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-[#243C6E] border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white shrink-0">
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
              className={`px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[10px] sm:text-xs ${
                step === 2 ? 'bg-[#D9A441] text-[#1A1D24]' : 'bg-[#2C3440] text-white/70'
              }`}
            >
              2. Character
            </span>
          </div>
        </div>

        {/* Steps */}
        {step === 1 ? (
          <OnboardingStepGender onSelectGender={handleGenderSelect} />
        ) : (
          <OnboardingStepCharacter
            selectedGender={selectedGender}
            selectedCharId={selectedCharId}
            setSelectedCharId={setSelectedCharId}
            isCombatActive={isCombatActive}
            setIsCombatActive={setIsCombatActive}
            onBack={() => setStep(1)}
            onStartGame={handleStartGame}
          />
        )}
      </div>
    </div>
  );
};

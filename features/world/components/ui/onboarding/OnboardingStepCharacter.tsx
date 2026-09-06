'use client';

import React from 'react';
import { ArrowRightIcon, ArrowLeftIcon, PlayIcon } from '@phosphor-icons/react';
import { Gender, CharacterId } from '../../../types';
import { GENDER_CHARACTERS, CHARACTER_DEFS } from '../../../data/characterData';
import { CHARACTER_BIOS } from '../../../data/characterBios';
import { CharacterPreviewCanvas } from './CharacterPreviewCanvas';
import { CombatModeToggle } from './CombatModeToggle';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';
const PIXEL_CLIP_LG = 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))';

export { CHARACTER_BIOS };

interface OnboardingStepCharacterProps {
  selectedGender: Gender;
  selectedCharId: CharacterId;
  setSelectedCharId: (id: CharacterId) => void;
  isCombatActive: boolean;
  setIsCombatActive: (active: boolean) => void;
  onBack: () => void;
  onStartGame: () => void;
}

export const OnboardingStepCharacter: React.FC<OnboardingStepCharacterProps> = ({
  selectedGender,
  selectedCharId,
  setSelectedCharId,
  isCombatActive,
  setIsCombatActive,
  onBack,
  onStartGame,
}) => {
  const activeCharDef = CHARACTER_DEFS[selectedCharId];
  const availableCharacters = GENDER_CHARACTERS[selectedGender];

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#EFE3C3] via-[#E8DCB7] to-[#DFD0A8]">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
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
                  style={{ clipPath: PIXEL_CLIP_MD }}
                  className={`w-full text-left p-3 border-2 border-black transition-all flex items-center justify-between cursor-pointer ${
                    isSelected ? 'bg-[#FAF5E6] shadow-[3px_3px_0px_#243C6E] translate-x-1' : 'bg-[#FAF5E6]/70 shadow-[2px_2px_0px_rgba(0,0,0,0.6)] hover:bg-[#FAF5E6]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-extrabold flex items-center gap-2 text-[#1F1914]">
                      <span>{def.name}</span>
                      <span className="text-[10px] text-[#243C6E] font-bold">({bio?.role})</span>
                    </div>
                    <div className="text-xs text-[#5C4F41] mt-0.5">{bio?.desc}</div>
                  </div>
                  <ArrowRightIcon size={16} weight="bold" className={isSelected ? 'text-[#243C6E]' : 'text-[#A09585]'} />
                </button>
              );
            })}
          </div>
        </div>

        <CharacterPreviewCanvas selectedCharId={selectedCharId} />
        <CombatModeToggle isCombatActive={isCombatActive} setIsCombatActive={setIsCombatActive} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-[#D6C296]">
        <button
          type="button"
          onClick={onBack}
          style={{ clipPath: PIXEL_CLIP_MD }}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#2C3440] hover:bg-[#374151] text-white font-black uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-px active:translate-y-px"
        >
          <ArrowLeftIcon size={14} weight="bold" />
          <span>Back to Gender</span>
        </button>

        <button
          type="button"
          onClick={onStartGame}
          style={{ clipPath: PIXEL_CLIP_LG }}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs sm:text-sm flex items-center justify-center gap-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-[2px] active:translate-y-[2px]"
        >
          <PlayIcon size={16} weight="fill" />
          <span>Enter World with {activeCharDef.name}</span>
        </button>
      </div>
    </div>
  );
};

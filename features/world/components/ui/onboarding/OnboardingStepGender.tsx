'use client';

import React from 'react';
import { Gender } from '../../../types';
import { GenderCard } from './GenderCard';

interface OnboardingStepGenderProps {
  onSelectGender: (gender: Gender) => void;
}

export const OnboardingStepGender: React.FC<OnboardingStepGenderProps> = ({ onSelectGender }) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-gradient-to-b from-[#EFE3C3] via-[#E8DCB7] to-[#DFD0A8]">
      <div className="text-center space-y-1 max-w-md mx-auto">
        <h3 className="text-lg sm:text-xl font-extrabold text-[#1F1914]">Welcome to Asterixh’s World</h3>
        <p className="text-xs sm:text-sm text-[#5C4F41]">
          Select a character to explore projects, skills, and interactive demos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto w-full">
        <GenderCard
          gender="male"
          charId="Fighter"
          title="Male"
          subtitle="Fighter • Samurai • Shinobi • Xavier"
          onSelect={() => onSelectGender('male')}
        />
        <GenderCard
          gender="female"
          charId="Countess_claire"
          title="Female"
          subtitle="Countess Claire • Bridget"
          onSelect={() => onSelectGender('female')}
        />
      </div>

      <div className="text-center text-[11px] text-[#6E5C3B] pt-2">
        You can switch your character or gender anytime from the Pause Menu.
      </div>
    </div>
  );
};

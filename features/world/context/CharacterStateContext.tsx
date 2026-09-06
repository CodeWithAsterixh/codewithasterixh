'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Gender, CharacterId } from '../types';
import { DEFAULT_GENDER, DEFAULT_CHARACTER } from '../data/characterData';

const ONBOARDING_STORAGE_KEY = 'codewithasterixh_onboarding_v1';

interface CharacterStateContextType {
  gender: Gender;
  characterId: CharacterId;
  playerHp: number;
  setPlayerHp: (hp: number) => void;
  maxPlayerHp: number;
  setMaxPlayerHp: (max: number) => void;
  respawnCountdown: number | null;
  setRespawnCountdown: (countdown: number | null) => void;
  isCombatActive: boolean;
  setIsCombatActive: (active: boolean) => void;
  handleSelectGender: (gender: Gender) => void;
  handleSelectCharacter: (charId: CharacterId) => void;
  handleToggleCombat: () => void;
  handleOnboardingComplete: (gender: Gender, charId: CharacterId, combatActive: boolean) => void;
}

const CharacterStateContext = createContext<CharacterStateContextType | null>(null);

export const CharacterStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gender, setGender] = useState<Gender>(DEFAULT_GENDER);
  const [characterId, setCharacterId] = useState<CharacterId>(DEFAULT_CHARACTER);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [maxPlayerHp, setMaxPlayerHp] = useState<number>(100);
  const [respawnCountdown, setRespawnCountdown] = useState<number | null>(null);
  const [isCombatActive, setIsCombatActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data?.gender) setGender(data.gender);
        if (data?.characterId) setCharacterId(data.characterId);
        if (typeof data?.combatActive === 'boolean') setIsCombatActive(data.combatActive);
      }
    } catch {}
  }, []);

  const handleSelectGender = useCallback((newGender: Gender) => {
    setGender(newGender);
    const newChar = newGender === 'male' ? 'Fighter' : 'Countess_claire';
    setCharacterId(newChar);
  }, []);

  const handleSelectCharacter = useCallback((newCharId: CharacterId) => {
    setCharacterId(newCharId);
  }, []);

  const handleToggleCombat = useCallback(() => {
    setIsCombatActive((prev) => !prev);
  }, []);

  const handleOnboardingComplete = useCallback(
    (selectedGender: Gender, selectedCharId: CharacterId, combatActive: boolean) => {
      setGender(selectedGender);
      setCharacterId(selectedCharId);
      setIsCombatActive(combatActive);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            ONBOARDING_STORAGE_KEY,
            JSON.stringify({
              completed: true,
              gender: selectedGender,
              characterId: selectedCharId,
              combatActive,
              timestamp: Date.now(),
            })
          );
        } catch {}
      }
    },
    []
  );

  return (
    <CharacterStateContext.Provider
      value={{
        gender,
        characterId,
        playerHp,
        setPlayerHp,
        maxPlayerHp,
        setMaxPlayerHp,
        respawnCountdown,
        setRespawnCountdown,
        isCombatActive,
        setIsCombatActive,
        handleSelectGender,
        handleSelectCharacter,
        handleToggleCombat,
        handleOnboardingComplete,
      }}
    >
      {children}
    </CharacterStateContext.Provider>
  );
};

export function useCharacterContext(): CharacterStateContextType {
  const context = useContext(CharacterStateContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterStateProvider');
  }
  return context;
}

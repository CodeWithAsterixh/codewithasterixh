'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { WorldLoadingScreen } from '@/features/world/components/ui/WorldLoadingScreen';
import { CharacterOnboardingScreen } from '@/features/world/components/ui/CharacterOnboardingScreen';
import { useGameStateContext } from '@/features/world/context/GameStateContext';
import { useCharacterContext } from '@/features/world/context/CharacterStateContext';
import { useWorldContext } from '@/features/world/context/WorldStateContext';
import { useModalContext } from '@/features/world/context/ModalStateContext';

const World2DCanvas = dynamic(
  () => import('@/features/world/components/World2DCanvas').then((mod) => mod.World2DCanvas),
  { ssr: false }
);
const CharacterSelectorHUD = dynamic(
  () => import('@/features/world/components/ui/CharacterSelectorHUD').then((mod) => mod.CharacterSelectorHUD),
  { ssr: false }
);
const WorldPauseMapModal = dynamic(
  () => import('@/features/world/components/ui/WorldPauseMapModal').then((mod) => mod.WorldPauseMapModal),
  { ssr: false }
);
const PortfolioStationModal = dynamic(
  () => import('@/features/world/components/ui/PortfolioStationModal').then((mod) => mod.PortfolioStationModal),
  { ssr: false }
);
const BookModal = dynamic(
  () => import('@/features/world/components/ui/BookModal').then((mod) => mod.BookModal),
  { ssr: false }
);
const InfoTilesetModal = dynamic(
  () => import('@/features/world/components/ui/InfoTilesetModal').then((mod) => mod.InfoTilesetModal),
  { ssr: false }
);

export const WorldGameView: React.FC = () => {
  const { isWorldLoading, isEnteringWorld, isOnboarding, isCanvasReady, setIsCanvasReady, handleStartEnterWorld } =
    useGameStateContext();
  const { gender, characterId, setPlayerHp, setMaxPlayerHp, setRespawnCountdown, isCombatActive } = useCharacterContext();
  const { themeMode, moonType, p5SketchRef, playerXRef, setCurrentBiome } = useWorldContext();
  const { isAnyModalOpen, handleInspectStation, handleInspectObject } = useModalContext();

  const handleSketchReady = useCallback(
    (instance: any) => {
      p5SketchRef.current = instance;
      if (instance.setCharacter) instance.setCharacter(characterId);
      if (instance.setGender) instance.setGender(gender);
      if (typeof instance.setModalActive === 'function') instance.setModalActive(isAnyModalOpen || isOnboarding);
      setIsCanvasReady(true);
    },
    [characterId, gender, isAnyModalOpen, isOnboarding, p5SketchRef, setIsCanvasReady]
  );

  return (
    <div className="relative w-[100dvw] h-[100dvh] overflow-hidden bg-[#0F0F0F] font-pixelify select-none">
      {/* 1. INITIAL WORLD LOADING SCREEN */}
      {isWorldLoading && (
        <WorldLoadingScreen
          isLoading={isEnteringWorld && !isCanvasReady}
          onStart={handleStartEnterWorld}
        />
      )}

      {/* 1.5. ONBOARDING SCREEN */}
      {!isWorldLoading && isOnboarding && <CharacterOnboardingScreen />}

      {/* 2. 2D WORLD CANVAS */}
      {isEnteringWorld && (
        <World2DCanvas
          isModalActive={isAnyModalOpen || isOnboarding}
          themeMode={themeMode}
          moonType={moonType}
          isCombatActive={isCombatActive}
          characterId={characterId}
          gender={gender}
          onSketchReady={handleSketchReady}
          onPlayerPositionChange={(x) => {
            playerXRef.current = x;
          }}
          onPlayerHealthChange={(hp, max) => {
            setPlayerHp(hp);
            setMaxPlayerHp(max);
          }}
          onRespawnCountdownChange={setRespawnCountdown}
          onBiomeChange={setCurrentBiome}
          onInspectStation={handleInspectStation}
          onInspectObject={handleInspectObject}
        />
      )}

      {/* 3. FLOATING HUD */}
      {!isWorldLoading && !isOnboarding && <CharacterSelectorHUD />}

      {/* 4. MODALS */}
      <WorldPauseMapModal />
      <BookModal />
      <InfoTilesetModal />
      <PortfolioStationModal />
    </div>
  );
};

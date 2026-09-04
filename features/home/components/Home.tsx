'use client';

import React, { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Gender, CharacterId, CharacterAction, ControlMode, VirtualInputAction } from "@/features/world/types";
import { DEFAULT_GENDER, DEFAULT_CHARACTER } from "@/features/world/data/characterData";
import { MapLocationEntry, getActiveMapLocation, getNearbyStationKiosk } from "@/features/world/data/mapLayout";
import { InteractiveWorldObject, getNearbyWorldObject } from "@/features/world/data/mapObjects";

import { WorldLoadingScreen } from "@/features/world/components/ui/WorldLoadingScreen";
import { CharacterSelectorHUD } from "@/features/world/components/ui/CharacterSelectorHUD";
import { CharacterOnboardingScreen } from "@/features/world/components/ui/CharacterOnboardingScreen";
import { WorldPauseMapModal } from "@/features/world/components/ui/WorldPauseMapModal";
import { PortfolioStationModal } from "@/features/world/components/ui/PortfolioStationModal";
import { BookModal } from "@/features/world/components/ui/BookModal";
import { InfoTilesetModal } from "@/features/world/components/ui/InfoTilesetModal";
import { PhysicsTelemetry, CurrentBiomeInfo } from "@/features/world/engine/sketch2d";

const World2DCanvas = dynamic(
  () => import("@/features/world/components/World2DCanvas").then((mod) => mod.World2DCanvas),
  { ssr: false }
);

const MOON_TYPES = ['beige', 'normal', 'red'] as const;
type MoonType = typeof MOON_TYPES[number];

const ONBOARDING_STORAGE_KEY = 'codewithasterixh_onboarding_v1';

export const Home: React.FC = () => {
  // World loading screen state (shown first while user views splash screen)
  const [isWorldLoading, setIsWorldLoading] = useState<boolean>(true);

  // User clicked Enter World to trigger world canvas loading
  const [isEnteringWorld, setIsEnteringWorld] = useState<boolean>(false);

  // Onboarding Start Screen State (shown after game finishes initial load)
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);

  // Pause Map Modal State
  const [isPauseModalOpen, setIsPauseModalOpen] = useState<boolean>(false);

  // Control Mode: 'arrow' (Arrow Buttons + Keyboard) or 'joystick' (Virtual Joystick + Keyboard)
  const [controlMode, setControlMode] = useState<ControlMode>('arrow');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [moonType, setMoonType] = useState<MoonType>('beige');
  const [isCombatActive, setIsCombatActive] = useState<boolean>(false);

  const [gender, setGender] = useState<Gender>(DEFAULT_GENDER);
  const [characterId, setCharacterId] = useState<CharacterId>(DEFAULT_CHARACTER);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [maxPlayerHp, setMaxPlayerHp] = useState<number>(100);
  const [respawnCountdown, setRespawnCountdown] = useState<number | null>(null);
  const [currentBiome, setCurrentBiome] = useState<CurrentBiomeInfo | undefined>(undefined);
  const [playerX, setPlayerX] = useState<number>(0);

  // Load saved onboarding & character preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data && data.completed) {
          setIsOnboarding(false);
          if (data.gender) setGender(data.gender);
          if (data.characterId) setCharacterId(data.characterId);
          if (typeof data.combatActive === 'boolean') setIsCombatActive(data.combatActive);
        }
      }
    } catch (e) {
      console.warn('Failed to load onboarding preferences from localStorage:', e);
    }
  }, []);

  const handleThemeModeChange = useCallback((newMode: 'light' | 'dark') => {
    if (newMode === 'dark') {
      // Pick a random moon color on switch to dark mode
      const randomMoon = MOON_TYPES[Math.floor(Math.random() * MOON_TYPES.length)];
      setMoonType(randomMoon);
    }
    setThemeMode(newMode);
  }, []);

  // Modal States
  const [activeStationModal, setActiveStationModal] = useState<MapLocationEntry | null>(null);
  const [bookModalState, setBookModalState] = useState<{ isOpen: boolean; mode: 'about' | 'works' }>({
    isOpen: false,
    mode: 'about',
  });
  const [infoTilesetState, setInfoTilesetState] = useState<{ isOpen: boolean; mode: 'project' | 'contact'; projectSlug?: string }>({
    isOpen: false,
    mode: 'project',
  });

  const p5SketchRef = useRef<any>(null);
  const playerXRef = useRef<number>(0);

  const handleOpenPauseMenu = useCallback(() => {
    setPlayerX(playerXRef.current);
    setIsPauseModalOpen(true);
  }, []);

  // Global ESC / P key to toggle Pause Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnboarding || isWorldLoading) return;
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        // If other modals are open, close them first; otherwise toggle pause menu
        if (bookModalState.isOpen) {
          setBookModalState((prev) => ({ ...prev, isOpen: false }));
        } else if (infoTilesetState.isOpen) {
          setInfoTilesetState((prev) => ({ ...prev, isOpen: false }));
        } else if (activeStationModal) {
          setActiveStationModal(null);
        } else {
          setPlayerX(playerXRef.current);
          setIsPauseModalOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboarding, isWorldLoading, bookModalState.isOpen, infoTilesetState.isOpen, activeStationModal]);

  const isAnyModalOpen = isWorldLoading || isOnboarding || isPauseModalOpen || bookModalState.isOpen || infoTilesetState.isOpen || activeStationModal !== null;

  useEffect(() => {
    if (p5SketchRef.current && typeof p5SketchRef.current.setModalActive === 'function') {
      p5SketchRef.current.setModalActive(isAnyModalOpen);
    }
  }, [isAnyModalOpen]);

  // State tracking whether p5 canvas is initialized and ready
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  const handleSketchReady = useCallback((instance: any) => {
    p5SketchRef.current = instance;
    if (instance.setCharacter) {
      instance.setCharacter(characterId);
    }
    if (typeof instance.setModalActive === 'function') {
      instance.setModalActive(isAnyModalOpen);
    }

    // Canvas is ready
    setIsCanvasReady(true);
  }, [characterId, isAnyModalOpen]);

  const handleStartEnterWorld = useCallback(() => {
    setIsEnteringWorld(true);
    if (isCanvasReady) {
      setIsWorldLoading(false);
    }
  }, [isCanvasReady]);

  // When world loading was triggered and canvas is fully ready, dismiss loading screen immediately
  useEffect(() => {
    if (isEnteringWorld && isCanvasReady && isWorldLoading) {
      setIsWorldLoading(false);
    }
  }, [isEnteringWorld, isCanvasReady, isWorldLoading]);

  const handleOnboardingComplete = useCallback((selectedGender: Gender, selectedCharId: CharacterId, combatActive: boolean) => {
    setGender(selectedGender);
    setCharacterId(selectedCharId);
    setIsCombatActive(combatActive);
    setIsOnboarding(false);

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
      } catch (e) {
        console.warn('Failed to save onboarding preferences to localStorage:', e);
      }
    }

    if (p5SketchRef.current) {
      if (typeof p5SketchRef.current.setGender === 'function') {
        p5SketchRef.current.setGender(selectedGender);
      }
      if (typeof p5SketchRef.current.setCharacter === 'function') {
        p5SketchRef.current.setCharacter(selectedCharId);
      }
      if (typeof p5SketchRef.current.setCombatActive === 'function') {
        p5SketchRef.current.setCombatActive(combatActive);
      }
    }
  }, []);


  const handleSelectGender = useCallback((newGender: Gender) => {
    setGender(newGender);
    const newChar = newGender === 'male' ? 'Fighter' : 'Countess_claire';
    setCharacterId(newChar);
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
        const data = saved ? JSON.parse(saved) : {};
        localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify({ ...data, gender: newGender, characterId: newChar }));
      } catch (e) {}
    }
    if (p5SketchRef.current && typeof p5SketchRef.current.setGender === 'function') {
      p5SketchRef.current.setGender(newGender);
    }
  }, []);

  const handleSelectCharacter = useCallback((newCharId: CharacterId) => {
    setCharacterId(newCharId);
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
        const data = saved ? JSON.parse(saved) : {};
        localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify({ ...data, characterId: newCharId }));
      } catch (e) {}
    }
    if (p5SketchRef.current && typeof p5SketchRef.current.setCharacter === 'function') {
      p5SketchRef.current.setCharacter(newCharId);
    }
  }, []);

  const handleNavigateToLocation = useCallback((x: number) => {
    if (p5SketchRef.current && typeof p5SketchRef.current.teleportTo === 'function') {
      p5SketchRef.current.teleportTo(x);
    }
    setIsPauseModalOpen(false);
  }, []);

  const handleVirtualInput = useCallback((action: VirtualInputAction, payload?: any) => {
    if (p5SketchRef.current && typeof p5SketchRef.current.handleVirtualInput === 'function') {
      p5SketchRef.current.handleVirtualInput(action, payload);
    }
  }, []);

  const handlePlayerPositionChange = useCallback((x: number, _y: number) => {
    playerXRef.current = x;
  }, []);

  const handleBiomeChange = useCallback((b: CurrentBiomeInfo) => {
    setCurrentBiome(b);
  }, []);

  // Inspect interactive object (Chest, Briefcase, Vault, etc.)
  const handleInspectObject = useCallback((obj: InteractiveWorldObject) => {
    setInfoTilesetState({
      isOpen: true,
      mode: 'project',
      projectSlug: obj.projectSlug,
    });
  }, []);

  // Inspect station or home
  const handleInspectStation = useCallback((loc?: MapLocationEntry) => {
    // Check if standing right next to an interactive object (Chest, Briefcase, Vault, Chamber)
    const nearbyObj = getNearbyWorldObject(playerXRef.current);
    if (nearbyObj && !loc) {
      handleInspectObject(nearbyObj);
      return;
    }

    const targetLoc = loc || getNearbyStationKiosk(playerXRef.current) || getActiveMapLocation(playerXRef.current);
    
    if (targetLoc.id === 'station_home' || targetLoc.featureType === 'about') {
      setBookModalState({ isOpen: true, mode: 'about' });
    } else if (targetLoc.featureType === 'projects') {
      setBookModalState({ isOpen: true, mode: 'works' });
    } else if (targetLoc.featureType === 'contact') {
      setInfoTilesetState({ isOpen: true, mode: 'contact' });
    } else {
      setActiveStationModal(targetLoc);
    }
  }, [handleInspectObject]);


  // Top navigation shortcuts
  const handleOpenAboutBook = useCallback(() => {
    setBookModalState({ isOpen: true, mode: 'about' });
  }, []);

  const handleOpenWorksBook = useCallback(() => {
    setBookModalState({ isOpen: true, mode: 'works' });
  }, []);

  const handleOpenContactTileset = useCallback(() => {
    setInfoTilesetState({ isOpen: true, mode: 'contact' });
  }, []);

  const handleOpenProjectDetailFromBook = useCallback((projectSlug: string) => {
    setInfoTilesetState({
      isOpen: true,
      mode: 'project',
      projectSlug,
    });
  }, []);

  const handleExitWorld = useCallback(() => {
    setIsPauseModalOpen(false);
    setBookModalState({ isOpen: false, mode: 'about' });
    setInfoTilesetState({ isOpen: false, mode: 'project' });
    setActiveStationModal(null);
    setIsWorldLoading(true);
    setIsEnteringWorld(false);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0F0F0F] font-pixelify select-none">
      {/* 1. INITIAL WORLD LOADING SCREEN (Full-screen game title screen shown first) */}
      {isWorldLoading && (
        <WorldLoadingScreen
          isLoading={isEnteringWorld && !isCanvasReady}
          onStart={handleStartEnterWorld}
        />
      )}

      {/* 1.5. ONBOARDING SCREEN (Shown after canvas finishes loading, before entering open world) */}
      {!isWorldLoading && isOnboarding && (
        <CharacterOnboardingScreen onComplete={handleOnboardingComplete} />
      )}


      {/* 2. 2D WORLD CANVAS (Only mounted and loaded after user clicks Enter World) */}
      {isEnteringWorld && (
        <World2DCanvas
          isModalActive={isAnyModalOpen}
          themeMode={themeMode}
          moonType={moonType}
          isCombatActive={isCombatActive}
          onSketchReady={handleSketchReady}
          onPlayerPositionChange={handlePlayerPositionChange}
          onPlayerHealthChange={(hp, max) => {
            setPlayerHp(hp);
            setMaxPlayerHp(max);
          }}
          onRespawnCountdownChange={setRespawnCountdown}
          onBiomeChange={handleBiomeChange}
          onInspectStation={handleInspectStation}
          onInspectObject={handleInspectObject}
        />
      )}

      {/* 3. SIMPLIFIED FLOATING HUD: Single Clean Pause/Map Button, Top Health Bar & Light/Dark Switch */}
      {!isWorldLoading && !isOnboarding && (
        <CharacterSelectorHUD
          currentBiome={currentBiome}
          controlMode={controlMode}
          themeMode={themeMode}
          characterId={characterId}
          playerHp={playerHp}
          maxPlayerHp={maxPlayerHp}
          respawnCountdown={respawnCountdown}
          isCombatActive={isCombatActive}
          onThemeModeChange={handleThemeModeChange}
          onOpenPauseMenu={handleOpenPauseMenu}
          onExitWorld={handleExitWorld}
          onInspectStation={() => handleInspectStation()}
          onVirtualInput={handleVirtualInput}
        />
      )}

      {/* 4. WORLD PAUSE & INTERACTIVE FAST-TRAVEL MAP MODAL */}
      <WorldPauseMapModal
        isOpen={isPauseModalOpen}
        gender={gender}
        characterId={characterId}
        playerX={playerX}
        controlMode={controlMode}
        isCombatActive={isCombatActive}
        onToggleCombat={() => {
          setIsCombatActive((prev) => {
            const next = !prev;
            if (p5SketchRef.current?.setCombatActive) {
              p5SketchRef.current.setCombatActive(next);
            }
            return next;
          });
        }}
        onClose={() => setIsPauseModalOpen(false)}
        onExitWorld={handleExitWorld}
        onNavigateToLocation={handleNavigateToLocation}
        onSelectGender={handleSelectGender}
        onSelectCharacter={handleSelectCharacter}
        onSelectControlMode={setControlMode}
        onOpenAbout={handleOpenAboutBook}
        onOpenProjects={handleOpenWorksBook}
        onOpenContact={handleOpenContactTileset}
      />

      {/* 5. ANIMATED MAGIC BOOK MODAL (About Bio & Works Directory) */}
      <BookModal
        isOpen={bookModalState.isOpen}
        mode={bookModalState.mode}
        onClose={() => setBookModalState({ ...bookModalState, isOpen: false })}
        onOpenProjectDetail={handleOpenProjectDetailFromBook}
        onOpenContact={handleOpenContactTileset}
      />

      {/* 6. RESPONSIVE INFO TILESET MODAL (Project Blueprints & Contact Dispatch) */}
      <InfoTilesetModal
        isOpen={infoTilesetState.isOpen}
        mode={infoTilesetState.mode}
        projectSlug={infoTilesetState.projectSlug}
        onClose={() => setInfoTilesetState({ ...infoTilesetState, isOpen: false })}
      />

      {/* 7. GENERAL PORTFOLIO STATION DRAWER */}
      {activeStationModal && (
        <PortfolioStationModal
          location={activeStationModal}
          onClose={() => setActiveStationModal(null)}
          onOpenContact={handleOpenContactTileset}
        />
      )}
    </div>
  );
};

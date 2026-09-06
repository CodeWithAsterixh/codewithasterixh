'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MapLocationEntry, getActiveMapLocation, getNearbyStationKiosk } from '../data/mapLayout';
import { InteractiveWorldObject, getNearbyWorldObject } from '../data/mapObjects';
import { useWorldContext } from './WorldStateContext';
import { useGameStateContext } from './GameStateContext';
import { ModalStateContextType } from './modalStateTypes';
import { useModalKeyboardListener } from './useModalKeyboardListener';

export type { ModalStateContextType };

const ModalStateContext = createContext<ModalStateContextType | null>(null);

export const ModalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playerXRef, setPlayerX, p5SketchRef } = useWorldContext();
  const { isWorldLoading, isOnboarding, setIsWorldLoading, setIsEnteringWorld } = useGameStateContext();

  const [isPauseModalOpen, setIsPauseModalOpen] = useState<boolean>(false);
  const [activeStationModal, setActiveStationModal] = useState<MapLocationEntry | null>(null);
  const [bookModalState, setBookModalState] = useState<{ isOpen: boolean; mode: 'about' | 'works' }>({ isOpen: false, mode: 'about' });
  const [infoTilesetState, setInfoTilesetState] = useState<{ isOpen: boolean; mode: 'project' | 'contact'; projectSlug?: string }>({ isOpen: false, mode: 'project' });

  const handleOpenPauseMenu = useCallback(() => {
    setPlayerX(playerXRef.current);
    setIsPauseModalOpen(true);
  }, [playerXRef, setPlayerX]);

  useModalKeyboardListener({
    isOnboarding,
    isWorldLoading,
    isBookOpen: bookModalState.isOpen,
    isTilesetOpen: infoTilesetState.isOpen,
    hasActiveStation: activeStationModal !== null,
    onCloseBook: () => setBookModalState((prev) => ({ ...prev, isOpen: false })),
    onCloseTileset: () => setInfoTilesetState((prev) => ({ ...prev, isOpen: false })),
    onCloseStation: () => setActiveStationModal(null),
    onTogglePause: () => { setPlayerX(playerXRef.current); setIsPauseModalOpen((prev) => !prev); },
  });

  const isAnyModalOpen = isWorldLoading || isOnboarding || isPauseModalOpen || bookModalState.isOpen || infoTilesetState.isOpen || activeStationModal !== null;

  useEffect(() => {
    p5SketchRef.current?.setModalActive?.(isAnyModalOpen);
  }, [isAnyModalOpen, p5SketchRef]);

  const handleInspectObject = useCallback((obj: InteractiveWorldObject) => {
    setInfoTilesetState({ isOpen: true, mode: 'project', projectSlug: obj.projectSlug });
  }, []);

  const handleInspectStation = useCallback((loc?: MapLocationEntry) => {
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
  }, [handleInspectObject, playerXRef]);

  const handleOpenAboutBook = useCallback(() => setBookModalState({ isOpen: true, mode: 'about' }), []);
  const handleOpenWorksBook = useCallback(() => setBookModalState({ isOpen: true, mode: 'works' }), []);
  const handleOpenContactTileset = useCallback(() => setInfoTilesetState({ isOpen: true, mode: 'contact' }), []);
  const handleOpenProjectDetailFromBook = useCallback((projectSlug: string) => {
    setInfoTilesetState({ isOpen: true, mode: 'project', projectSlug });
  }, []);
  const handleExitWorld = useCallback(() => {
    setIsPauseModalOpen(false);
    setBookModalState({ isOpen: false, mode: 'about' });
    setInfoTilesetState({ isOpen: false, mode: 'project' });
    setActiveStationModal(null);
    setIsWorldLoading(true);
    setIsEnteringWorld(false);
  }, [setIsWorldLoading, setIsEnteringWorld]);

  return (
    <ModalStateContext.Provider
      value={{
        isPauseModalOpen, setIsPauseModalOpen, activeStationModal, setActiveStationModal,
        bookModalState, setBookModalState, infoTilesetState, setInfoTilesetState,
        isAnyModalOpen, handleOpenPauseMenu, handleInspectObject, handleInspectStation,
        handleOpenAboutBook, handleOpenWorksBook, handleOpenContactTileset,
        handleOpenProjectDetailFromBook, handleExitWorld,
      }}
    >
      {children}
    </ModalStateContext.Provider>
  );
};

export function useModalContext(): ModalStateContextType {
  const context = useContext(ModalStateContext);
  if (!context) throw new Error('useModalContext must be used within a ModalStateProvider');
  return context;
}

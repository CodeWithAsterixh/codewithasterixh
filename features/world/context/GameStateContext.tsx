'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface GameStateContextType {
  isWorldLoading: boolean;
  setIsWorldLoading: (loading: boolean) => void;
  isEnteringWorld: boolean;
  setIsEnteringWorld: (entering: boolean) => void;
  isOnboarding: boolean;
  setIsOnboarding: (onboarding: boolean) => void;
  isCanvasReady: boolean;
  setIsCanvasReady: (ready: boolean) => void;
  handleStartEnterWorld: () => void;
}

const GameStateContext = createContext<GameStateContextType | null>(null);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWorldLoading, setIsWorldLoading] = useState<boolean>(true);
  const [isEnteringWorld, setIsEnteringWorld] = useState<boolean>(false);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);

  const handleStartEnterWorld = useCallback(() => {
    setIsEnteringWorld(true);
    if (isCanvasReady) {
      setIsWorldLoading(false);
    }
  }, [isCanvasReady]);

  // When world loading was triggered and canvas is ready, dismiss loading screen
  useEffect(() => {
    if (isEnteringWorld && isCanvasReady && isWorldLoading) {
      setIsWorldLoading(false);
    }
  }, [isEnteringWorld, isCanvasReady, isWorldLoading]);

  return (
    <GameStateContext.Provider
      value={{
        isWorldLoading,
        setIsWorldLoading,
        isEnteringWorld,
        setIsEnteringWorld,
        isOnboarding,
        setIsOnboarding,
        isCanvasReady,
        setIsCanvasReady,
        handleStartEnterWorld,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export function useGameStateContext(): GameStateContextType {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameStateContext must be used within a GameStateProvider');
  }
  return context;
}

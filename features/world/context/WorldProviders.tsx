'use client';

import React from 'react';
import { GameStateProvider } from './GameStateContext';
import { CharacterStateProvider } from './CharacterStateContext';
import { WorldStateProvider } from './WorldStateContext';
import { ModalStateProvider } from './ModalStateContext';

export const WorldProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GameStateProvider>
      <CharacterStateProvider>
        <WorldStateProvider>
          <ModalStateProvider>{children}</ModalStateProvider>
        </WorldStateProvider>
      </CharacterStateProvider>
    </GameStateProvider>
  );
};

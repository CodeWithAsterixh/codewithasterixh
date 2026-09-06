import { useEffect } from 'react';
import { MapLocationEntry } from '../data/mapLayout';

interface ModalKeyboardListenerProps {
  isOnboarding: boolean;
  isWorldLoading: boolean;
  isBookOpen: boolean;
  isTilesetOpen: boolean;
  hasActiveStation: boolean;
  onCloseBook: () => void;
  onCloseTileset: () => void;
  onCloseStation: () => void;
  onTogglePause: () => void;
}

export function useModalKeyboardListener({
  isOnboarding,
  isWorldLoading,
  isBookOpen,
  isTilesetOpen,
  hasActiveStation,
  onCloseBook,
  onCloseTileset,
  onCloseStation,
  onTogglePause,
}: ModalKeyboardListenerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOnboarding || isWorldLoading) return;
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        if (isBookOpen) onCloseBook();
        else if (isTilesetOpen) onCloseTileset();
        else if (hasActiveStation) onCloseStation();
        else onTogglePause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboarding, isWorldLoading, isBookOpen, isTilesetOpen, hasActiveStation, onCloseBook, onCloseTileset, onCloseStation, onTogglePause]);
}

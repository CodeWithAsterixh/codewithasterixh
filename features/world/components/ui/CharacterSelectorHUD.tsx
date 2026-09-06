'use client';

import React from 'react';
import { useTouchControlsDetection } from './hud/hooks/useTouchControlsDetection';
import { TopStatusBar } from './hud/TopStatusBar';
import { MobileTouchControls } from './hud/MobileTouchControls';
import { useWorldContext } from '../../context/WorldStateContext';

export const CharacterSelectorHUD: React.FC = () => {
  const { handleVirtualInput } = useWorldContext();
  const { showTouchControls } = useTouchControlsDetection(handleVirtualInput);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-6 font-pixelify select-none">
      {/* 1. TOP BAR: MAP (LEFT), THEME (RIGHT), HEALTH & PROXIMITY BADGE */}
      <TopStatusBar />

      {/* 2. BOTTOM BAR: CONTROLS (SHOWN IF NO KEYBOARD OR ON TOUCH DEVICE) */}
      {showTouchControls && <MobileTouchControls />}
    </div>
  );
};

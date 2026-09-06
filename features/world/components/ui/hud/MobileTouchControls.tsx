'use client';

import React from 'react';
import { VirtualJoystick } from '../VirtualJoystick';
import { MobileDpadControls } from './MobileDpadControls';
import { MobileActionButtons } from './MobileActionButtons';
import { useWorldContext } from '../../../context/WorldStateContext';
import { useCharacterContext } from '../../../context/CharacterStateContext';
import { useModalContext } from '../../../context/ModalStateContext';

export const MobileTouchControls: React.FC = () => {
  const { controlMode, handleVirtualInput } = useWorldContext();
  const { isCombatActive } = useCharacterContext();
  const { handleInspectStation } = useModalContext();

  return (
    <div className="pointer-events-auto flex items-end justify-between gap-2">
      {controlMode === 'joystick' ? (
        <VirtualJoystick onVirtualInput={handleVirtualInput} />
      ) : (
        <MobileDpadControls handleVirtualInput={handleVirtualInput} />
      )}

      <MobileActionButtons
        isCombatActive={isCombatActive}
        handleVirtualInput={handleVirtualInput}
        handleInspectStation={handleInspectStation}
      />
    </div>
  );
};

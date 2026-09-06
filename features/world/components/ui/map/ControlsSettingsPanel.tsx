import React from 'react';
import {
  CompassIcon,
  ArrowsLeftRightIcon,
  GameControllerIcon,
} from '@phosphor-icons/react';
import { ControlPanel, ControlRow, SwitchButton } from './MapModalUIPrimitives';
import { useWorldContext } from '../../../context/WorldStateContext';
import { useCharacterContext } from '../../../context/CharacterStateContext';

export const ControlsSettingsPanel: React.FC = () => {
  const { controlMode, setControlMode } = useWorldContext();
  const { isCombatActive, handleToggleCombat } = useCharacterContext();

  return (
    <ControlPanel icon={<CompassIcon size={16} weight="duotone" />} title="Controls & Layout">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Control Scheme Option Toggle */}
        <div className="space-y-2.5 bg-[#171A21]/60 p-2.5 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="text-[8px] uppercase font-bold text-[#D9A441] mb-1.5 tracking-wider">
              Control Scheme
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <SwitchButton
                active={controlMode === 'arrow'}
                onClick={() => setControlMode('arrow')}
              >
                <span className="flex items-center justify-center gap-1">
                  <ArrowsLeftRightIcon size={12} weight="duotone" />
                  <span>Arrow + Key</span>
                </span>
              </SwitchButton>

              <SwitchButton
                active={controlMode === 'joystick'}
                onClick={() => setControlMode('joystick')}
              >
                <span className="flex items-center justify-center gap-1">
                  <GameControllerIcon size={12} weight="duotone" />
                  <span>Joystick + Key</span>
                </span>
              </SwitchButton>
            </div>
          </div>

          <div className="pt-2 border-t border-[#363D46]/80 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#CAD1DB] flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 fill-current text-[#EF4444]"
                viewBox="0 0 16 16"
                style={{ shapeRendering: 'crispEdges' }}
              >
                <path d="M1 1h2v2H1V1zm2 2h2v2H3V3zm2 2h2v2H5V5zm4 0h2v2H9V5zm2-2h2v2h-2V3zm2-2h2v2h-2V1zm-4 6h2v2H9V7zm-2 2h2v2H7V9zm-2 2h2v2H5v-2zm-2 2h2v2H3v-2zm-2 2h2v2H1v-2zm12-4h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2H9v-2z" />
              </svg>
              <span>Combat Mode</span>
            </span>
            <SwitchButton small active={isCombatActive} onClick={handleToggleCombat}>
              {isCombatActive ? 'Active' : 'Disabled'}
            </SwitchButton>
          </div>
        </div>

        {/* Keybindings Grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <ControlRow label="Move" keys={['A / D']} />
          <ControlRow label="Sprint" keys={['SHIFT']} />
          <ControlRow label="Jump" keys={['SPACE']} />
          <ControlRow label="Inspect" keys={['E']} />
          <ControlRow label="Attack 1" keys={['J']} />
          <ControlRow label="Attack 2" keys={['K']} />
          <ControlRow label="Attack 3" keys={['L']} />
          <ControlRow label="Attack 4" keys={['U']} />
        </div>
      </div>
    </ControlPanel>
  );
};

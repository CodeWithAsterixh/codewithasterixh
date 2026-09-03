import React from 'react';
import clsx from 'clsx';
import { Gender, CharacterId, ControlMode } from '../../types';
import {
  GENDER_CHARACTERS,
  CHARACTER_DEFS,
} from '../../data/characterData';

import {
  PlayIcon,
  XIcon,
  MapPinIcon,
  CompassIcon,
  UserIcon,
  BookOpenIcon,
  BriefcaseIcon,
  PaperPlaneTiltIcon,
  CaretRightIcon,
  ArrowsLeftRightIcon,
  GameControllerIcon,
} from '@phosphor-icons/react';

interface WorldPauseMapModalProps {
  isOpen: boolean;
  gender: Gender;
  characterId: CharacterId;
  playerX: number;
  controlMode?: ControlMode;
  isCombatActive?: boolean;
  onToggleCombat?: () => void;
  onClose: () => void;
  onNavigateToLocation: (x: number) => void;
  onSelectGender: (gender: Gender) => void;
  onSelectCharacter: (charId: CharacterId) => void;
  onSelectControlMode?: (mode: ControlMode) => void;
  onOpenAbout: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

const mapLocations = [
  {
    id: 'loc_quizeen',
    name: 'Quizeen',
    sub: 'Quiz App',
    x: -2800,
    left: '12%',
  },
  {
    id: 'loc_workup',
    name: 'WorkUp',
    sub: 'Card Generator',
    x: -1600,
    left: '24%',
  },
  {
    id: 'loc_garage',
    name: 'Services Garage',
    sub: 'Services',
    x: -520,
    left: '42%',
  },
  {
    id: 'loc_origin',
    name: 'Home Base',
    sub: '0m',
    x: 0,
    left: '50%',
  },
  {
    id: 'loc_mailbox',
    name: 'Contact Mailbox',
    sub: 'Contact',
    x: 220,
    left: '54%',
  },
  {
    id: 'loc_time',
    name: 'WorldTimeSage',
    sub: 'Timezone App',
    x: 800,
    left: '68%',
  },
  {
    id: 'loc_sms',
    name: 'School Portal',
    sub: 'Admin Portal',
    x: 1800,
    left: '78%',
  },
  {
    id: 'loc_astermail',
    name: 'AsterMail',
    sub: 'Email App',
    x: 3200,
    left: '90%',
  },
];

export const WorldPauseMapModal: React.FC<
  WorldPauseMapModalProps
> = ({
  isOpen,
  gender,
  characterId,
  playerX,
  controlMode = 'arrow',
  isCombatActive = false,
  onToggleCombat,
  onClose,
  onNavigateToLocation,
  onSelectGender,
  onSelectCharacter,
  onSelectControlMode,
  onOpenAbout,
  onOpenProjects,
  onOpenContact,
}) => {
    if (!isOpen) return null;

    const availableCharacters = GENDER_CHARACTERS[gender];

    const activeCharacter =
      CHARACTER_DEFS[characterId];

    const handleTravel = (x: number) => {
      onNavigateToLocation(x);
      onClose();
    };

    return (
      <div
        className={clsx(
          'fixed inset-0 z-[180]',
          'flex items-center justify-center',
          'bg-[#080B12]/90',
          'p-3 sm:p-5',
          'backdrop-blur-sm',
          'font-mono',
          'select-none',
        )}
      >
        {/* Main Game Menu */}
        <div
          className={clsx(
            'relative w-full max-w-5xl',
            'max-h-[94vh]',
            'overflow-hidden',
            'flex flex-col',
            'bg-[#20252D]',
            'border-2 border-[#4A525D]',
            'rounded-md',
            'shadow-[0_20px_60px_rgba(0,0,0,0.75)]',
          )}
        >
          {/* Top Highlight */}
          <div
            className={clsx(
              'absolute inset-x-0 top-0 z-30',
              'h-px',
              'bg-white/20',
            )}
          />

          {/* ================================================================ */}
          {/* HEADER                                                            */}
          {/* ================================================================ */}

          <header
            className={clsx(
              'relative z-20',
              'flex items-center justify-between',
              'gap-4',
              'px-4 py-3 sm:px-5',
              'bg-[#292F38]',
              'border-b border-[#101318]',
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Game Menu Icon */}
              <div
                className={clsx(
                  'flex h-9 w-9 shrink-0',
                  'items-center justify-center',
                  'rounded-md',
                  'bg-[#D9A441]',
                  'border-b-2 border-[#8A6322]',
                  'text-[#1A1D21]',
                )}
              >
                <CompassIcon
                  size={20}
                  weight="fill"
                />
              </div>

              <div className="min-w-0">
                <h2
                  className={clsx(
                    'truncate',
                    'text-sm sm:text-base',
                    'font-black uppercase',
                    'tracking-tight',
                    'text-white',
                  )}
                >
                  World Map
                </h2>

                <p
                  className={clsx(
                    'truncate',
                    'text-[9px] sm:text-[10px]',
                    'font-bold',
                    'text-[#9BA3AE]',
                  )}
                >
                  Select a location to fast travel
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              title="Resume Game"
              className={clsx(
                'group',
                'flex h-9 w-9 shrink-0',
                'items-center justify-center',
                'rounded-md',
                'bg-[#343A44]',
                'border border-[#555D68]',
                'text-[#C8CDD3]',
                'transition-colors',
                'hover:bg-[#454C57]',
                'hover:text-white',
                'active:translate-y-px',
                'cursor-pointer',
              )}
            >
              <XIcon
                size={17}
                weight="bold"
              />
            </button>
          </header>

          {/* ================================================================ */}
          {/* BODY                                                              */}
          {/* ================================================================ */}

          <div
            className={clsx(
              'flex-1 overflow-y-auto',
              'bg-[#171B21]',
              'p-3 sm:p-4',
            )}
          >
            {/* ============================================================ */}
            {/* MAP                                                           */}
            {/* ============================================================ */}

            <section
              className={clsx(
                'relative overflow-hidden',
                'rounded-lg',
                'border-2 border-[#3E4650]',
                'bg-[#0D1014]',
                'shadow-[0_8px_20px_rgba(0,0,0,0.35)]',
              )}
            >
              {/* Map */}
              <div className="relative aspect-[16/8] min-h-[220px]">
                <img
                  src="/maps/world_map.jpg"
                  alt="Asterixh World Map"
                  className={clsx(
                    'absolute inset-0',
                    'h-full w-full',
                    'object-cover',
                  )}
                />

                {/* Dark game-style map overlay */}
                <div
                  className={clsx(
                    'absolute inset-0',
                    'bg-[#10151B]/15',
                    'pointer-events-none',
                  )}
                />

                {/* Location Nodes */}
                {mapLocations.map((location) => {
                  const isCurrent =
                    Math.abs(playerX - location.x) < 300;

                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() =>
                        handleTravel(location.x)
                      }
                      style={{
                        left: location.left,
                      }}
                      className={clsx(
                        'absolute bottom-4',
                        'z-10',
                        '-translate-x-1/2',
                        'cursor-pointer',
                        'group',
                      )}
                    >
                      {/* Marker */}
                      <div
                        className={clsx(
                          'flex flex-col items-center',
                          'transition-transform duration-100',
                          'group-hover:-translate-y-1',
                        )}
                      >
                        {/* Label */}
                        <div
                          className={clsx(
                            'mb-1',
                            'whitespace-nowrap',
                            'rounded-md',
                            'border',
                            'px-2 py-1',
                            'text-[8px] sm:text-[9px]',
                            'font-black uppercase',
                            'shadow-lg',
                            isCurrent
                              ? [
                                'border-[#F3C65B]',
                                'bg-[#252B34]',
                                'text-[#F3C65B]',
                              ]
                              : [
                                'border-[#4A525D]',
                                'bg-[#20252D]/95',
                                'text-white',
                              ],
                          )}
                        >
                          {location.name}
                        </div>

                        {/* Pin */}
                        <div
                          className={clsx(
                            'relative',
                            'flex h-7 w-7',
                            'items-center justify-center',
                            'rounded-full',
                            'border-2',
                            'shadow-[0_3px_8px_rgba(0,0,0,0.6)]',
                            isCurrent
                              ? [
                                'border-white',
                                'bg-[#E0A936]',
                                'scale-110',
                              ]
                              : [
                                'border-[#D5D9DE]',
                                'bg-[#2E3742]',
                                'group-hover:bg-[#E0A936]',
                              ],
                          )}
                        >
                          <MapPinIcon
                            size={14}
                            weight="fill"
                            className={clsx(
                              isCurrent
                                ? 'text-[#20252D]'
                                : 'text-white',
                              'group-hover:text-[#20252D]',
                            )}
                          />
                        </div>

                        {/* Current indicator */}
                        {isCurrent && (
                          <span
                            className={clsx(
                              'absolute -bottom-5',
                              'whitespace-nowrap',
                              'text-[7px]',
                              'font-black uppercase',
                              'tracking-wider',
                              'text-white',
                            )}
                          >
                            You are here
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map HUD */}
              <div
                className={clsx(
                  'absolute left-3 top-3',
                  'rounded-md',
                  'border border-white/15',
                  'bg-[#15191F]/90',
                  'px-2.5 py-1.5',
                  'text-[8px]',
                  'font-black uppercase',
                  'tracking-wider',
                  'text-white',
                )}
              >
                Asterixh World
              </div>

              <div
                className={clsx(
                  'absolute bottom-3 right-3',
                  'hidden sm:block',
                  'rounded-md',
                  'border border-white/15',
                  'bg-[#15191F]/90',
                  'px-2.5 py-1.5',
                  'text-[8px]',
                  'font-bold',
                  'text-[#B5BDC7]',
                )}
              >
                CLICK A LANDMARK TO TRAVEL
              </div>
            </section>

            {/* ============================================================ */}
            {/* QUICK CONTROLS                                                */}
            {/* ============================================================ */}

            <div
              className={clsx(
                'mt-3',
                'grid grid-cols-1',
                'gap-3',
                'md:grid-cols-3',
              )}
            >
              <ControlPanel
                icon={
                  <CompassIcon
                    size={16}
                    weight="duotone"
                  />
                }
                title="Controls & Layout"
              >
                {/* Control Scheme Option Toggle */}
                <div className="mb-2.5 pb-2 border-b border-white/10">
                  <div className="text-[8px] uppercase font-bold text-white/50 mb-1.5 tracking-wider">
                    Control Scheme
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <SwitchButton
                      active={controlMode === 'arrow'}
                      onClick={() => onSelectControlMode?.('arrow')}
                    >
                      <span className="flex items-center justify-center gap-1">
                        <ArrowsLeftRightIcon size={12} weight="duotone" />
                        <span>Arrow + Key</span>
                      </span>
                    </SwitchButton>

                    <SwitchButton
                      active={controlMode === 'joystick'}
                      onClick={() => onSelectControlMode?.('joystick')}
                    >
                      <span className="flex items-center justify-center gap-1">
                        <GameControllerIcon size={12} weight="duotone" />
                        <span>Joystick + Key</span>
                      </span>
                    </SwitchButton>
                  </div>
                </div>

                <ControlRow
                  label="Move"
                  keys={['A / D']}
                />

                <ControlRow
                  label="Sprint"
                  keys={['SHIFT']}
                />

                <ControlRow
                  label="Jump"
                  keys={['SPACE']}
                />

                <ControlRow
                  label="Attack 1"
                  keys={['J']}
                />

                <ControlRow
                  label="Attack 2"
                  keys={['K']}
                />

                <ControlRow
                  label="Attack 3"
                  keys={['L']}
                />

                <ControlRow
                  label="Attack 4"
                  keys={['U']}
                />

                <ControlRow
                  label="Inspect"
                  keys={['E']}
                />

                {onToggleCombat && (
                  <div className="mt-2 pt-2 border-t border-[#363D46]/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#CAD1DB] flex items-center gap-1">
                      <span>⚔️ Combat Mode</span>
                    </span>
                    <SwitchButton
                      small
                      active={isCombatActive}
                      onClick={onToggleCombat}
                    >
                      {isCombatActive ? 'Active' : 'Disabled'}
                    </SwitchButton>
                  </div>
                )}
              </ControlPanel>

              <ControlPanel
                icon={
                  <UserIcon
                    size={16}
                    weight="fill"
                  />
                }
                title="Character"
              >
                <div className="grid grid-cols-2 gap-1.5">
                  <SwitchButton
                    active={gender === 'male'}
                    onClick={() =>
                      onSelectGender('male')
                    }
                  >
                    Male
                  </SwitchButton>

                  <SwitchButton
                    active={gender === 'female'}
                    onClick={() =>
                      onSelectGender('female')
                    }
                  >
                    Female
                  </SwitchButton>
                </div>

                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {availableCharacters.map(
                    (charId) => {
                      const def =
                        CHARACTER_DEFS[charId];

                      return (
                        <SwitchButton
                          key={charId}
                          small
                          active={
                            characterId === charId
                          }
                          onClick={() =>
                            onSelectCharacter(charId)
                          }
                        >
                          {def.name}
                        </SwitchButton>
                      );
                    },
                  )}
                </div>

                <div
                  className={clsx(
                    'mt-2',
                    'border-t border-[#363D46]',
                    'pt-2',
                    'text-[8px]',
                    'font-bold uppercase',
                    'text-[#7F8995]',
                  )}
                >
                  Current: {activeCharacter.name}
                </div>
              </ControlPanel>

              <ControlPanel
                icon={
                  <CaretRightIcon
                    size={16}
                    weight="fill"
                  />
                }
                title="Quick Pages"
              >
                <QuickAction
                  icon={
                    <BookOpenIcon
                      size={14}
                      weight="fill"
                    />
                  }
                  label="About Developer"
                  onClick={() => {
                    onClose();
                    onOpenAbout();
                  }}
                />

                <QuickAction
                  icon={
                    <BriefcaseIcon
                      size={14}
                      weight="fill"
                    />
                  }
                  label="Projects"
                  onClick={() => {
                    onClose();
                    onOpenProjects();
                  }}
                />

                <QuickAction
                  icon={
                    <PaperPlaneTiltIcon
                      size={14}
                      weight="fill"
                    />
                  }
                  label="Contact"
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                />
              </ControlPanel>
            </div>

            {/* ============================================================ */}
            {/* RESUME                                                        */}
            {/* ============================================================ */}

            <div className="mt-3">
              <button
                type="button"
                onClick={onClose}
                className={clsx(
                  'group relative w-full',
                  'cursor-pointer',
                )}
              >
                {/* Button depth */}
                <span
                  className={clsx(
                    'absolute inset-x-0 top-1.5 bottom-0',
                    'rounded-lg',
                    'bg-[#8A6322]',
                    'border border-[#654A1D]',
                  )}
                />

                {/* Button face */}
                <span
                  className={clsx(
                    'relative z-10',
                    'flex items-center justify-center',
                    'gap-2',
                    'rounded-lg',
                    'border-2 border-[#F0C75E]',
                    'bg-[#D9A441]',
                    'px-5 py-3',
                    'text-xs sm:text-sm',
                    'font-black uppercase',
                    'tracking-wide',
                    'text-[#1A1D21]',
                    'transition-transform duration-100',
                    'group-hover:-translate-y-0.5',
                    'group-hover:bg-[#E2B24D]',
                    'group-active:translate-y-1',
                  )}
                >
                  <PlayIcon
                    size={17}
                    weight="fill"
                  />

                  <span>
                    Resume Game
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

/* ========================================================================== */
/* CONTROL PANEL                                                              */
/* ========================================================================== */

interface ControlPanelProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  icon,
  title,
  children,
}) => {
  return (
    <section
      className={clsx(
        'rounded-lg',
        'border border-[#3B424C]',
        'bg-[#242A32]',
        'p-3',
      )}
    >
      <div
        className={clsx(
          'mb-3',
          'flex items-center gap-2',
          'border-b border-[#363D46]',
          'pb-2',
          'text-[10px]',
          'font-black uppercase tracking-wider',
          'text-white',
        )}
      >
        <span className="text-[#D9A441]">
          {icon}
        </span>

        <span>{title}</span>
      </div>

      {children}
    </section>
  );
};

/* ========================================================================== */
/* CONTROL ROW                                                                */
/* ========================================================================== */

interface ControlRowProps {
  label: string;
  keys: string[];
}

const ControlRow: React.FC<ControlRowProps> = ({
  label,
  keys,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        'py-1',
        'text-[9px]',
        'font-bold',
        'text-[#9FA7B2]',
      )}
    >
      <span>{label}</span>

      <div className="flex items-center gap-1">
        {keys.map((key) => (
          <kbd
            key={key}
            className={clsx(
              'min-w-6',
              'rounded',
              'border border-[#505862]',
              'bg-[#15191F]',
              'px-1.5 py-1',
              'text-center',
              'text-[8px]',
              'font-black',
              'text-white',
            )}
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
};

/* ========================================================================== */
/* SWITCH BUTTON                                                              */
/* ========================================================================== */

interface SwitchButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}

const SwitchButton: React.FC<
  SwitchButtonProps
> = ({
  active,
  onClick,
  children,
  small = false,
}) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'cursor-pointer',
          'rounded-md',
          'border',
          'font-black uppercase',
          'transition-colors',
          'active:translate-y-px',
          small
            ? 'px-1.5 py-1 text-[8px]'
            : 'px-2 py-1.5 text-[9px]',
          active
            ? [
              'border-[#D9A441]',
              'bg-[#D9A441]',
              'text-[#1A1D21]',
            ]
            : [
              'border-[#4A525D]',
              'bg-[#30363F]',
              'text-[#AAB1BA]',
              'hover:bg-[#3A414B]',
              'hover:text-white',
            ],
        )}
      >
        {children}
      </button>
    );
  };

/* ========================================================================== */
/* QUICK ACTION                                                               */
/* ========================================================================== */

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickAction: React.FC<
  QuickActionProps
> = ({
  icon,
  label,
  onClick,
}) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'group w-full',
          'flex items-center gap-2',
          'rounded-md',
          'border border-[#414852]',
          'bg-[#30363F]',
          'px-3 py-2',
          'text-left',
          'text-[9px]',
          'font-black uppercase',
          'text-[#D1D5DA]',
          'transition-colors',
          'hover:border-[#D9A441]',
          'hover:bg-[#3A414B]',
          'hover:text-white',
          'cursor-pointer',
        )}
      >
        <span
          className={clsx(
            'text-[#D9A441]',
            'transition-transform',
            'group-hover:translate-x-0.5',
          )}
        >
          {icon}
        </span>

        <span className="flex-1">
          {label}
        </span>

        <CaretRightIcon
          size={12}
          weight="bold"
          className="text-[#69727D]"
        />
      </button>
    );
  };

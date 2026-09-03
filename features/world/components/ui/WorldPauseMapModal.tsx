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
          style={{
            clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
          }}
          className={clsx(
            'relative w-full max-w-5xl',
            'max-h-[94vh]',
            'overflow-hidden',
            'flex flex-col',
            'bg-[#20252D]',
            'border-4 border-[#384252]',
            'shadow-[8px_8px_0px_rgba(0,0,0,1)]',
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
              'border-b-2 border-black',
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Game Menu Icon */}
              <div
                style={{
                  clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                }}
                className={clsx(
                  'flex h-9 w-9 shrink-0',
                  'items-center justify-center',
                  'bg-[#D9A441]',
                  'border-2 border-black',
                  'shadow-[2px_2px_0px_rgba(0,0,0,1)]',
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
                  Game Menu
                </h2>

                <p
                  className={clsx(
                    'truncate',
                    'text-[9px] sm:text-[10px]',
                    'font-bold',
                    'text-[#9BA3AE]',
                  )}
                >
                  Controls, character selection & fast travel
                </p>

              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              title="Resume Game"
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#2C3440] hover:bg-[#3E4856] text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-px active:translate-x-px cursor-pointer"
            >
              <XIcon
                size={16}
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

            {/* FAST TRAVEL LOCATIONS BAR */}
            <section
              style={{
                clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
              }}
              className="border-4 border-[#3E4650] bg-[#11151C] p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-2 mb-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#D9A441] tracking-wider flex items-center gap-1.5">
                  <MapPinIcon size={16} weight="fill" />
                  Fast Travel Locations
                </span>
                <span className="text-[10px] text-[#9BA3AE] font-mono">
                  Click location to teleport
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {mapLocations.map((location) => {
                  const isCurrent = Math.abs(playerX - location.x) < 300;
                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => handleTravel(location.x)}
                      style={{
                        clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                      }}
                      className={clsx(
                        'flex flex-col items-start p-2 border-2 transition-all cursor-pointer text-left',
                        isCurrent
                          ? 'bg-[#D9A441] text-[#1A1D21] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                          : 'bg-[#20252D] text-white border-black hover:bg-[#2C3440] shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] font-black uppercase tracking-tight truncate">
                          {location.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[8px] bg-black/30 text-black font-extrabold px-1 rounded">
                            HERE
                          </span>
                        )}
                      </div>
                      <span className={clsx('text-[9px] font-mono truncate', isCurrent ? 'text-[#1A1D21]/80' : 'text-[#9BA3AE]')}>
                        {location.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>


            {/* ============================================================ */}
            {/* QUICK CONTROLS                                                */}
            {/* ============================================================ */}

            {/* ROW 1: CONTROLS & LAYOUT (FULL WIDTH) */}
            <div className="mt-3">
              <ControlPanel
                icon={<CompassIcon size={16} weight="duotone" />}
                title="Controls & Layout"
              >
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

                    {onToggleCombat && (
                      <div className="pt-2 border-t border-[#363D46]/80 flex items-center justify-between">
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
            </div>

            {/* ROW 2: CHARACTER SELECTION & QUICK PAGES */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* CHARACTER SELECTION */}
              <ControlPanel
                icon={<UserIcon size={16} weight="fill" />}
                title="Character"
              >
                <div className="space-y-2">
                  <div className="text-[8px] uppercase font-bold text-white/50 tracking-wider">
                    Select Gender
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <SwitchButton
                      active={gender === 'male'}
                      onClick={() => onSelectGender('male')}
                    >
                      Male
                    </SwitchButton>

                    <SwitchButton
                      active={gender === 'female'}
                      onClick={() => onSelectGender('female')}
                    >
                      Female
                    </SwitchButton>
                  </div>

                  <div className="text-[8px] uppercase font-bold text-white/50 tracking-wider pt-1">
                    Select Fighter Class
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {availableCharacters.map((charId) => {
                      const def = CHARACTER_DEFS[charId];
                      return (
                        <SwitchButton
                          key={charId}
                          small
                          active={characterId === charId}
                          onClick={() => onSelectCharacter(charId)}
                        >
                          {def.name}
                        </SwitchButton>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#363D46] pt-1.5 text-[9px] font-bold uppercase text-[#D9A441]">
                    Active Character: {activeCharacter.name} ({gender})
                  </div>
                </div>
              </ControlPanel>

              {/* QUICK PAGES */}
              <ControlPanel
                icon={<CaretRightIcon size={16} weight="fill" />}
                title="Quick Pages"
              >
                <div className="space-y-1.5">
                  <QuickAction
                    icon={<BookOpenIcon size={14} weight="fill" />}
                    label="About Developer"
                    onClick={() => {
                      onClose();
                      onOpenAbout();
                    }}
                  />

                  <QuickAction
                    icon={<BriefcaseIcon size={14} weight="fill" />}
                    label="Projects"
                    onClick={() => {
                      onClose();
                      onOpenProjects();
                    }}
                  />

                  <QuickAction
                    icon={<PaperPlaneTiltIcon size={14} weight="fill" />}
                    label="Contact"
                    onClick={() => {
                      onClose();
                      onOpenContact();
                    }}
                  />
                </div>
              </ControlPanel>
            </div>


            {/* ============================================================ */}
            {/* RESUME                                                        */}
            {/* ============================================================ */}
            <div className="mt-3">
              <button
                type="button"
                onClick={onClose}
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#D9A441] hover:bg-[#E5B152] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-[#1A1D21] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              >
                <PlayIcon
                  size={17}
                  weight="fill"
                />
                <span>Resume Exploring</span>
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

const ControlPanel: React.FC<
  ControlPanelProps
> = ({
  icon,
  title,
  children,
}) => {
    return (
      <div
        style={{
          clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
        }}
        className={clsx(
          'space-y-2',
          'border-2 border-black',
          'bg-[#1F242C]',
          'p-3',
          'shadow-[3px_3px_0px_rgba(0,0,0,1)]',
        )}
      >
        <div
          className={clsx(
            'flex items-center gap-1.5',
            'text-[10px]',
            'font-black uppercase',
            'tracking-wider',
            'text-[#F0C75E]',
          )}
        >
          {icon}
          <span>{title}</span>
        </div>

        {children}
      </div>
    );
  };

/* ========================================================================== */
/* CONTROL ROW                                                                */
/* ========================================================================== */

interface ControlRowProps {
  label: string;
  keys: string[];
}

const ControlRow: React.FC<
  ControlRowProps
> = ({
  label,
  keys,
}) => {
    return (
      <div
        style={{
          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
        }}
        className={clsx(
          'flex items-center justify-between',
          'border border-black',
          'bg-[#2A313C]',
          'px-2.5 py-1.5',
          'text-[9px]',
          'shadow-[1px_1px_0px_rgba(0,0,0,0.5)]',
        )}
      >
        <span
          className={clsx(
            'font-black uppercase',
            'text-[#CAD1DB]',
          )}
        >
          {label}
        </span>

        <div className="flex gap-1">
          {keys.map((key) => (
            <kbd
              key={key}
              style={{
                clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
              }}
              className={clsx(
                'flex items-center justify-center',
                'border-2 border-black',
                'bg-[#1A1F26]',
                'px-1.5 py-0.5',
                'font-mono text-[9px]',
                'font-black',
                'text-[#F0C75E]',
                'shadow-[1px_1px_0px_rgba(0,0,0,1)]',
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
  active?: boolean;
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
        style={{
          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
        }}
        className={clsx(
          'cursor-pointer',
          'border-2 border-black',
          'font-black uppercase',
          'shadow-[2px_2px_0px_rgba(0,0,0,1)]',
          'active:translate-x-px active:translate-y-px',
          small
            ? 'px-2 py-1 text-[8px]'
            : 'px-2.5 py-1.5 text-[9px]',
          active
            ? [
              'bg-[#D9A441]',
              'text-[#1A1D21]',
            ]
            : [
              'bg-[#2C3440]',
              'text-[#AAB1BA]',
              'hover:bg-[#3A4350]',
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
        style={{
          clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
        }}
        className={clsx(
          'group w-full',
          'flex items-center gap-2',
          'border-2 border-black',
          'bg-[#2C3440]',
          'shadow-[2px_2px_0px_rgba(0,0,0,1)]',
          'px-3 py-2',
          'text-left',
          'text-[9px]',
          'font-black uppercase',
          'text-[#D1D5DA]',
          'hover:bg-[#3A4350]',
          'hover:text-white',
          'active:translate-x-px active:translate-y-px',
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

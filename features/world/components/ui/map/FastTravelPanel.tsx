import React from 'react';
import clsx from 'clsx';
import { MapPinIcon } from '@phosphor-icons/react';
import { useWorldContext } from '../../../context/WorldStateContext';
import { useModalContext } from '../../../context/ModalStateContext';

export interface MapLocation {
  id: string;
  name: string;
  sub: string;
  x: number;
  left: string;
}

export const MAP_LOCATIONS: MapLocation[] = [
  { id: 'loc_quizeen', name: 'Quizeen', sub: 'Quiz App', x: -2800, left: '12%' },
  { id: 'loc_workup', name: 'WorkUp', sub: 'Card Generator', x: -1600, left: '24%' },
  { id: 'loc_garage', name: 'Services Garage', sub: 'Services', x: -520, left: '42%' },
  { id: 'loc_origin', name: 'Home Base', sub: '0m', x: 0, left: '50%' },
  { id: 'loc_mailbox', name: 'Contact Mailbox', sub: 'Contact', x: 220, left: '54%' },
  { id: 'loc_time', name: 'WorldTimeSage', sub: 'Timezone App', x: 800, left: '68%' },
  { id: 'loc_sms', name: 'School Portal', sub: 'Admin Portal', x: 1800, left: '78%' },
  { id: 'loc_astermail', name: 'AsterMail', sub: 'Email App', x: 3200, left: '90%' },
];

export const FastTravelPanel: React.FC = () => {
  const { playerX, handleNavigateToLocation } = useWorldContext();
  const { setIsPauseModalOpen } = useModalContext();

  const handleTravel = (x: number) => {
    handleNavigateToLocation(x);
    setIsPauseModalOpen(false);
  };

  return (
    <section
      style={{
        clipPath:
          'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
      }}
      className="border-4 border-[#3E4650] bg-[#11151C] p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-2 mb-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase text-[#D9A441] tracking-wider flex items-center gap-1.5">
          <MapPinIcon size={16} weight="fill" />
          Fast Travel Locations
        </span>
        <span className="text-[10px] text-[#9BA3AE] font-mono">Click location to teleport</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MAP_LOCATIONS.map((location) => {
          const isCurrent = Math.abs(playerX - location.x) < 300;
          return (
            <button
              key={location.id}
              type="button"
              onClick={() => handleTravel(location.x)}
              style={{
                clipPath:
                  'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
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
              <span
                className={clsx(
                  'text-[9px] font-mono truncate',
                  isCurrent ? 'text-[#1A1D21]/80' : 'text-[#9BA3AE]'
                )}
              >
                {location.sub}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

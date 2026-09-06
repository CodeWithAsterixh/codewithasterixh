import React from 'react';
import clsx from 'clsx';
import { CaretRightIcon } from '@phosphor-icons/react';
import { ControlPanel, ControlPanelProps, ControlRow, ControlRowProps } from './MapControlPanels';

export { ControlPanel, ControlRow };
export type { ControlPanelProps, ControlRowProps };

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';

export interface SwitchButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({
  active,
  onClick,
  children,
  small = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ clipPath: PIXEL_CLIP_SM }}
      className={clsx(
        'cursor-pointer border-2 border-black font-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px',
        small ? 'px-2 py-1 text-[8px]' : 'px-2.5 py-1.5 text-[9px]',
        active ? ['bg-[#D9A441]', 'text-[#1A1D21]'] : ['bg-[#2C3440]', 'text-[#AAB1BA]', 'hover:bg-[#3A4350]', 'hover:text-white']
      )}
    >
      {children}
    </button>
  );
};

export interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ clipPath: PIXEL_CLIP_SM }}
      className={clsx(
        'group w-full flex items-center gap-2 border-2 border-black bg-[#2C3440] shadow-[2px_2px_0px_rgba(0,0,0,1)] px-3 py-2 text-left text-[9px] font-black uppercase text-[#D1D5DA] hover:bg-[#3A4350] hover:text-white active:translate-x-px active:translate-y-px cursor-pointer'
      )}
    >
      <span className="text-[#D9A441] transition-transform group-hover:translate-x-0.5">{icon}</span>
      <span className="flex-1">{label}</span>
      <CaretRightIcon size={12} weight="bold" className="text-[#69727D]" />
    </button>
  );
};

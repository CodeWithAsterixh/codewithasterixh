'use client';

import React from 'react';
import { XIcon, BuildingsIcon, TreeIcon } from '@phosphor-icons/react';
import { StationViewRenderer } from './station/StationViewRenderer';
import { useModalContext } from '../../context/ModalStateContext';

export const PortfolioStationModal: React.FC = () => {
  const { activeStationModal, setActiveStationModal } = useModalContext();

  if (!activeStationModal) return null;

  const handleClose = () => setActiveStationModal(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 font-pixelify select-none">
      <div
        style={{
          clipPath:
            'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        }}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#141414] border-4 border-[#384252] shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden text-[#EADBCC]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-black bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <span
              style={{
                clipPath:
                  'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
              }}
              className={`w-9 h-9 flex items-center justify-center font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                activeStationModal.category === 'city' ? 'bg-[#5B9BF3] text-black' : 'bg-[#00e599] text-black'
              }`}
            >
              {activeStationModal.category === 'city' ? (
                <BuildingsIcon size={20} weight="duotone" />
              ) : (
                <TreeIcon size={20} weight="duotone" />
              )}
            </span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">
                {activeStationModal.tag}
              </div>
              <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                {activeStationModal.featureTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 bg-[#2C3440] hover:bg-[#3E4856] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-white flex items-center justify-center cursor-pointer"
          >
            <XIcon size={16} weight="bold" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 text-sm">
          <div className="p-4 bg-[#0F0F0F] border-2 border-[#384252] shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs text-[#EADBCC]/80">
            {activeStationModal.description}
          </div>
          <StationViewRenderer location={activeStationModal} />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t-2 border-black bg-[#1A1A1A] text-xs">
          <div className="text-[10px] text-[#94a3b8]">
            Press <kbd className="px-1.5 py-0.5 bg-[#0F0F0F] border border-black text-white font-mono">ESC</kbd> to exit
          </div>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            Resume Journey
          </button>
        </div>
      </div>
    </div>
  );
};

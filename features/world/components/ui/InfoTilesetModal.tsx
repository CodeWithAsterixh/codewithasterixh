'use client';

import React from 'react';
import { XIcon } from '@phosphor-icons/react';
import { ProjectDetailTileset } from './tileset/ProjectDetailTileset';
import { ContactFormTileset } from './tileset/ContactFormTileset';
import { useModalContext } from '../../context/ModalStateContext';

export const InfoTilesetModal: React.FC = () => {
  const { infoTilesetState, setInfoTilesetState } = useModalContext();

  if (!infoTilesetState.isOpen) return null;

  const handleClose = () => setInfoTilesetState((prev) => ({ ...prev, isOpen: false }));

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none font-pixelify">
      <div
        style={{
          clipPath:
            'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        }}
        className="relative w-full max-w-2xl bg-[#EFE3C3] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[88vh] text-[#241F1A] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#E8DAAF]/90 border-b-2 border-[#D6C296]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#243C6E] rotate-45 inline-block" />
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1F1914] font-mono">
              {infoTilesetState.mode === 'project' ? 'Project Details' : 'Contact Me'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FAF5E6] hover:bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#1F1914] font-black flex items-center justify-center cursor-pointer"
            title="Close [ESC]"
          >
            <XIcon size={14} weight="bold" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-[#EFE3C3] via-[#E8DCB7] to-[#DFD0A8]">
          {infoTilesetState.mode === 'project' ? (
            <ProjectDetailTileset projectSlug={infoTilesetState.projectSlug} />
          ) : (
            <ContactFormTileset onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
};

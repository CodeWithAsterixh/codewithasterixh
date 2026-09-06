'use client';

import React from 'react';
import Link from 'next/link';
import {
  DownloadIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsOutIcon,
  ArrowLeftIcon,
  CornersOutIcon,
  CornersInIcon,
} from '@phosphor-icons/react/ssr';
import { Text } from '@/components/ui/atoms/Text/Text';
import { Button } from '@/components/ui/atoms/Button/Button';

interface ResumeHeaderProps {
  zoom: number;
  isFullscreen: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleFullscreen: () => void;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  zoom,
  isFullscreen,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen,
}) => {
  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 bg-[#161616] p-6 rounded-3xl border border-white/5 sticky top-18 z-50">
      <div className="flex items-center gap-4">
        <Link href="/">
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-gray-400 hover:text-white">
            <ArrowLeftIcon size={24} weight="duotone" />
          </button>
        </Link>
        <div>
          <Text variant="h4" weight="semibold">Peter Paul Resume</Text>
          <Text variant="caption" color="gray">Fullstack / Frontend Engineer</Text>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-2xl border border-white/5">
          <button onClick={onZoomOut} className="p-2 hover:bg-white/5 rounded-md transition-colors text-gray-400 hover:text-white" title="Zoom Out">
            <MagnifyingGlassMinusIcon size={20} weight="duotone" />
          </button>
          <span className="px-3 text-xs font-medium text-gray-400 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={onZoomIn} className="p-2 hover:bg-white/5 rounded-md transition-colors text-gray-400 hover:text-white" title="Zoom In">
            <MagnifyingGlassPlusIcon size={20} weight="duotone" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button onClick={onResetZoom} className="p-2 hover:bg-white/5 rounded-md transition-colors text-gray-400 hover:text-white" title="Reset Zoom">
            <ArrowsOutIcon size={20} weight="duotone" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button onClick={onToggleFullscreen} className="p-2 hover:bg-white/5 rounded-md transition-colors text-gray-400 hover:text-white" title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
            {isFullscreen ? <CornersInIcon size={20} weight="duotone" /> : <CornersOutIcon size={20} weight="duotone" />}
          </button>
        </div>

        <a href="/resume/peterpaulresume.pdf" download="Peter_Paul_Resume.pdf">
          <Button className="flex items-center gap-2 rounded-2xl px-6">
            <DownloadIcon size={20} weight="duotone" />
            Download PDF
          </Button>
        </a>
      </div>
    </div>
  );
};

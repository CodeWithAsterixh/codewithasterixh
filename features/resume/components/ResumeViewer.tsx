'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ResumeHeader } from './ResumeHeader';

const RESUME_IMAGES = [
  '/resume/resume_page_images/1.png',
  '/resume/resume_page_images/2.png',
];

export const ResumeViewer: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <main className="min-h-screen isolate bg-[#0f0f0f] text-white p-4 md:p-8 flex flex-col gap-6">
      <ResumeHeader
        zoom={zoom}
        isFullscreen={isFullscreen}
        onZoomIn={() => setZoom((prev) => Math.min(prev + 0.25, 3))}
        onZoomOut={() => setZoom((prev) => Math.max(prev - 0.25, 0.5))}
        onResetZoom={() => setZoom(1)}
        onToggleFullscreen={toggleFullscreen}
      />

      <div
        ref={viewerRef}
        className={`flex-1 overflow-hidden relative rounded-3xl bg-[#111] border border-white/5 flex items-start justify-center p-8 cursor-grab active:cursor-grabbing ${
          isFullscreen ? 'bg-black rounded-none border-none' : ''
        }`}
      >
        <div ref={containerRef} className="w-full h-full flex items-start justify-center overflow-auto custom-scrollbar">
          <motion.div drag dragConstraints={containerRef} style={{ scale: zoom }} className="relative shadow-2xl origin-top">
            <div className="flex flex-col gap-4 py-8">
              {RESUME_IMAGES.map((src, idx) => (
                <Image
                  key={idx}
                  width={720}
                  height={1080}
                  quality={90}
                  src={src}
                  alt={`Resume Page ${idx + 1}`}
                  className="w-full max-w-4xl h-auto rounded-lg select-none pointer-events-none"
                  draggable={false}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

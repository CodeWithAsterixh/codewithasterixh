"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  DownloadIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsOutIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react/ssr";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import Link from "next/link";
import Image from "next/image";

export const ResumeViewer: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  const resumeImages = [
    "/resume/resume_page_images/1.png",
    "/resume/resume_page_images/2.png",
  ];

  return (
    <main className="min-h-screen isolate bg-[#0f0f0f] text-white p-4 md:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 bg-[#161616] p-6 rounded-3xl border border-white/5 sticky top-18 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-gray-400 hover:text-white">
              <ArrowLeftIcon size={24} />
            </button>
          </Link>
          <div>
            <Text variant="h4" weight="semibold">
              Peter Paul Resume
            </Text>
            <Text variant="caption" color="gray">
              Frontend Developer
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-2xl border border-white/5">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              <MagnifyingGlassMinusIcon size={20} />
            </button>
            <span className="px-3 text-xs font-medium text-gray-400 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              <MagnifyingGlassPlusIcon size={20} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              <ArrowsOutIcon size={20} />
            </button>
          </div>

          <a
            href="/resume/peterpaulresume.pdf"
            download="Peter_Paul_Resume.pdf"
          >
            <Button className="flex items-center gap-2 rounded-2xl px-6">
              <DownloadIcon size={20} weight="bold" />
              Download PDF
            </Button>
          </a>
        </div>
      </div>

      {/* Viewer Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative rounded-3xl bg-[#111] border border-white/5 flex items-start justify-center p-8 cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag
          dragConstraints={containerRef}
          style={{ scale: zoom }}
          className="relative shadow-2xl origin-top"
        >
          {/* We'll use multiple images if it's a multi-page resume, or one long one */}
          <div className="flex flex-col gap-4">
            {resumeImages.map((src, idx) => (
              <Image
                key={idx}
                width={720}
                height={1080}
                quality={80}
                src={src}
                alt={`Resume Page ${idx + 1}`}
                className="w-full max-w-4xl h-auto rounded-lg select-none pointer-events-none"
                draggable={false}
              />
            ))}
            {/* If there are more pages, they go here */}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

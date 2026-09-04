'use client';

import React, { useState, useRef } from 'react';
import profileData from '@/data/profile.json';

interface WorldLoadingScreenProps {
  isReady?: boolean;
  onStart?: () => void;
}

export const WorldLoadingScreen: React.FC<WorldLoadingScreenProps> = ({
  isReady = true,
  onStart,
}) => {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(profileData.images.about.src || '/images/me.png');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio synth for ambient retro sound effects
  const playRetroSoundEffect = (type: 'start' | 'click') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'start') {
        [261.63, 329.63, 392.0, 523.25].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.06 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
        });
      }
    } catch (e) {}
  };

  const toggleSound = () => {
    const nextSoundState = !isSoundOn;
    setIsSoundOn(nextSoundState);
    if (nextSoundState) {
      playRetroSoundEffect('click');
    }
  };

  const handlePlayClick = () => {
    if (isSoundOn) {
      playRetroSoundEffect('start');
    }
    if (onStart) {
      onStart();
    }
  };

  const handleImgError = () => {
    setImgSrc((prev: string) => (prev.includes('me.png') ? '/images/my-photo.png' : '/images/profile/about.png'));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 bg-[#F4EADA] text-[#3E2B1D] font-pixelify select-none overflow-y-auto">
      {/* Subtle Grid / Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#3E2B1D 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between pt-2">
        {/* Location Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#EADBCC] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] text-xs sm:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
          <svg className="w-4 h-4 fill-current text-[#C84B31]" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
            <path d="M6 1h4v1h2v2h1v4h-1v2h-2v2h-1v2H7v-2H6v-2H4V8H3V4h1V2h2V1zm1 3v3h2V4H7z" />
          </svg>
          <span>{profileData.location}</span>
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-4 py-2 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer"
        >
          {isSoundOn ? (
            <svg className="w-4.5 h-4.5 text-[#3E2B1D] fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
              <path d="M2 5h2v6H2zM5 3h2v10H5zM8 1h2v14H8zM12 4h1v8h-1zM14 6h1v4h-1z" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5 text-[#3E2B1D] fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
              <path d="M2 5h2v6H2zM5 3h2v10H5zM8 1h2v14H8zM11 5l4 6M15 5l-4 6" />
            </svg>
          )}
          <span className="text-xs sm:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
            {isSoundOn ? 'SOUND ON' : 'MUTED'}
          </span>
        </button>
      </div>

      {/* Main Side-by-Side Grid Container */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center justify-center my-auto max-w-6xl w-full py-6">
        
        {/* Left Column: Large Retro Profile Frame (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
            {/* Retro Pixel Picture Frame */}
            <div className="relative w-full aspect-square border-4 border-[#3E2B1D] shadow-[8px_8px_0px_#3E2B1D] bg-[#EADBCC] overflow-hidden flex items-center justify-center">
              <img
                src={imgSrc}
                alt={profileData.name}
                onError={handleImgError}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Handle Badge Overlay */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-[#D4A373] text-[#F4EADA] text-xs sm:text-sm font-black tracking-widest uppercase border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] whitespace-nowrap">
              {profileData.handle}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Info & Actions (7 cols) */}
        <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left gap-5 w-full">
          
          {/* Header Title & Role */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-[#3E2B1D] uppercase drop-shadow-[3px_3px_0px_#D4A373]">
              {profileData.name.toUpperCase()}
            </h1>
            <p className="text-sm sm:text-base font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
              {profileData.role}
            </p>
          </div>

          {/* Bio Subtext */}
          <p className="text-sm sm:text-base text-[#4A3728] font-mono leading-relaxed max-w-xl font-medium">
            {profileData.subtext}
          </p>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 my-1">
            {profileData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-2 bg-[#EADBCC] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D]"
              >
                <span className="text-sm sm:text-base font-black text-[#C84B31] font-mono">{stat.value}</span>
                <span className="text-xs font-extrabold text-[#3E2B1D] uppercase font-mono leading-tight">
                  {stat.label.replace('\n', ' ')}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 w-full">
            {/* ENTER MY WORLD BUTTON */}
            {isReady ? (
              <button
                onClick={handlePlayClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] text-[#F4EADA] font-black text-xl sm:text-2xl tracking-widest uppercase border-4 border-[#3E2B1D] shadow-[6px_6px_0px_#3E2B1D] hover:shadow-[2px_2px_0px_#3E2B1D] transition-all transform hover:-translate-y-0.5 active:translate-y-1 cursor-pointer"
              >
                <svg className="w-6 h-6 text-[#F4EADA] fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
                  <path d="M4 2v12l10-6z" />
                </svg>
                ENTER MY WORLD
              </button>
            ) : (
              <button
                disabled
                className="px-8 py-4 bg-[#C8B8A6] text-[#7C6A5A] font-black text-lg sm:text-xl tracking-wider uppercase border-4 border-[#3E2B1D] cursor-not-allowed opacity-80"
              >
                LOADING WORLD...
              </button>
            )}

            {/* SEE RESUME BUTTON */}
            <a
              href="/resume/peterpaulresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => isSoundOn && playRetroSoundEffect('click')}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#EADBCC] hover:bg-[#D8C2AA] text-[#3E2B1D] font-extrabold text-sm sm:text-base tracking-wider uppercase border-4 border-[#3E2B1D] shadow-[6px_6px_0px_#3E2B1D] hover:shadow-[2px_2px_0px_#3E2B1D] transition-all transform hover:-translate-y-0.5 active:translate-y-1 cursor-pointer font-mono"
            >
              <svg className="w-5 h-5 fill-current text-[#3E2B1D]" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
              SEE RESUME
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
            {profileData.socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => isSoundOn && playRetroSoundEffect('click')}
                title={social.icon.toUpperCase()}
                className="p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D]"
              >
                {social.icon === 'github' && (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )}
                {social.icon === 'linkedin' && (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                )}
                {social.icon === 'twitter' && (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
              </a>
            ))}

            {/* Email Icon Link */}
            <a
              href={`mailto:${profileData.email}`}
              onClick={() => isSoundOn && playRetroSoundEffect('click')}
              title="EMAIL"
              className="p-2.5 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 text-[#3E2B1D]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>

        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#8C6D53] border-t-2 border-[#3E2B1D]/20 pt-3">
        <span>CLICK ENTER MY WORLD TO START</span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 fill-current text-[#8C6D53]" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
            <path d="M1 3h14v10H1V3zm2 2v1h2v1h2v1h2V7h2V6h2V5H3zm0 6h10V7h-2v1h-2v1H7V8H5V7H3v4z" />
          </svg>
          {profileData.email}
        </span>
      </div>
    </div>
  );
};

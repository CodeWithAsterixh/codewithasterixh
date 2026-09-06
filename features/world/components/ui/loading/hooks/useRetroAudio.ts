'use client';

import { useState, useRef, useCallback } from 'react';

export function useRetroAudio() {
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playRetroSoundEffect = useCallback((type: 'start' | 'click') => {
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
    } catch { }
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundOn((prev) => {
      const next = !prev;
      if (next) {
        playRetroSoundEffect('click');
      }
      return next;
    });
  }, [playRetroSoundEffect]);

  const playIfSoundOn = useCallback(
    (type: 'start' | 'click') => {
      if (isSoundOn) {
        playRetroSoundEffect(type);
      }
    },
    [isSoundOn, playRetroSoundEffect]
  );

  return {
    isSoundOn,
    toggleSound,
    playRetroSoundEffect,
    playIfSoundOn,
  };
}

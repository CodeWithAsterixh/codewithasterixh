import { useEffect, useRef, useState } from 'react';
import { TOTAL_FRAMES, FRAME_DURATION, drawSpriteFrame } from './bookSpriteRenderer';

export function useBookAnimation(isOpen: boolean, initialMode: 'about' | 'works', onClose: () => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animState, setAnimState] = useState<'opening' | 'opened' | 'closing'>('opening');
  const [currentTab, setCurrentTab] = useState<'about' | 'works'>(initialMode);
  const openBookImgRef = useRef<HTMLImageElement | null>(null);
  const closeBookImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAnimState('opening');
      setCurrentTab(initialMode);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const openImg = new Image();
      openImg.src = '/books/Open_book.png';
      openBookImgRef.current = openImg;

      const closeImg = new Image();
      closeImg.src = '/books/Close_book.png';
      closeBookImgRef.current = closeImg;
    }
  }, []);

  const handleTriggerClose = () => {
    if (animState === 'closing') return;
    setAnimState('closing');
  };

  useEffect(() => {
    if (!isOpen) return;

    if (animState === 'opening') {
      let frame = 0;
      let animTimer: any;
      const render = () => {
        const drawn = drawSpriteFrame(canvasRef.current, openBookImgRef.current, frame);
        if (!drawn && (!openBookImgRef.current || !openBookImgRef.current.complete)) {
          animTimer = setTimeout(render, 16);
          return;
        }
        frame++;
        if (frame < TOTAL_FRAMES) {
          animTimer = setTimeout(render, FRAME_DURATION);
        } else {
          animTimer = setTimeout(() => setAnimState('opened'), 50);
        }
      };

      if (openBookImgRef.current?.complete) render();
      else if (openBookImgRef.current) openBookImgRef.current.onload = render;
      else setAnimState('opened');

      return () => { if (animTimer) clearTimeout(animTimer); };
    }

    if (animState === 'closing') {
      let frame = 0;
      let animTimer: any;
      const safetyTimer = setTimeout(() => onClose(), 500);

      const render = () => {
        const drawn = drawSpriteFrame(canvasRef.current, closeBookImgRef.current, frame);
        if (!drawn && (!closeBookImgRef.current || !closeBookImgRef.current.complete)) {
          animTimer = setTimeout(render, 16);
          return;
        }
        frame++;
        if (frame < TOTAL_FRAMES) {
          animTimer = setTimeout(render, FRAME_DURATION);
        } else {
          animTimer = setTimeout(() => onClose(), 50);
        }
      };

      if (closeBookImgRef.current?.complete) render();
      else if (closeBookImgRef.current) closeBookImgRef.current.onload = render;
      else onClose();

      return () => {
        if (animTimer) clearTimeout(animTimer);
        clearTimeout(safetyTimer);
      };
    }
  }, [isOpen, animState, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleTriggerClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, animState]);

  return { canvasRef, animState, currentTab, setCurrentTab, handleTriggerClose };
}

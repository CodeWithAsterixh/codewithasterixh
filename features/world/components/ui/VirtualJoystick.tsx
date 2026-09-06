'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { CaretLeftIcon, CaretRightIcon, CaretUpIcon, CaretDownIcon, DotOutlineIcon } from '@phosphor-icons/react';
import { VirtualInputAction } from '../../types';
import {
  MAX_JOYSTICK_RADIUS,
  JoystickDirectionState,
  updateJoystickDirections,
  resetJoystickDirections,
} from './joystickMath';

interface VirtualJoystickProps {
  onVirtualInput: (action: VirtualInputAction, payload?: any) => void;
  className?: string;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({ onVirtualInput, className }) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [stickPos, setStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dirState = useRef<JoystickDirectionState>({ xDir: 'none', yDir: 'none' });

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy);

    let clampedX = dx;
    let clampedY = dy;
    if (distance > MAX_JOYSTICK_RADIUS) {
      clampedX = (dx / distance) * MAX_JOYSTICK_RADIUS;
      clampedY = (dy / distance) * MAX_JOYSTICK_RADIUS;
    }

    setStickPos({ x: clampedX, y: clampedY });
    onVirtualInput('joystick_vector', { x: clampedX / MAX_JOYSTICK_RADIUS, y: clampedY / MAX_JOYSTICK_RADIUS });
    updateJoystickDirections(clampedX, clampedY, dirState.current, onVirtualInput);
  }, [onVirtualInput]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerEnd = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (e) e.preventDefault();
    setIsDragging(false);
    setStickPos({ x: 0, y: 0 });
    resetJoystickDirections(dirState.current, onVirtualInput);
  };

  useEffect(() => {
    return () => { resetJoystickDirections(dirState.current, onVirtualInput); };
  }, [onVirtualInput]);

  return (
    <div
      ref={baseRef}
      onPointerDown={handlePointerDown}
      onPointerMove={(e) => { if (isDragging) handlePointerMove(e.clientX, e.clientY); }}
      onPointerUp={handlePointerEnd}
      onPointerCancel={() => handlePointerEnd()}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#15191F]/90 border-2 border-white/20 shadow-2xl flex items-center justify-center touch-none select-none ${className || ''}`}
      style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), inset 0 2px 8px rgba(255, 255, 255, 0.12)' }}
    >
      <CaretUpIcon size={18} weight="duotone" className={`absolute top-2 transition-colors ${dirState.current.yDir === 'up' ? 'text-[#5B9BF3]' : 'text-white/30'}`} />
      <CaretDownIcon size={18} weight="duotone" className={`absolute bottom-2 transition-colors ${dirState.current.yDir === 'down' ? 'text-[#5B9BF3]' : 'text-white/30'}`} />
      <CaretLeftIcon size={18} weight="duotone" className={`absolute left-2 transition-colors ${dirState.current.xDir === 'left' ? 'text-[#5B9BF3]' : 'text-white/30'}`} />
      <CaretRightIcon size={18} weight="duotone" className={`absolute right-2 transition-colors ${dirState.current.xDir === 'right' ? 'text-[#5B9BF3]' : 'text-white/30'}`} />

      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 flex items-center justify-center">
        <DotOutlineIcon size={20} weight="duotone" className="text-white/20" />
      </div>

      <div
        className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 shadow-lg flex items-center justify-center cursor-pointer transition-transform"
        style={{
          transform: `translate(${stickPos.x}px, ${stickPos.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          backgroundImage: 'radial-gradient(circle at 35% 35%, #5B9BF3 0%, #1D4ED8 100%)',
          boxShadow: isDragging
            ? '0 0 20px rgba(91, 155, 243, 0.7), inset 0 2px 6px rgba(255, 255, 255, 0.5)'
            : '0 6px 16px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        }}
      >
        <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30" />
      </div>
    </div>
  );
};

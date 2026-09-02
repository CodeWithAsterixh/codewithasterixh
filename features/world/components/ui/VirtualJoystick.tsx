'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { CaretLeftIcon, CaretRightIcon, CaretUpIcon, CaretDownIcon, DotOutlineIcon } from '@phosphor-icons/react';
import { VirtualInputAction } from '../../types';

interface VirtualJoystickProps {
  onVirtualInput: (action: VirtualInputAction, payload?: any) => void;
  className?: string;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onVirtualInput,
  className,
}) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [stickPos, setStickPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const activeXDirRef = useRef<'left' | 'right' | 'none'>('none');
  const activeYDirRef = useRef<'up' | 'down' | 'none'>('none');

  const MAX_RADIUS = 50; // Max travel radius in px
  const DEADZONE = 4;    // Deadzone in px

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

    if (distance > MAX_RADIUS) {
      clampedX = (dx / distance) * MAX_RADIUS;
      clampedY = (dy / distance) * MAX_RADIUS;
    }

    setStickPos({ x: clampedX, y: clampedY });

    const normX = clampedX / MAX_RADIUS;
    const normY = clampedY / MAX_RADIUS;

    // Emit continuous analog vector
    onVirtualInput('joystick_vector', { x: normX, y: normY });

    // Directional events for discrete listeners
    if (clampedX < -DEADZONE) {
      if (activeXDirRef.current !== 'left') {
        if (activeXDirRef.current === 'right') onVirtualInput('right_stop');
        activeXDirRef.current = 'left';
        onVirtualInput('left_start');
      }
    } else if (clampedX > DEADZONE) {
      if (activeXDirRef.current !== 'right') {
        if (activeXDirRef.current === 'left') onVirtualInput('left_stop');
        activeXDirRef.current = 'right';
        onVirtualInput('right_start');
      }
    } else {
      if (activeXDirRef.current !== 'none') {
        if (activeXDirRef.current === 'left') onVirtualInput('left_stop');
        if (activeXDirRef.current === 'right') onVirtualInput('right_stop');
        activeXDirRef.current = 'none';
      }
    }

    if (clampedY < -DEADZONE) {
      if (activeYDirRef.current !== 'up') {
        if (activeYDirRef.current === 'down') onVirtualInput('down_stop');
        activeYDirRef.current = 'up';
        onVirtualInput('up_start');
      }
    } else if (clampedY > DEADZONE) {
      if (activeYDirRef.current !== 'down') {
        if (activeYDirRef.current === 'up') onVirtualInput('up_stop');
        activeYDirRef.current = 'down';
        onVirtualInput('down_start');
      }
    } else {
      if (activeYDirRef.current !== 'none') {
        if (activeYDirRef.current === 'up') onVirtualInput('up_stop');
        if (activeYDirRef.current === 'down') onVirtualInput('down_stop');
        activeYDirRef.current = 'none';
      }
    }
  }, [onVirtualInput]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setStickPos({ x: 0, y: 0 });

    onVirtualInput('joystick_vector', { x: 0, y: 0 });
    if (activeXDirRef.current === 'left') onVirtualInput('left_stop');
    if (activeXDirRef.current === 'right') onVirtualInput('right_stop');
    if (activeYDirRef.current === 'up') onVirtualInput('up_stop');
    if (activeYDirRef.current === 'down') onVirtualInput('down_stop');
    activeXDirRef.current = 'none';
    activeYDirRef.current = 'none';
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setStickPos({ x: 0, y: 0 });

    onVirtualInput('joystick_vector', { x: 0, y: 0 });
    if (activeXDirRef.current === 'left') onVirtualInput('left_stop');
    if (activeXDirRef.current === 'right') onVirtualInput('right_stop');
    if (activeYDirRef.current === 'up') onVirtualInput('up_stop');
    if (activeYDirRef.current === 'down') onVirtualInput('down_stop');
    activeXDirRef.current = 'none';
    activeYDirRef.current = 'none';
  };

  useEffect(() => {
    return () => {
      onVirtualInput('joystick_vector', { x: 0, y: 0 });
      if (activeXDirRef.current === 'left') onVirtualInput('left_stop');
      if (activeXDirRef.current === 'right') onVirtualInput('right_stop');
      if (activeYDirRef.current === 'up') onVirtualInput('up_stop');
      if (activeYDirRef.current === 'down') onVirtualInput('down_stop');
    };
  }, [onVirtualInput]);

  return (
    <div
      ref={baseRef}
      onPointerDown={handlePointerDown}
      onPointerMove={(e) => {
        if (isDragging) handlePointerMove(e.clientX, e.clientY);
      }}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#15191F]/90 border-2 border-white/20 shadow-2xl flex items-center justify-center touch-none select-none ${className || ''}`}
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), inset 0 2px 8px rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* 4-Way Directional Indicator Hints */}
      <CaretUpIcon
        size={18}
        weight="duotone"
        className={`absolute top-2 transition-colors ${activeYDirRef.current === 'up' ? 'text-[#5B9BF3]' : 'text-white/30'}`}
      />
      <CaretDownIcon
        size={18}
        weight="duotone"
        className={`absolute bottom-2 transition-colors ${activeYDirRef.current === 'down' ? 'text-[#5B9BF3]' : 'text-white/30'}`}
      />
      <CaretLeftIcon
        size={18}
        weight="duotone"
        className={`absolute left-2 transition-colors ${activeXDirRef.current === 'left' ? 'text-[#5B9BF3]' : 'text-white/30'}`}
      />
      <CaretRightIcon
        size={18}
        weight="duotone"
        className={`absolute right-2 transition-colors ${activeXDirRef.current === 'right' ? 'text-[#5B9BF3]' : 'text-white/30'}`}
      />

      {/* Inner Track Ring */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 flex items-center justify-center">
        <DotOutlineIcon size={20} weight="duotone" className="text-white/20" />
      </div>

      {/* Thumb Knob */}
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

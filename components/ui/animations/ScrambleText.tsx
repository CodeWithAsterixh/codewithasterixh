'use client';

import React from 'react';
import { useScrambleAnimation } from './useScrambleAnimation';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  scrambleSpeed?: number;
  revealDelay?: number;
  staggerFrom?: 'center' | 'start' | 'end';
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  duration = 2000,
  scrambleSpeed = 50,
  staggerFrom = 'center',
}) => {
  const { displayText, isRevealed } = useScrambleAnimation(text, duration, scrambleSpeed, staggerFrom);

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {displayText.map((char, index) => (
        <span
          key={index}
          className={`inline-block whitespace-pre transition-colors duration-300 ${
            isRevealed[index] ? 'text-white' : 'text-white/50'
          }`}
        >
          {char || '\u00A0'}
        </span>
      ))}
    </div>
  );
};

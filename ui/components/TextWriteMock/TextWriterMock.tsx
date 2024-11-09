'use client'

import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  className?: string;
  spanClassName?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, className, spanClassName }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Speed settings for typing and deleting
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 1500;

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;

    if (isDeleting) {
      typingTimeout = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }, deletingSpeed);
    } else {
      typingTimeout = setTimeout(() => {
        setCurrentText(prev => texts[currentIndex].slice(0, prev.length + 1));
        if (currentText === texts[currentIndex]) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <h4 className={clsx("text-lg min-[498px]:text-xl sm:text-2xl font-bold text-gray-800", className)}>
      {currentText}
      <span className={clsx("border-r-2 border-gray-800 animate-blink ml-1", spanClassName)} />
    </h4>
  );
};

export default Typewriter;
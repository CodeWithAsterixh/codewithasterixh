"use client";

import React, { useEffect, useState, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  scrambleSpeed?: number;
  revealDelay?: number;
  staggerFrom?: "center" | "start" | "end";
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  duration = 2000,
  scrambleSpeed = 50,
  staggerFrom = "center",
}) => {
  const [displayText, setDisplayText] = useState<string[]>(
    Array(text.length).fill("")
  );
  const [isRevealed, setIsRevealed] = useState<boolean[]>(
    Array(text.length).fill(false)
  );
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);

  // Effect to reset state when props change
  useEffect(() => {
    // Reset state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayText(Array(text.length).fill(""));
    setIsRevealed(Array(text.length).fill(false));

    // Clear any existing intervals
    intervalRefs.current.forEach((ref) => {
      if (ref) clearInterval(ref);
    });
    intervalRefs.current = Array(text.length).fill(null);

    // Calculate delay for each character based on staggerFrom
    const delays = Array(text.length).fill(0);
    const centerIndex = Math.floor(text.length / 2);
    const maxDistance = Math.max(centerIndex, text.length - 1 - centerIndex);

    for (let i = 0; i < text.length; i++) {
      let distance = 0;
      if (staggerFrom === "center") {
        distance = Math.abs(i - centerIndex);
      } else if (staggerFrom === "end") {
        distance = text.length - 1 - i;
      } else {
        distance = i;
      }
      // Normalize distance to 0-1 range and scale by duration
      delays[i] = (distance / maxDistance) * (duration * 0.5);
    }

    // Start scrambling for each character
    text.split("").forEach((char, index) => {
      if (char === " ") {
        // Skip spaces, just reveal them immediately
        setDisplayText((prev) => {
          const next = [...prev];
          next[index] = " ";
          return next;
        });
        setIsRevealed((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        return;
      }

      // Start scrambling immediately for all chars
      // But they will only resolve to the correct char after their specific delay
      const startTime = Date.now();
      
      const updateChar = () => {
        const elapsed = Date.now() - startTime;
        
        // If we haven't reached the reveal time yet, keep scrambling
        if (elapsed < delays[index]) {
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = CHARS[Math.floor(Math.random() * CHARS.length)];
            return next;
          });
        } else {
          // Reveal correct char
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
          });
          setIsRevealed((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
          if (intervalRefs.current[index]) {
            clearInterval(intervalRefs.current[index]!);
            intervalRefs.current[index] = null;
          }
        }
      };

      intervalRefs.current[index] = setInterval(updateChar, scrambleSpeed);
    });

    return () => {
      intervalRefs.current.forEach((ref) => {
        if (ref) clearInterval(ref);
      });
    };
  }, [text, duration, scrambleSpeed, staggerFrom]);

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {displayText.map((char, index) => (
        <span
          key={index}
          className={`inline-block whitespace-pre transition-colors duration-300 ${
            isRevealed[index] ? "text-white" : "text-white/50"
          }`}
        >
          {char || "\u00A0"}
        </span>
      ))}
    </div>
  );
};

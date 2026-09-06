import { useEffect, useState, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function useScrambleAnimation(
  text: string,
  duration: number = 2000,
  scrambleSpeed: number = 50,
  staggerFrom: 'center' | 'start' | 'end' = 'center'
) {
  const [displayText, setDisplayText] = useState<string[]>(Array(text.length).fill(''));
  const [isRevealed, setIsRevealed] = useState<boolean[]>(Array(text.length).fill(false));
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(Array(text.length).fill(''));
      setIsRevealed(Array(text.length).fill(false));
    }, 0);

    intervalRefs.current.forEach((ref) => { if (ref) clearInterval(ref); });
    intervalRefs.current = Array(text.length).fill(null);

    const delays = Array(text.length).fill(0);
    const centerIndex = Math.floor(text.length / 2);
    const maxDistance = Math.max(centerIndex, text.length - 1 - centerIndex);

    for (let i = 0; i < text.length; i++) {
      let distance = 0;
      if (staggerFrom === 'center') distance = Math.abs(i - centerIndex);
      else if (staggerFrom === 'end') distance = text.length - 1 - i;
      else distance = i;
      delays[i] = (distance / maxDistance) * (duration * 0.5);
    }

    text.split('').forEach((char, index) => {
      if (char === ' ') {
        setDisplayText((prev) => { const next = [...prev]; next[index] = ' '; return next; });
        setIsRevealed((prev) => { const next = [...prev]; next[index] = true; return next; });
        return;
      }

      const startTime = Date.now();
      const updateChar = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < delays[index]) {
          setDisplayText((prev) => {
            const next = [...prev];
            next[index] = CHARS[Math.floor(Math.random() * CHARS.length)];
            return next;
          });
        } else {
          setDisplayText((prev) => { const next = [...prev]; next[index] = char; return next; });
          setIsRevealed((prev) => { const next = [...prev]; next[index] = true; return next; });
          if (intervalRefs.current[index]) {
            clearInterval(intervalRefs.current[index]!);
            intervalRefs.current[index] = null;
          }
        }
      };

      intervalRefs.current[index] = setInterval(updateChar, scrambleSpeed);
    });

    return () => {
      clearTimeout(timer);
      intervalRefs.current.forEach((ref) => { if (ref) clearInterval(ref); });
    };
  }, [text, duration, scrambleSpeed, staggerFrom]);

  return { displayText, isRevealed };
}

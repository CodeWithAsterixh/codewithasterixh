import { useEffect } from 'react';

export function useHashScroll() {
  useEffect(() => {
    const hash = globalThis.window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
}
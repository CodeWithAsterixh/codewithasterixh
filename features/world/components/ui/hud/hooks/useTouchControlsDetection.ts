import { useEffect, useState } from 'react';
import { VirtualInputAction } from '../../../../types';

async function hasKeyboardLayout(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && 'keyboard' in navigator) {
    try {
      const layoutMap = await (navigator as any).keyboard.getLayoutMap();
      return layoutMap.size > 0;
    } catch {
      return false;
    }
  }
  return false;
}

export function useTouchControlsDetection(onVirtualInput: (action: VirtualInputAction) => void) {
  const [showTouchControls, setShowTouchControls] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function checkControlsVisibility() {
      const hasKeyboard = await hasKeyboardLayout();
      const isTouchOrSmall =
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 768 ||
          'ontouchstart' in window);

      if (isMounted) {
        setShowTouchControls(!hasKeyboard || isTouchOrSmall);
      }
    }

    checkControlsVisibility();

    const handleResize = () => {
      checkControlsVisibility();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleWindowBlur = () => {
      onVirtualInput('stop');
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [onVirtualInput]);

  return { showTouchControls };
}

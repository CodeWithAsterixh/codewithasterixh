import { useEffect, RefObject } from 'react';

export function useWorldCanvasStyles(containerRef: RefObject<HTMLDivElement | null>, isReady: boolean) {
  useEffect(() => {
    const enforceCanvasStyles = () => {
      if (containerRef.current) {
        const canvasElt = containerRef.current.querySelector('canvas');
        if (canvasElt) {
          canvasElt.style.cssText =
            'width: 100% !important; height: 100% !important; position: absolute !important; top: 0px !important; left: 0px !important; display: block !important; z-index: 0 !important;';
        }
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    };

    enforceCanvasStyles();
    const t1 = setTimeout(enforceCanvasStyles, 30);
    const t2 = setTimeout(enforceCanvasStyles, 100);
    const t3 = setTimeout(enforceCanvasStyles, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [containerRef, isReady]);
}

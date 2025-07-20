import { useEffect, useCallback, useRef } from "react";

/**
 * Hook to customize scroll speed on window or elements matching a selector.
 *
 * @param selector Optional CSS selector for scrollable elements; defaults to window if no matches.
 * @returns A function run(factor?: number) to enable the custom scroll speed.
 */
export function useCustomScrollSpeed(selector?: string): (factor?: number) => void {
  const elementsRef = useRef<(HTMLElement | Window)[]>([]);
  const handlerRef = useRef<(e: WheelEvent) => void>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (handlerRef.current && elementsRef.current.length) {
        elementsRef.current.forEach(el => el.removeEventListener("wheel", handlerRef.current! as EventListener));
      }
    };
  }, []);

  const run = useCallback((factor: number = 0.5) => {
    // Remove any previous listener
    if (handlerRef.current && elementsRef.current.length) {
      elementsRef.current.forEach(el => el.removeEventListener("wheel", handlerRef.current! as EventListener));
    }
    // Determine targets
    let els: (HTMLElement | Window)[] = [];
    if (selector) {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
      if (nodes.length) els = nodes;
    }
    if (!els.length) els = [window];

    elementsRef.current = els;

    // Define new handler with current factor
    const handler = (e: Event) => {
      e.preventDefault();
      if ('deltaY' in e) {
        const wheelEvent = e as WheelEvent;
        const delta = wheelEvent.deltaY * factor;
        const target = wheelEvent.currentTarget;
        if (target instanceof HTMLElement) {
          target.scrollBy({ top: delta, behavior: "auto" });
        } else {
          window.scrollBy({ top: delta, behavior: "auto" });
        }
      }
    };

    handlerRef.current = handler;

    // Attach new listener
    els.forEach(el => el.addEventListener("wheel", handler, { passive: false }));
  }, [selector]);

  return run;
}

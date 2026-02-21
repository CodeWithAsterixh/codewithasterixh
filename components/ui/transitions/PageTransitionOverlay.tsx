"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ScrambleText } from "../animations/ScrambleText";

type TransitionState =
  | "initial-loading"
  | "idle"
  | "covering"
  | "covered"
  | "revealing"
  | "resetting";

export const PageTransitionOverlay: React.FC = () => {
  const pathname = usePathname();
  // Start with 'initial-loading' to cover screen immediately on load
  const [state, setState] = useState<TransitionState>("initial-loading");
  const [progress, setProgress] = useState(0);
  const isFirstRender = useRef(true);

  // Initial Load Effect
  useEffect(() => {
    const handleInitialLoad = async () => {
      // Start initial loading sequence
      // 1. Text Animation happens via ScrambleText (approx 2s)
      
      // Simulate progress bar for initial load
      setProgress(10);
      await new Promise((r) => setTimeout(r, 500));
      setProgress(40);
      await new Promise((r) => setTimeout(r, 1000)); // Wait for scramble
      setProgress(80);
      await new Promise((r) => setTimeout(r, 1000)); // Wait for completion
      
      // Ready to reveal
      setProgress(100);
      setState("revealing");
      
      await new Promise((r) => setTimeout(r, 600)); // Match CSS duration
      
      setState("resetting");
      setProgress(0);
      await new Promise((r) => setTimeout(r, 50));
      
      setState("idle");
      isFirstRender.current = false;
    };

    if (state === "initial-loading") {
      handleInitialLoad();
    }
  }, [state]); // Run once on mount

  // Navigation Transition Effect
  useEffect(() => {
    // Skip if it's the first render (handled by initial load)
    if (isFirstRender.current) return;

    let isMounted = true;

    const runTransition = async () => {
      // 0. Initialize Progress
      setProgress(0);
      
      // 1. Start Covering (Slide down)
      setState("covering");
      // Simulate progress during covering (0 -> 40%)
      setProgress(40);
      await new Promise((resolve) => setTimeout(resolve, 600)); // Match CSS duration
      if (!isMounted) return;

      // 2. Stay Covered briefly (Optional, prevents jank)
      setState("covered");
      // Simulate progress while covered (40 -> 80%)
      setProgress(80);
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (!isMounted) return;

      // 3. Start Revealing (Slide away)
      setState("revealing");
      // Complete progress (80 -> 100%)
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 600)); // Match CSS duration
      if (!isMounted) return;

      // 4. Reset Position (Snap back to top)
      setState("resetting");
      // Hide progress bar (reset to 0 without animation, or fade out?)
      setProgress(0); 
      // Small delay for DOM update before re-enabling transition
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (!isMounted) return;

      // 5. Back to Idle (Ready)
      setState("idle");
    };

    runTransition();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // CSS Logic
  let transformClass = "-translate-y-full"; // Default: Top
  let transitionClass = "transition-transform duration-[600ms] ease-in-out";
  let showBlocker = false;

  if (state === "initial-loading") {
    transformClass = "translate-y-0"; // Center
    showBlocker = true;
  } else if (state === "covering") {
    transformClass = "translate-y-0"; // Center
    showBlocker = true;
  } else if (state === "covered") {
    transformClass = "translate-y-0"; // Center
    showBlocker = true;
  } else if (state === "revealing") {
    transformClass = "translate-y-full"; // Bottom
    showBlocker = true;
  } else if (state === "resetting") {
    transformClass = "-translate-y-full"; // Top
    transitionClass = "transition-none duration-0"; // Instant
  }

  return (
    <>
      {/* Invisible Blocker Layer to prevent clicks during transition */}
      {showBlocker && (
        <div className="fixed inset-0 z-10000 bg-transparent cursor-wait" />
      )}
      
      {/* Progress Bar - Above Overlay */}
      <div 
        className={`fixed top-0 left-0 h-1 bg-white z-10001 transition-all duration-300 ease-out ${state === "idle" || state === "resetting" ? "opacity-0" : "opacity-100"}`}
        style={{ width: `${progress}%` }}
      />
      
      {/* Visible Transition Overlay */}
      <div
        className={`fixed inset-0 z-9999 bg-accent flex items-center justify-center pointer-events-none ${transformClass} ${transitionClass}`}
        aria-hidden="true"
      >
        {/* Scramble Text Animation - Only visible during initial load */}
        {state === "initial-loading" && (
           <div className="w-full max-w-6xl px-4 text-center">
             <ScrambleText 
               text="Asterixh | Full Stack Developer"
               className="text-4xl md:text-6xl font-bold font-sans tracking-wider text-white"
               duration={2000}
               staggerFrom="center"
             />
           </div>
        )}
      </div>
    </>
  );
};

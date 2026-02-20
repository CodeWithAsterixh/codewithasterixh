import { useEffect, useRef, useState } from "react";

/**
 * Tracks the scroll progress of an element and the scroll direction.
 *
 * @param {string | HTMLElement | null} targetElement - A CSS selector or the actual HTML element to track.
 * @returns {{
 *   scrollPercentage: number; // How far the user has scrolled (0 to 100).
 *   scrollPx: number; // How many pixels the user has scrolled.
 *   isScrollingUp: boolean;   // True if the user is scrolling up, false if scrolling down.
 * }}
 */
export default function useScrollPercent(
  targetElement: string | HTMLElement | null
): {
  scrollPercentage: number;
  scrollPx: number;
  isScrollingUp: boolean;
} {
  // State to store how much the user has scrolled (as a percentage).
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  // State to store how many pixels the user has scrolled.
  const [scrollPx, setScrollPx] = useState(0);

  // State to track if the user is scrolling up or down.
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  // Ref to remember the previous scroll position without causing re-renders.
  const prevScrollTopRef = useRef(0);

  useEffect(() => {
    // Identify the element to observe, based on a selector or provided element.
    const element =
      typeof targetElement === "string"
        ? document.querySelector(targetElement)
        : targetElement;

    if (!element) return; // Exit if the element doesn't exist.

    const handleScroll = (): void => {
      const { scrollTop, scrollHeight, clientHeight } = element;

      const totalScrollableDistance = scrollHeight - clientHeight;
      
      // Avoid division by zero
      if (totalScrollableDistance <= 0) {
        setScrollPercentage(0);
        setScrollPx(0);
        return;
      }

      // Calculate the current scroll percentage (0 to 100).
      const newScrollPercentage = Math.floor(
        (scrollTop / totalScrollableDistance) * 100
      );

      // Update the scroll percentage only if it has changed.
      setScrollPercentage((prev) => 
        prev !== newScrollPercentage ? newScrollPercentage : prev
      );
      
      // Update the scroll pixels only if it has changed.
      setScrollPx((prev) =>
        prev !== scrollTop ? scrollTop : prev
      );

      // Check if the user is scrolling up or down.
      const isUp = scrollTop < prevScrollTopRef.current;
      
      // Only update state if direction actually changes and we're not at the very top (bounce)
      if (Math.abs(scrollTop - prevScrollTopRef.current) > 0) {
        setIsScrollingUp((prevIsUp) => (prevIsUp !== isUp ? isUp : prevIsUp));
      }

      // Save the current scroll position for future comparison.
      prevScrollTopRef.current = scrollTop;
    };

    // Listen for scroll events on the element.
    element.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is removed or dependencies change.
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [targetElement]);


  // Return the scroll percentage, scroll pixels, and scroll direction.
  return {
    scrollPercentage,
    scrollPx,
    isScrollingUp,
  };
}
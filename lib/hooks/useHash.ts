import { useEffect, useState } from "react";

export function useHash() {
  const [hash, setHash] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash;
    }
    return "";
  });

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    console.log(window)
    window.addEventListener("hashchange", updateHash);
    // Also listen for popstate (browser back/forward)
    window.addEventListener("popstate", updateHash);

    // Set initial hash in case it changed before mount
    updateHash();

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  return hash;
}
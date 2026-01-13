import { useEffect, useState } from "react";

export function useHash() {
  const [hash, setHash] = useState(() => {
    if (globalThis.window !== undefined) {
      return globalThis.window.location.hash;
    }
    return "";
  });

  useEffect(() => {
    const updateHash = () => setHash(globalThis.window.location.hash);
    globalThis.window.addEventListener("hashchange", updateHash);
    // Also listen for popstate (browser back/forward)
    globalThis.window.addEventListener("popstate", updateHash);

    // Set initial hash in case it changed before mount
    updateHash();

    return () => {
      globalThis.window.removeEventListener("hashchange", updateHash);
      globalThis.window.removeEventListener("popstate", updateHash);
    };
  }, []);

  return hash;
}
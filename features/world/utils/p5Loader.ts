let p5Promise: Promise<any> | null = null;

export function getP5Constructor(): Promise<any> {
  if (p5Promise) return p5Promise;

  p5Promise = (async () => {
    try {
      const p5Mod = await import('p5');
      return p5Mod.default || p5Mod;
    } catch (e) {
      console.warn('Direct p5 import failed, checking window.p5 or CDN:', e);
    }

    if (typeof window !== 'undefined' && (window as any).p5) {
      return (window as any).p5;
    }

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return reject('No window');
      const existingScript = document.getElementById('p5-cdn-script');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve((window as any).p5));
        if ((window as any).p5) resolve((window as any).p5);
        return;
      }

      const script = document.createElement('script');
      script.id = 'p5-cdn-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js';
      script.async = true;
      script.onload = () => {
        if ((window as any).p5) resolve((window as any).p5);
        else reject('p5 failed to load');
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  })();

  return p5Promise;
}

export function getOptimizedImageUrl(src?: string | null, quality = 35, width = 480): string {
  if (!src) return '';
  if (src.startsWith('/api/image-proxy')) return src;
  if (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://')) {
    return `/api/image-proxy?url=${encodeURIComponent(src)}&q=${quality}&w=${width}`;
  }
  return src;
}

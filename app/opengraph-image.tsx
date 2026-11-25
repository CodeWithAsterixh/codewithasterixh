import { ImageResponse } from 'next/og';
import { fetchOgFonts } from './ogFontHelper';
import { renderOgElement } from './renderOgElement';
import { siteUrl } from '@/config/site';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const imageRes = await fetch(new URL('/images/my-photo.png', siteUrl));
  const imageBuffer = await imageRes.arrayBuffer();
  const fonts = await fetchOgFonts();

  return new ImageResponse(renderOgElement(imageBuffer), {
    ...size,
    fonts: fonts.length > 0 ? fonts : undefined,
  });
}

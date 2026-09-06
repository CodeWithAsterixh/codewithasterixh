import { ImageResponse } from 'next/og';
import { fetchOgFonts } from './ogFontHelper';
import { renderOgElement } from './renderOgElement';

export const size = {
  width: 500,
  height: 500,
};
export const contentType = 'image/png';

export default async function Image() {
  const imageRes = await fetch(new URL('/images/my-photo.png', 'https://asterixh.vercel.app'));
  const imageBuffer = await imageRes.arrayBuffer();
  const fonts = await fetchOgFonts();

  return new ImageResponse(renderOgElement(imageBuffer), {
    ...size,
    fonts: fonts.length > 0 ? fonts : undefined,
  });
}

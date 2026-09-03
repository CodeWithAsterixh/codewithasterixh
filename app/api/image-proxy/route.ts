import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let sharp: any = null;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const quality = Math.min(100, Math.max(10, parseInt(searchParams.get('q') || '35', 10)));
  const maxWidth = Math.min(2048, Math.max(100, parseInt(searchParams.get('w') || '480', 10)));

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    let imageBuffer: Buffer;
    let contentType = 'image/png';

    if (imageUrl.startsWith('/')) {
      const publicPath = path.join(process.cwd(), 'public', imageUrl.replace(/^\//, ''));
      if (!fs.existsSync(publicPath)) {
        return new NextResponse('Image not found', { status: 404 });
      }
      imageBuffer = fs.readFileSync(publicPath);
      if (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (imageUrl.endsWith('.webp')) contentType = 'image/webp';
    } else {
      const res = await fetch(imageUrl);
      if (!res.ok) return new NextResponse('Failed to fetch image', { status: 502 });
      const arrayBuffer = await res.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
      contentType = res.headers.get('content-type') || 'image/png';
    }

    // Process image with sharp if available for true byte & quality reduction
    if (sharp) {
      try {
        let pipeline = sharp(imageBuffer).resize({
          width: maxWidth,
          fit: 'inside',
          withoutEnlargement: true,
        });

        if (contentType === 'image/jpeg') {
          imageBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
        } else if (contentType === 'image/webp') {
          imageBuffer = await pipeline.webp({ quality }).toBuffer();
        } else {
          imageBuffer = await pipeline.png({ quality, compressionLevel: 9, palette: true }).toBuffer();
        }
      } catch (sharpErr) {
        console.warn('Sharp optimization fallback:', sharpErr);
      }
    }

    return new NextResponse(imageBuffer as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Image-Quality-Reduced': `${quality}%`,
        'X-Image-Max-Width': `${maxWidth}px`,
      },
    });
  } catch (err) {
    console.error('Image proxy error:', err);
    return new NextResponse('Internal image proxy error', { status: 500 });
  }
}


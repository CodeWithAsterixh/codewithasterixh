type weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export async function fetchOgFonts() {
  try {
    const cssRes = await fetch(
      'https://fonts.googleapis.com/css2?family=Bitcount:wght@100;200;300;400;500;600;700;800;900&display=swap'
    );
    const cssText = await cssRes.text();
    const regex = /font-weight:\s*(\d+)[^}]*url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/g;
    const fontsMeta: { weight: number; url: string }[] = [];
    let m: RegExpExecArray | null;
    while ((m = regex.exec(cssText)) !== null) {
      fontsMeta.push({ weight: Number.parseInt(m[1], 10), url: m[2] });
    }

    const buffers = await Promise.all(
      fontsMeta.map((f) => fetch(f.url).then((res) => res.arrayBuffer()))
    );

    return fontsMeta.map((f, i) => ({
      name: 'Bitcount',
      data: buffers[i],
      weight: f.weight as weight,
      style: 'normal' as const,
    }));
  } catch (e) {
    console.warn('Failed to fetch OG fonts:', e);
    return [];
  }
}

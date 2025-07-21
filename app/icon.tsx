import { ImageResponse } from "next/og";
export const size = {
  width: 500,
  height: 500,
};
export const contentType = "image/png";
type weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export default async function Icon() {
  // 1. Fetch the Google Fonts CSS
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Bitcount:wght@100;200;300;400;500;600;700;800;900&display=swap"
  );
  const cssText = await cssRes.text();

  // 2. Extract all the woff2 URLs from the CSS
  const regex =
    /font-weight:\s*(\d+)[^}]*url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/g;
  const fontsMeta: { weight: number; url: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(cssText)) !== null) {
    fontsMeta.push({ weight: parseInt(m[1], 10), url: m[2] });
  }

  // 2. Fetch each font in parallel
  const buffers = await Promise.all(
    fontsMeta.map((f) => fetch(f.url).then((res) => res.arrayBuffer()))
  );

  // 3. Build the fonts array
  
  const fonts:{
    name: string;
    data: ArrayBuffer;
    weight: weight;
    style: "normal";
}[] = fontsMeta.map((f, i) => ({
    name: "Bitcount",
    data: buffers[i],
    weight: f.weight as weight,
    style: "normal",
  }));

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#001b20",
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            backgroundColor:"#c2fd00",
            backgroundClip:"text",
            background: "radial-gradient(circle at 60% 40%, #c2fd00 0%, #cebef4 60%, #001b20 100%)",
            color: "transparent",
            width: "100%",
            height: "100%",
            display: "flex",
            fontSize: "480px",
            paddingLeft: "15%",
            paddingTop: "15%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"Bitcount", sans-serif',
            fontOpticalSizing: "auto",
            fontVariationSettings:
              '"wght" 400, "slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
          }}
        >
          P
        </span>
      </div>
    ),
    {
      fonts,
      ...size,
    }
  );
}

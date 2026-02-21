import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

type weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export default async function Image() {
  // Fetch the profile image
  const imageRes = await fetch(
    new URL("/images/my-photo.png", "https://asterixh.vercel.app")
  );
  const imageBuffer = await imageRes.arrayBuffer();

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
    fontsMeta.push({ weight: Number.parseInt(m[1], 10), url: m[2] });
  }

  // 2. Fetch each font in parallel
  const buffers = await Promise.all(
    fontsMeta.map((f) => fetch(f.url).then((res) => res.arrayBuffer()))
  );

  // 3. Build the fonts array
  const fonts: {
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
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#0F0F0F",
        }}
      >
        {/* Profile Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width="100%"
          height="100%"
          src={`data:image/png;base64,${Buffer.from(imageBuffer).toString(
            "base64"
          )}`}
          style={{
            objectFit: "contain",
            opacity: 0.3,
            position: "absolute",
            right: "-20%",
          }}
          alt="Profile"
        />
        {/* Overlay Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "80px",
            width: "100%",
            height: "100%",
          }}
        >
          <span
            style={{
              backgroundColor: "#c2fd00",
              backgroundClip: "text",
              background:
                "radial-gradient(circle at 5% 40%, #c2fd00 20%, #cebef4 60%, #001b20 100%)",
              color: "transparent",
              fontSize: "80px",
              fontFamily: '"Bitcount", sans-serif',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "20px",
            }}
          >
            ASTERIXH
          </span>
           <span
            style={{
              color: "#ffffff",
              fontSize: "40px",
              fontFamily: 'sans-serif',
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Full Stack Developer
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}

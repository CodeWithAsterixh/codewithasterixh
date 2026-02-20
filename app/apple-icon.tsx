import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

type weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export default async function Icon() {
  // Fetch the profile image
  const imageRes = await fetch(
    new URL("/images/me-cut-1.png", "https://codewithasterixh.vercel.app")
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

  // 3. Fetch each font in parallel
  const buffers = await Promise.all(
    fontsMeta.map((f) => fetch(f.url).then((res) => res.arrayBuffer()))
  );

  // 4. Build the fonts array
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
          borderRadius: "20%",
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
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.8,
            borderRadius: "20%",
          }}
          alt="Profile"
        />
        {/* Overlay PAUL */}
        <div
          style={{
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              backgroundColor: "#c2fd00",
              backgroundClip: "text",
              background:
                "radial-gradient(circle at 5% 40%, #c2fd00 20%, #cebef4 60%, #001b20 100%)",
              color: "transparent",
              fontSize: "54px", // Scaled for 180px
              fontFamily: '"Bitcount", sans-serif',
              fontWeight: 700,
            }}
          >
            PAUL
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

import { ImageResponse } from "next/og";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#001b20",
          color: "#c2fd00",
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Bitcount", sans-serif',
          fontOpticalSizing: "auto",
          fontVariationSettings:
            '"wght" 400, "slnt" 0, "CRSV" 0.5, "ELSH" 0, "ELXP" 0',
        }}
      >
        P
      </div>
    )
  );
}

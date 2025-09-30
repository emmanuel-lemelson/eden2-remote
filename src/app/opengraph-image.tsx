import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f9f5ec 0%, #efe6d5 100%)",
          color: "#1c1917",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 24,
            border: "1px solid rgba(194,160,96,0.35)",
            background: "rgba(255,255,255,0.75)",
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            Eden — The Lemelson Estate
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.85,
              letterSpacing: 1,
            }}
          >
            Bespoke Luxury in Stowe, Vermont
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}



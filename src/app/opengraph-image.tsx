import { ImageResponse } from "next/og";

export const dynamic = "force-static";

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
        }}
      >
        <img
          // Use a JPEG asset for maximum compatibility with the OG renderer
          src="https://lemelsonestate.com/newsletter%201/DJI_0005.jpg"
          alt="Eden Estate exterior view"
          // Explicit dimensions are required by the OG renderer
          width={size.width}
          height={size.height}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}



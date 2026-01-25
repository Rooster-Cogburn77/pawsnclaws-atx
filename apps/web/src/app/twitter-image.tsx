import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PawsNClaws ATX - Helping Austin's Animals";
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
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Paw prints decoration */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            fontSize: 80,
            opacity: 0.3,
            display: "flex",
          }}
        >
          🐾
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 100,
            opacity: 0.3,
            display: "flex",
          }}
        >
          🐾
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#78350f",
              marginBottom: 16,
              display: "flex",
            }}
          >
            PawsNClaws ATX
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#92400e",
              marginBottom: 32,
              display: "flex",
            }}
          >
            Helping Austin&apos;s Animals
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a16207",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Resources for strays, rescues, and pets in need
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#d97706",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

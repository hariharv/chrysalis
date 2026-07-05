import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Chrysalis: write to someone who doesn't exist yet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STARS = [
  [90, 90, 3], [220, 180, 2], [340, 70, 2.5], [520, 150, 2], [760, 80, 3],
  [950, 170, 2], [1100, 90, 2.5], [160, 420, 2], [420, 500, 2.5], [700, 460, 2],
  [980, 430, 3], [1120, 520, 2], [80, 540, 2.5], [600, 320, 2], [280, 300, 2],
  [860, 280, 2.5], [1040, 300, 1.6],
] as const;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #4AA2D2 0%, #2A7CB2 55%, #175E92 100%)",
          position: "relative",
        }}
      >
        {STARS.map(([x, y, r], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: 99,
              background: "#FFFFFF",
              opacity: i % 4 === 0 ? 0.95 : 0.6,
              boxShadow: i % 4 === 0 ? "0 0 10px 3px rgba(255,255,255,0.7)" : "none",
              display: "flex",
            }}
          />
        ))}
        {/* far planet */}
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 110,
            width: 110,
            height: 110,
            borderRadius: 99,
            background: "radial-gradient(circle at 35% 30%, #7CC0E2, #1C5C85 70%)",
            boxShadow: "inset -14px -10px 26px rgba(9,40,63,0.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 99,
            border: "3px solid #F5C044",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          <div style={{ width: 22, height: 22, borderRadius: 99, background: "#F5C044", display: "flex" }} />
        </div>
        <div
          style={{
            fontSize: 64,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 900,
            display: "flex",
            textShadow: "0 2px 24px rgba(10,45,74,0.55)",
          }}
        >
          Write to someone who doesn&#39;t exist yet.
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 28,
            color: "#EAF6FD",
            fontStyle: "italic",
            display: "flex",
            textShadow: "0 1px 12px rgba(10,45,74,0.5)",
          }}
        >
          One letter, sealed tonight, waiting for its day.
        </div>
      </div>
    ),
    { ...size },
  );
}

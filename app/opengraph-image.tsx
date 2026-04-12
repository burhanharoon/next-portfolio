import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Burhan Haroon — AI-First Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          backgroundColor: "#fafafa",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            backgroundColor: "#6366f1",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 800,
            letterSpacing: "1.5px",
            border: "3px solid #111",
            boxShadow: "4px 4px 0 #111",
            alignSelf: "flex-start",
          }}
        >
          ⚡ AI-FIRST DEVELOPER
        </div>

        {/* Name */}
        <div
          style={{
            marginTop: "28px",
            fontSize: "72px",
            fontWeight: 900,
            color: "#111",
            lineHeight: 1.0,
            letterSpacing: "-3px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Burhan{" "}
          <span style={{ backgroundColor: "#facc15", padding: "0 8px", marginLeft: "16px" }}>
            Haroon
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "20px",
            fontSize: "24px",
            color: "#555",
            fontWeight: 500,
          }}
        >
          Full-stack developer helping global teams ship faster
        </div>

        {/* Tech pills */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "32px",
            flexWrap: "wrap",
          }}
        >
          {["React", "Next.js", "Node.js", "TypeScript", "Python", "AI"].map(
            (tech, i) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  backgroundColor: i % 2 === 0 ? "#facc15" : "#6366f1",
                  color: i % 2 === 0 ? "#111" : "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  border: "2.5px solid #111",
                  boxShadow: "3px 3px 0 #111",
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "18px",
            fontWeight: 800,
            color: "#999",
          }}
        >
          burhanharoon.com
        </div>
      </div>
    ),
    { ...size }
  );
}

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const codeLines = [
  'GET /api/paths.json',
  'GET /raw/{slug}',
  'GET /llms.txt',
  'GET /.well-known/ai-plugin.json',
  'GET /agent',
];

export const SceneAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [95, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Terminal cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* Left: text */}
        <div style={{ maxWidth: 500 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Agent Protocol
          </div>
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Built for<br />AI agents
          </div>
          <div
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
            }}
          >
            Every path is readable as rendered HTML, raw markdown, and structured JSON. AI agents discover, read, and replicate workflows.
          </div>
        </div>

        {/* Right: terminal */}
        <div
          style={{
            width: 520,
            background: "#0d0d0d",
            border: "1px solid #1a1a1a",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 14,
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid #1a1a1a",
              display: "flex",
              gap: 6,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          </div>

          {/* Terminal body */}
          <div style={{ padding: "16px 20px" }}>
            {codeLines.map((line, i) => {
              const delay = 10 + i * 15;
              const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const isTyping = frame >= delay && frame < delay + 10;

              return (
                <div
                  key={i}
                  style={{
                    opacity,
                    marginBottom: 8,
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>$</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    {line}
                    {isTyping && cursorVisible && (
                      <span style={{ color: "white" }}>_</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

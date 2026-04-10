import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const features = [
  { label: "Explore", desc: "Browse real workflows" },
  { label: "Graph", desc: "Visualize tool connections" },
  { label: "Remix", desc: "Build custom paths" },
  { label: "Agent", desc: "AI-native protocol" },
];

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  // Fade out
  const fadeOut = interpolate(frame, [115, 140], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Header
  const headerY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          fontWeight: 400,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 16,
          transform: `translateY(${headerY}px)`,
        }}
      >
        Features
      </div>

      {/* Feature cards */}
      <div style={{ display: "flex", gap: 24 }}>
        {features.map((f, i) => {
          const delay = 15 + i * 12;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 150 },
          });
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={f.label}
              style={{
                width: 280,
                padding: "36px 28px",
                border: "1px solid #1a1a1a",
                background: "#0d0d0d",
                opacity: cardOpacity,
                transform: `scale(${Math.min(cardScale, 1)})`,
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {f.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

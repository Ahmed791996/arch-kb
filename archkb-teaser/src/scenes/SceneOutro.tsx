import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  // Brand
  const brandScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // URL
  const urlOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const urlY = interpolate(frame, [30, 50], [10, 0], { extrapolateRight: "clamp" });

  // CTA
  const ctaOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

  // Keyboard hint
  const kbOpacity = interpolate(frame, [65, 80], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 72,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.03em",
          transform: `scale(${Math.min(brandScale, 1)})`,
        }}
      >
        arch·kb
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 20,
          color: "rgba(255,255,255,0.5)",
          marginTop: 20,
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        arch-kb.com
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 40,
          padding: "12px 32px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "white",
          opacity: ctaOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: "#000",
          }}
        >
          Start exploring
        </span>
      </div>

      {/* Keyboard hint */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          opacity: kbOpacity,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <span>
          Press{" "}
          <span
            style={{
              padding: "2px 8px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            ?
          </span>{" "}
          for keyboard shortcuts
        </span>
        <span>|</span>
        <span>
          <span
            style={{
              padding: "2px 8px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            /
          </span>{" "}
          to search
        </span>
      </div>
    </AbsoluteFill>
  );
};

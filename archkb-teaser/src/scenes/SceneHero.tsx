import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brand name reveal
  const brandScale = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });
  const brandOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Tagline
  const tagOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [30, 50], [15, 0], { extrapolateRight: "clamp" });

  // Decorative line
  const lineWidth = interpolate(frame, [15, 50], [0, 400], { extrapolateRight: "clamp" });

  // Fade out
  const fadeOut = interpolate(frame, [95, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Brand name */}
      <div
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 96,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.03em",
          transform: `scale(${brandScale})`,
          opacity: brandOpacity,
        }}
      >
        arch·kb
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 28,
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.05em",
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
        }}
      >
        The path registry for AI workflows
      </div>
    </AbsoluteFill>
  );
};

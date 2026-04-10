import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const tools = ["Python", "React", "Blender", "Vite", "CSS", "HTML", "ComfyUI", "Next.js", "Vercel", "GitHub"];

export const SceneGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [95, 120], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Generate tool node positions in a circle
  const nodes = useMemo(() => {
    const cx = 960;
    const cy = 560;
    const radius = 280;
    return tools.map((name, i) => {
      const angle = (2 * Math.PI * i) / tools.length - Math.PI / 2;
      return {
        name,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });
  }, []);

  // Edges between adjacent tools
  const edges = useMemo(() => {
    const e: { i: number; j: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      e.push({ i, j: (i + 1) % nodes.length });
      if (i % 2 === 0) e.push({ i, j: (i + 3) % nodes.length });
    }
    return e;
  }, []);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Tool Ecosystem Graph
      </div>

      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        {/* Grid */}
        {Array.from({ length: 40 }).map((_, i) => (
          <React.Fragment key={`g${i}`}>
            <line x1={i * 50} y1={0} x2={i * 50} y2={1080} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
            <line x1={0} y1={i * 50} x2={1920} y2={i * 50} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
          </React.Fragment>
        ))}

        {/* Edges animating in */}
        {edges.map((e, idx) => {
          const delay = 10 + idx * 4;
          const progress = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const a = nodes[e.i];
          const b = nodes[e.j];
          const ex = a.x + (b.x - a.x) * progress;
          const ey = a.y + (b.y - a.y) * progress;
          return (
            <line
              key={`e${idx}`}
              x1={a.x}
              y1={a.y}
              x2={ex}
              y2={ey}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const delay = 5 + i * 5;
          const scale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Pulse glow on selected nodes
          const glowRadius = i < 3 ? 20 + Math.sin(frame * 0.1 + i) * 5 : 0;

          return (
            <g key={n.name} opacity={opacity}>
              {glowRadius > 0 && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={glowRadius * Math.min(scale, 1)}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={12 * Math.min(scale, 1)}
                fill="#0d0d0d"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={0.75}
              />
              <text
                x={n.x}
                y={n.y + 30}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize={11}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {n.name}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

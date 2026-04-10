import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    const p: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      p.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2 + 0.5,
      });
    }
    return p;
  }, []);

  const positions = particles.map((p) => ({
    x: ((p.x + p.vx * frame) % 1920 + 1920) % 1920,
    y: ((p.y + p.vy * frame) % 1080 + 1080) % 1080,
    r: p.r,
  }));

  // Draw connections between nearby particles
  const lines: { x1: number; y1: number; x2: number; y2: number; alpha: number }[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        lines.push({
          x1: positions[i].x,
          y1: positions[i].y,
          x2: positions[j].x,
          y2: positions[j].y,
          alpha: (1 - dist / 150) * 0.12,
        });
      }
    }
  }

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        {lines.map((l, i) => (
          <line
            key={`l${i}`}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={`rgba(255,255,255,${l.alpha})`}
            strokeWidth={0.5}
          />
        ))}
        {positions.map((p, i) => (
          <circle
            key={`p${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="rgba(255,255,255,0.25)"
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

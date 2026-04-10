import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { SceneHero } from "./scenes/SceneHero";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneGraph } from "./scenes/SceneGraph";
import { SceneAgent } from "./scenes/SceneAgent";
import { SceneOutro } from "./scenes/SceneOutro";
import { Particles } from "./components/Particles";

export const ArchKBTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Persistent particle layer */}
      <Particles />

      {/* Scene 1: Hero / Brand reveal (0 - 120 frames = 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <SceneHero />
      </Sequence>

      {/* Scene 2: Features showcase (100 - 240 = 4.6s, overlapping transition) */}
      <Sequence from={100} durationInFrames={140}>
        <SceneFeatures />
      </Sequence>

      {/* Scene 3: Graph visualization (220 - 340 = 4s) */}
      <Sequence from={220} durationInFrames={120}>
        <SceneGraph />
      </Sequence>

      {/* Scene 4: Agent protocol (320 - 440 = 4s) */}
      <Sequence from={320} durationInFrames={120}>
        <SceneAgent />
      </Sequence>

      {/* Scene 5: Outro / CTA (420 - 540 = 4s) */}
      <Sequence from={420} durationInFrames={120}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};

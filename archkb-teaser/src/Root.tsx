import { Composition } from "remotion";
import { ArchKBTeaser } from "./ArchKBTeaser";

export const Root: React.FC = () => {
  return (
    <Composition
      id="ArchKBTeaser"
      component={ArchKBTeaser}
      durationInFrames={540}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

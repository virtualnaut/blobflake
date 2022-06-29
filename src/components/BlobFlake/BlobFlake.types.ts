export interface DynamicallyContstrainedAspects {
  squishMagnitude: number;
  depth: number;
}

export interface NormalAspects {
  lobes: number;
  sharpness: number;
  squishAngle: number;
  rotation: number;
  layers: number;
  layerGap: number;
  layerOpacity: number;
  linearGradientAngle: number;
}

export interface GeneratableAspects
  extends DynamicallyContstrainedAspects,
    NormalAspects {}

export type GeneratableAspectRanges = {
  [K in keyof GeneratableAspects]: [
    GeneratableAspects[K],
    GeneratableAspects[K]
  ];
};

export type GeneratableAspectProps = {
  [K in keyof GeneratableAspects]: GeneratableAspects[K] | undefined;
};

export interface BlobFlakeProps {
  plainText: string;
  size: number;
  linearColourA?: string;
  linearColourB?: string;
  aspectRanges?: Partial<GeneratableAspectRanges>;
  forcedAspects?: Partial<GeneratableAspects>;
}

export interface GeneratableAspects {
  lobes: number;
  depth: number;
  sharpness: number;
  squishX: number;
  squishY: number;
  rotation: number;
  layers: number;
  layerGap: number;
  layerOpacity: number;
  linearGradientAngle: number;
}

export type GeneratableAspectRanges = {
  [K in keyof GeneratableAspects]: [
    GeneratableAspects[K],
    GeneratableAspects[K]
  ];
};

export type GeneratableAspectProps = {
  [K in keyof GeneratableAspects]: GeneratableAspects[K] | undefined;
};

export interface BlobFlakeProps extends GeneratableAspectProps {
  plainText: string;
  size: number;
  linearColourA?: string;
  linearColourB?: string;
}

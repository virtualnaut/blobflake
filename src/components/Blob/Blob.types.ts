export interface BlobProps {
  lobes: number;
  size: number;
  depth: number;
  sharpness?: number;
  asymptote?: number;
  coefficient?: number;
  squishX?: number;
  squishY?: number;
  rotation?: number;
  layers?: number;
  layerGap?: number;
  linearColourA?: string;
  linearColourB?: string;
  layerOpacity?: number;
  linearGradientAngle?: number;
}

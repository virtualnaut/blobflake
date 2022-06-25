import React, { FunctionComponent, useMemo } from 'react';
import crc32 from 'buffer-crc32';
import {
  BlobFlakeProps,
  GeneratableAspectRanges,
  GeneratableAspects,
} from './BlobFlake.types';
import Blob from '../Blob/Blob';

const BlobFlake: FunctionComponent<BlobFlakeProps> = (props) => {
  const {
    plainText,
    lobes,
    size,
    depth,
    sharpness,
    squishX,
    squishY,
    rotation,
    layers,
    layerGap,
    linearColourA,
    linearColourB,
    layerOpacity,
    linearGradientAngle,
  } = props;

  const ranges: GeneratableAspectRanges = useMemo(
    () => ({
      lobes: [3, 20],
      depth: [0, size / 8],
      sharpness: [0, 0.75],
      squishX: [-size / 4, size / 4],
      squishY: [-size / 4, size / 4],
      rotation: [0, 2 * Math.PI],
      layers: [1, 10],
      layerGap: [2, 10],
      layerOpacity: [0.1, 0.8],
      linearGradientAngle: [0, 2 * Math.PI],
    }),
    [size]
  );

  const aspects: GeneratableAspects = useMemo(() => {
    const generated: Partial<GeneratableAspects> = {};

    Object.entries(ranges).forEach(
      ([aspect, range]: [string, [number, number]]) => {
        const { [aspect as keyof GeneratableAspects]: propValue } = props;

        generated[aspect as keyof GeneratableAspects] =
          propValue ??
          range[0] +
            (crc32(crc32(`${plainText}-${aspect}`)).readUInt32LE(0) /
              4294967295) *
              (range[1] - range[0]);
      }
    );

    return generated as GeneratableAspects;
  }, [ranges, props, plainText]);

  console.log(aspects);

  return (
    <Blob
      size={size}
      lobes={Math.round(aspects.lobes)}
      depth={aspects.depth}
      // sharpness={aspects.sharpness}
      squishX={aspects.squishX}
      squishY={aspects.squishY}
      rotation={aspects.rotation}
      layers={Math.round(aspects.layers)}
      layerGap={aspects.layerGap}
      layerOpacity={aspects.layerOpacity}
      linearGradientAngle={aspects.linearGradientAngle}
    />
  );
};

export default BlobFlake;

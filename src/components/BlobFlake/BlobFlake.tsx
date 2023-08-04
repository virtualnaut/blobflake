import React, { FunctionComponent, useMemo } from 'react';

import {
  BlobFlakeProps,
  GeneratableAspectRanges,
  GeneratableAspects,
  NormalAspects,
} from './BlobFlake.types';
import Blob from '../Blob/Blob';
import propMerge from '../../helpers/propMerge';
import decimalFromString from '../../helpers/decimalFromString';
import useDynamicallyConstrainedAspect from '../../hooks/useDynamicallyConstrainedAspect';
import normaliseAngle from '../../helpers/normaliseAngle';

const defaultRanges: GeneratableAspectRanges = {
  lobes: [3, 20],
  depth: [0, 1],
  sharpness: [0, 0.75],
  squishAngle: [0, 2 * Math.PI],
  squishMagnitude: [0, 1], // Relies on depth
  rotation: [0, 2 * Math.PI],
  layers: [1, 10],
  layerGap: [0, 0.25],
  layerOpacity: [0.1, 0.8],
  linearGradientAngle: [0, 2 * Math.PI],
};

const dynamicallyConstrainedAspects = ['depth', 'squishMagnitude'];

/**
 * `lobes` - *(number, natural)* the number of lobes that the blob has
 *
 * `depth` - *(number, 0-1)* the depth of the lobe troughs as a fraction of an eighth of the width of the blob
 *
 * `sharpness` - *(number, 0-1)* a decimal representing the amount of sharpness
 *
 * `squishAngle` - *(number, radians)* the angle of the squishing
 *
 * `squishMagnitude` - *(number, 0-1)* the amount of squishing as a fraction of the depth
 *
 * `rotation` - *(number, radians)* the rotation of the entire blob
 *
 * `layers` - *(number, natural)* the number of layers in the blob
 *
 * `layerGap` - *(number, 0-1)* the size of the gap between layers as a fraction of half the width of the blob
 *
 * `layerOpacity` - *(number, 0-1)* the opacity of each layer of the blob
 *
 * `linearGradientAngle` - *(number, radians)* the rotation of the colour gradient
 */
const BlobFlake: FunctionComponent<BlobFlakeProps> = (props) => {
  const {
    plainText,
    size,
    absoluteAspects,
    clampedAspects,
    aspectRanges,
    linearColourA,
    linearColourB,
  } = props;

  const ranges = useMemo(
    () => propMerge<GeneratableAspectRanges>(defaultRanges, aspectRanges),
    [aspectRanges]
  );

  const aspects: NormalAspects = useMemo(() => {
    const generated: Partial<NormalAspects> = {};

    Object.entries(ranges)
      .filter(
        ([aspect]: [string, [number, number]]) =>
          !dynamicallyConstrainedAspects.includes(aspect)
      )
      .forEach(([aspect, range]: [string, [number, number]]) => {
        const absoluteValue = absoluteAspects?.[aspect as keyof NormalAspects];
        const clampedValue = clampedAspects?.[aspect as keyof NormalAspects];

        generated[aspect as keyof NormalAspects] =
          absoluteValue ??
          range[0] +
            (clampedValue ?? decimalFromString(`${plainText}-${aspect}`)) *
              (range[1] - range[0]);
      });

    return generated as GeneratableAspects;
  }, [ranges, absoluteAspects, clampedAspects, plainText]);

  const depth = useDynamicallyConstrainedAspect(
    ranges.depth,
    `${plainText}-depth`,
    size / 8,
    absoluteAspects?.depth,
    clampedAspects?.depth
  );

  /**
   * The value of `squishMagnitude` depends on the value of `depth`.
   * This is because we need to make sure that the blob isn't squished outside the SVG element.
   */
  const squishMagnitude = useDynamicallyConstrainedAspect(
    ranges.squishMagnitude,
    `${plainText}`,
    depth,
    absoluteAspects?.squishMagnitude,
    clampedAspects?.squishMagnitude
  );

  const [squishX, squishY] = useMemo(() => {
    const angle = normaliseAngle(aspects.squishAngle);
    if (angle <= 90) {
      return [
        squishMagnitude * Math.sin(angle),
        -squishMagnitude * Math.cos(angle),
      ];
    }

    if (angle > 90 && angle <= 180) {
      return [
        squishMagnitude * Math.sin(180 - angle),
        squishMagnitude * Math.cos(180 - angle),
      ];
    }

    if (angle > 180 && angle <= 270) {
      return [
        -squishMagnitude * Math.sin(angle - 180),
        squishMagnitude * Math.cos(angle - 180),
      ];
    }

    return [
      -squishMagnitude * Math.sin(360 - angle),
      -squishMagnitude * Math.cos(360 - angle),
    ];
  }, [aspects.squishAngle, squishMagnitude]);

  const layerGap = useMemo(
    () => (aspects.layerGap * size) / 2,
    [aspects.layerGap, size]
  );

  const truncatedLayers = useMemo(
    () =>
      Math.round(
        layerGap * aspects.layers > size / 2
          ? Math.floor(size / 2 / layerGap)
          : aspects.layers
      ),
    [layerGap, aspects.layers, size]
  );

  return (
    <Blob
      size={size}
      lobes={Math.round(aspects.lobes)}
      depth={depth}
      sharpness={aspects.sharpness}
      squishX={squishX}
      squishY={squishY}
      rotation={aspects.rotation}
      layers={truncatedLayers}
      layerGap={layerGap}
      layerOpacity={aspects.layerOpacity}
      linearGradientAngle={aspects.linearGradientAngle}
      linearColourA={linearColourA}
      linearColourB={linearColourB}
    />
  );
};

BlobFlake.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  aspectRanges: defaultRanges,
};

export default BlobFlake;

import React, { FunctionComponent, useCallback, useMemo } from 'react';
import normaliseAngle from '../../helpers/normaliseAngle';
import { BlobProps } from './Blob.types';

// Fiddled values to get the layers looking nice.
// These could probably be props but they've been left out to keep it tidier.

/** The larger this number, the more the inner layers will compress up against the edge when the blob is squished. */
const EDGE_COMPRESSION_FACTOR = 3;

/** The larger this number, the less layer depths will decay as layer number increases. */
const DEPTH_REDUCTION_FACTOR = 5;

/**
 * The lowest level of blob. This component exposes all the raw configuration options
 * for a blob.
 */
const Blob: FunctionComponent<BlobProps> = ({
  lobes,
  size,
  depth,
  sharpness,
  asymptote,
  coefficient,
  squishX,
  squishY,
  rotation,
  layers,
  layerGap,
  linearColourA,
  linearColourB,
  layerOpacity,
  linearGradientAngle,
}: BlobProps) => {
  // Memoise some stuff because I'm too lazy to keep typing it.
  const radius = useMemo(() => size / 2, [size]);
  const points = useMemo(() => lobes * 2, [lobes]);

  /**
   * Use some brute-forced constants to get a decent handle length.
   */
  const handleOffset = useMemo(
    () => (coefficient! / points + asymptote!) * (1 - sharpness!),
    [coefficient, points, asymptote, sharpness]
  );

  /**
   * Calculate the coordinates on the circumference of a circle of radius
   * `forRadius` and centre `centre` where the angle is `angle`.
   */
  const coordinatesAt = useCallback(
    (angle: number, forRadius: number, centre: [number, number]) => [
      forRadius * Math.cos(angle) + centre[0],
      forRadius * Math.sin(angle) + centre[1],
    ],
    []
  );

  /**
   * Generate the string for the blob's path.
   */
  const generatePathString = useCallback(
    (shrinkBy: number = 0) => {
      const pathRadius = radius - shrinkBy;
      const step = (2 * Math.PI) / points;
      const centre: [number, number] = [
        radius + shrinkBy * ((squishX! / radius) * EDGE_COMPRESSION_FACTOR),
        radius + shrinkBy * ((squishY! / radius) * EDGE_COMPRESSION_FACTOR),
      ];

      const [startX, startY] = coordinatesAt(
        normaliseAngle(rotation!),
        pathRadius,
        centre
      );

      // Start by moving to the location of the first points (middle of the right edge).
      let description = `M ${startX},${startY}`;

      for (let i = 0; i < points; i += 1) {
        // Get the angle for the current point and the next one in the path.
        const theta = normaliseAngle(i * step + rotation!);
        const nextTheta = normaliseAngle((i + 1) * step + rotation!);

        // Calculate the coordinates for the current and next points.
        let pointX;
        let pointY;
        let nextX;
        let nextY;

        if (i % 2) {
          // The current point is a valley, so the next one will be a peak.
          [pointX, pointY] = coordinatesAt(
            theta,
            pathRadius - (depth - shrinkBy / DEPTH_REDUCTION_FACTOR),
            [centre[0] + squishX!, centre[1] + squishY!]
          );
          [nextX, nextY] = coordinatesAt(nextTheta, pathRadius, centre);
        } else {
          // The current point is a peak, so the next one will be a valley.
          [pointX, pointY] = coordinatesAt(theta, pathRadius, centre);
          [nextX, nextY] = coordinatesAt(
            nextTheta,
            pathRadius - (depth - shrinkBy / DEPTH_REDUCTION_FACTOR),
            [centre[0] + squishX!, centre[1] + squishY!]
          );
        }

        // Add the next bezier segment onto the path.
        description = description.concat(
          `C ${pointX - handleOffset * Math.sin(theta)},${
            pointY + handleOffset * Math.cos(theta)
          } ${nextX + handleOffset * Math.sin(nextTheta)},${
            nextY - handleOffset * Math.cos(nextTheta)
          } ${nextX},${nextY}`
        );
      }

      return description;
    },
    [
      radius,
      points,
      rotation,
      handleOffset,
      coordinatesAt,
      depth,
      squishX,
      squishY,
    ]
  );

  const [[gradientX1, gradientY1], [gradientX2, gradientY2]] = useMemo(
    () => [
      coordinatesAt(normaliseAngle(linearGradientAngle!), radius, [
        radius,
        radius,
      ]),
      coordinatesAt(normaliseAngle(linearGradientAngle! + Math.PI), radius, [
        radius,
        radius,
      ]),
    ],
    [coordinatesAt, linearGradientAngle, radius]
  );

  return (
    <svg height={size} width={size}>
      <defs>
        <linearGradient
          id="grad"
          x1={gradientX1}
          y1={gradientY1}
          x2={gradientX2}
          y2={gradientY2}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            stopColor={linearColourA}
            stopOpacity={layerOpacity}
          />
          <stop
            offset={1}
            stopColor={linearColourB}
            stopOpacity={layerOpacity}
          />
        </linearGradient>
      </defs>
      {Array(layers)
        .fill(0)
        .map((x, i) => (
          <path
            d={generatePathString(i * layerGap!)}
            style={{
              fill: `url(#grad)`,
            }}
          />
        ))}
    </svg>
  );
};
Blob.defaultProps = {
  coefficient: 157.600557,
  asymptote: 2.921513146,
  sharpness: 0,
  squishX: 0,
  squishY: 0,
  rotation: 0,
  layers: 1,
  layerGap: 10,
  linearColourA: '#0300ff',
  linearColourB: '#d900ff',
  layerOpacity: 0.1,
  linearGradientAngle: Math.PI / 4,
};

export default Blob;

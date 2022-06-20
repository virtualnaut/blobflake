import React, { FunctionComponent, useCallback, useMemo } from 'react';

interface BlobProps {
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
}

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
}: BlobProps) => {
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

  const normaliseAngle = useCallback(
    (angle: number) => (angle >= 360 ? angle - 360 : angle),
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
        radius + shrinkBy * ((squishX! / radius) * 3),
        radius + shrinkBy * ((squishY! / radius) * 3),
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
            pathRadius - (depth - shrinkBy / 5),
            [centre[0] + squishX!, centre[1] + squishY!]
          );
          [nextX, nextY] = coordinatesAt(nextTheta, pathRadius, centre);
        } else {
          // The current point is a peak, so the next one will be a valley.
          [pointX, pointY] = coordinatesAt(theta, pathRadius, centre);
          [nextX, nextY] = coordinatesAt(
            nextTheta,
            pathRadius - (depth - shrinkBy / 5),
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
      normaliseAngle,
      rotation,
      handleOffset,
      coordinatesAt,
      depth,
      squishX,
      squishY,
    ]
  );

  return (
    <svg height={size} width={size}>
      {Array(layers)
        .fill(0)
        .map((x, i) => (
          <path
            d={generatePathString(i * layerGap!)}
            fill="rgba(0, 0, 0, 0.1)"
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
};

export default Blob;

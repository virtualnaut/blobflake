import { useMemo } from 'react';
import decimalFromString from '../helpers/decimalFromString';

const useDynamicallyConstrainedAspect = (
  range: [number, number],
  plainText: string,
  basedOn: number,
  absoluteAspect?: number,
  clampedAspect?: number
) => {
  return useMemo(
    () =>
      absoluteAspect ??
      (range[0] +
        (clampedAspect ?? decimalFromString(plainText)) *
          (range[1] - range[0])) *
        basedOn,
    [absoluteAspect, range, clampedAspect, plainText, basedOn]
  );
};

export default useDynamicallyConstrainedAspect;

import { useMemo } from 'react';
import decimalFromString from '../helpers/decimalFromString';

const useDynamicallyConstrainedAspect = (
  range: [number, number],
  plainText: string,
  basedOn: number,
  forcedValue?: number
) => {
  return useMemo(
    () =>
      forcedValue ??
      (range[0] + decimalFromString(plainText) * (range[1] - range[0])) *
        basedOn,
    [basedOn, forcedValue, plainText, range]
  );
};

export default useDynamicallyConstrainedAspect;

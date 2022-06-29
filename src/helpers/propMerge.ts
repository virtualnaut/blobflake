import deepmerge from 'deepmerge';

const propMerge = <T>(defaults: T, props: Partial<T> | undefined): T =>
  deepmerge(defaults, props ?? {}, {
    arrayMerge: (desination, source) => source,
  });

export default propMerge;

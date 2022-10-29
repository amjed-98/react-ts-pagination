import type { RefObject } from 'react';

type CachedPages = Record<number, HTMLSpanElement | undefined>;

let cachedPages: CachedPages;

const getPageRef = (
  containerRef: RefObject<HTMLDivElement>,
  pageNumber: number,
): HTMLSpanElement | undefined => {
  if (!containerRef.current) return;

  if (!cachedPages) {
    cachedPages = Object.assign({}, containerRef.current.children) as unknown as CachedPages;
  }

  const indexMargin = 1;
  return cachedPages[pageNumber - indexMargin];
};

export default getPageRef;

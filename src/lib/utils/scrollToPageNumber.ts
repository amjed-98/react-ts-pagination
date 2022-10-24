import type { RefObject } from 'react';

type CachedPages = Record<number, HTMLSpanElement | undefined>;

let cachedPages: CachedPages = {};

const scrollToPageNumber = (containerRef: RefObject<HTMLDivElement>, pageNumber: number) => {
  if (!containerRef.current) return;

  if (!cachedPages) {
    cachedPages = Object.assign({}, containerRef.current.children) as unknown as CachedPages;
  }

  const indexMargin = 1;
  cachedPages[pageNumber - indexMargin]?.scrollIntoView();
};

export default scrollToPageNumber;

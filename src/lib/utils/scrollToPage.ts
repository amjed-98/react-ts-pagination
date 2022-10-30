import type { RefObject } from 'react';
import getPageRef from './getPageRef';

const scrollToPage = (containerRef: RefObject<HTMLDivElement>, pageNumber: number): void => {
  const pageRef = getPageRef(containerRef, pageNumber);

  pageRef?.scrollIntoView({ behavior: 'smooth' });
};

export default scrollToPage;

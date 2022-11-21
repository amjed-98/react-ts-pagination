import type { CSSProperties } from 'react';

declare global {
  declare type Page = {
    pageNumber: number;
    activePageClass: string;
    pageClass: string;
    style: CSSProperties;
  };
}

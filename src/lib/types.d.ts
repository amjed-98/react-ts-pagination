import type { CSSProperties } from 'react';

declare global {
  type Color = CSSProperties['color'];
  type BgColor = CSSProperties['backgroundColor'];

  declare type Page = {
    pageNumber: number;
    style: {
      '--color': Color;
      '--background-color': BgColor;
      '--hover-color': Color;
      '--hover-bgColor': BgColor;
    };
    activeClass?: string;
    pageClass?: string;
  };
}

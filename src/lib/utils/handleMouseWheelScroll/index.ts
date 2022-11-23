import { type WheelEvent } from 'react';

const handleMouseWheelScroll = (e: WheelEvent<HTMLDivElement>): void => {
  const target = e.target as HTMLDivElement;
  target.scrollLeft += e.deltaY * 2;
};

export default handleMouseWheelScroll;

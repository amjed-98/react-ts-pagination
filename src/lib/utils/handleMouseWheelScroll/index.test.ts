import { describe, expect } from 'vitest';
import handleMouseWheelScroll from '.';

describe('handleMouseWheelScroll function', () => {
  it('should increment the target.scrollLeft', () => {
    const event = {
      target: { scrollLeft: 1 },
      deltaY: 2,
      preventDefault() {
        console.log('prevented');
      },
    };

    const expected = event.target.scrollLeft + event.deltaY * 2;
    handleMouseWheelScroll(event as never);

    expect(event.target.scrollLeft).toBe(expected);
  });
});

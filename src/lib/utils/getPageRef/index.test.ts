import { describe, expect } from 'vitest';
import getPageRef from '.';

const pageContainer = { current: { children: [1, 2, 3, 4] } };
describe('getPageRef function', () => {
  it('should return the page ref', () => {
    const pageRef = getPageRef(pageContainer as never, 2);

    expect(pageRef).toBe(2);
  });

  it('should return undefined when page not found', () => {
    const pageRef = getPageRef(pageContainer as never, 100);

    expect(pageRef).not.toBeDefined();
  });

  it('should return undefined when page container.current is undefined', () => {
    const pageRef = getPageRef({} as never, 100);

    expect(pageRef).not.toBeDefined();
  });
});

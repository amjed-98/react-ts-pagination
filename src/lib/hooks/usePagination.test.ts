import usePagination from '@/lib/hooks/usePagination';
import { DUMMY_ITEMS, renderHook, arrayOf } from '@/lib/test_setup';
import { describe } from 'vitest';
import { dispatchEvent } from '../utils';

const FIRST_TEN_ITEMS = DUMMY_ITEMS.slice(0, 10);
const FIRST_FIVE_ITEMS = DUMMY_ITEMS.slice(0, 5);

beforeEach(() => {
  dispatchEvent('pageChange', 1);
});

describe('usePagination', () => {
  describe('when not passing values for itemsPerPage and initialPageNumber parameters', () => {
    const { result } = renderHook(() => usePagination({ items: DUMMY_ITEMS }));

    it('should return the first 10 items of the items array', () => {
      expect(result.current.pageItems).toEqual(FIRST_TEN_ITEMS);
    });

    it('should return the default currentPageNumber', () => {
      expect(result.current.currentPageNumber).toBe(1);
    });
  });

  describe('when passing values for itemsPerPage and initialPageNumber parameters', () => {
    const { result } = renderHook(() => usePagination({ items: DUMMY_ITEMS, itemsPerPage: 5 }));
    it('should return the first 5 items of the items array', () => {
      expect(result.current.pageItems).toEqual(FIRST_FIVE_ITEMS);
    });

    it('should return the initialPageNumber as the currentPageNumber', () => {
      const { result } = renderHook(() =>
        usePagination({ items: DUMMY_ITEMS, initialPageNumber: 3 }),
      );
      expect(result.current.currentPageNumber).toEqual(3);
    });
  });

  describe('when passing items array of a certain length', () => {
    it('should return the value 2 as the numberOfPages when passing items array', () => {
      const { result } = renderHook(() => usePagination({ items: DUMMY_ITEMS }));
      expect(result.current.numberOfPages).toEqual(2);
    });

    it('should return the value 3 as the numberOfPages when passing array of 30 length', () => {
      const { result } = renderHook(() => usePagination({ items: arrayOf(30) }));
      expect(result.current.numberOfPages).toEqual(3);
    });

    it('should return the value 5 as the numberOfPages when passing array of 50 length', () => {
      const { result } = renderHook(() => usePagination({ items: arrayOf(50) }));
      expect(result.current.numberOfPages).toEqual(5);
    });

    it('should return the value 10 as the numberOfPages when passing array of 100 length', () => {
      const { result } = renderHook(() => usePagination({ items: arrayOf(100) }));
      expect(result.current.numberOfPages).toEqual(10);
    });
  });

  describe('when dispatching pageChange event', () => {
    it('should increment currentPageNumber and return ', () => {
      const { result } = renderHook(() => usePagination({ items: DUMMY_ITEMS }));
      const dispatchedPageNumber = 2;
      const defaultNumberOfPages = 10;
      dispatchEvent('pageChange', dispatchedPageNumber);

      const start = (dispatchedPageNumber - 1) * defaultNumberOfPages;
      const end = dispatchedPageNumber * defaultNumberOfPages;
      const expectedPageItems = DUMMY_ITEMS.slice(start, end);

      expect(result.current.currentPageNumber).toBe(dispatchedPageNumber);
      expect(result.current.pageItems).toEqual(expectedPageItems);
    });
  });
});

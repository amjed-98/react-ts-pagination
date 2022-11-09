import { describe, it, expect } from 'vitest';
import useServerPagination from '.';
import { DUMMY_ITEMS, renderHook, setupServer } from '@/lib/test_setup';

const itemsPerPage = 10;
const initialPageNumber = 1;
const numberOfPages = 20;
const url = 'https://api';

describe('useServerPagination', () => {
  it('should fetch and return the first 10 items with isLoading,isError, error and currentPageNumber states', async () => {
    const server = setupServer({
      endpoint: url,
      itemsPerPage,
      pageNumber: initialPageNumber,
    });

    server.listen();

    const { result, waitForNextUpdate } = renderHook(() =>
      useServerPagination<typeof DUMMY_ITEMS>({
        url,
        searchParams: { page: 'page', perPage: 'per_page' },
        itemsPerPage,
        initialPageNumber,
        numberOfPages,
      }),
    );

    const expected = DUMMY_ITEMS.slice(0, 10);

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.pageItems).toEqual(expected);
    expect(result.current.currentPageNumber).toBe(initialPageNumber);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();

    server.resetHandlers();
    server.close();
  });

  it('should fetch another page when pageChange event is dispatched', async () => {
    const changedPageNumber = 2;

    const server = setupServer({
      endpoint: url,
      itemsPerPage,
      pageNumber: changedPageNumber,
    });
    server.listen();

    const { result, waitForNextUpdate } = renderHook(() =>
      useServerPagination<typeof DUMMY_ITEMS>({
        url,
        searchParams: { page: 'page', perPage: 'per_page' },
        itemsPerPage,
        initialPageNumber,
        numberOfPages,
      }),
    );

    result.current.handlePageChange(changedPageNumber, undefined);

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    const start = (changedPageNumber - 1) * itemsPerPage;
    const end = changedPageNumber * itemsPerPage;

    const expected = DUMMY_ITEMS.slice(start, end);

    expect(result.current.pageItems).toEqual(expected);
    expect(result.current.currentPageNumber).toBe(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();

    server.resetHandlers();
    server.close();
  });
});

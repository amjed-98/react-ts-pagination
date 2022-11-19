import { describe, it, expect } from 'vitest';
import useServerPagination from '.';
import { DUMMY_ITEMS, renderHook, setupServer } from '@/lib/test_setup';
import { rest } from 'msw';

const itemsPerPage = 10;
const initialPageNumber = 1;
const numberOfPages = 20;
const url = 'https://api';
const searchParams = { page: 'page', perPage: 'per_page' };

const server = setupServer(url);
beforeAll(server.listen);
afterAll(server.close);

describe('useServerPagination', () => {
  it('should fetch and return the first 10 items with isLoading,isError, error and currentPageNumber states', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useServerPagination<typeof DUMMY_ITEMS>({
        url,
        searchParams,
        itemsPerPage,
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
  });

  it('should fetch another page when the page number change', async () => {
    const changedPageNumber = 2;

    const { result, waitForNextUpdate } = renderHook(() =>
      useServerPagination<typeof DUMMY_ITEMS>({
        url,
        searchParams,
        initialPageNumber: changedPageNumber,
        itemsPerPage,
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
  });
});

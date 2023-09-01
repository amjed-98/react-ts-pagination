import { describe, it, expect } from 'vitest';
import useServerPagination from '.';
import { DUMMY_ITEMS, renderHook, setupServer } from '@/lib/test_setup';
import { Provider } from '@/lib';

const itemsPerPage = 10;
const url = 'https://api';

const server = setupServer(url);
beforeAll(() => server.listen());
afterAll(server.close);

const queryFunction = async (page: number) => {
  const data = await (await fetch(`${url}?page=${page}&per_page=10`)).json();
  return data;
};

describe('useServerPagination', () => {
  it('should fetch and return the first 10 items with isLoading,isError, error and currentPageNumber states', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useServerPagination<typeof DUMMY_ITEMS>({ queryFunction }), {
      wrapper: Provider,
    });

    const firstPageData = DUMMY_ITEMS.slice(0, 10);

    expect(result.current.isFetching).toBe(true);

    await waitForNextUpdate();

    expect(result.current.pageItems).toEqual(firstPageData);
    expect(result.current.currentPageNumber).toBe(1);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();

    // --------------------------------------------------------------

    // fetch second page
    const secondPageNumber = 2;
    result.current.handlePageChange(secondPageNumber, undefined, 10);

    expect(result.current.isFetching).toBe(true);

    await waitForNextUpdate();

    const start = (secondPageNumber - 1) * itemsPerPage;
    const end = secondPageNumber * itemsPerPage;
    const secondPageData = DUMMY_ITEMS.slice(start, end);

    expect(result.current.pageItems).toEqual(secondPageData);
    expect(result.current.currentPageNumber).toBe(secondPageNumber);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

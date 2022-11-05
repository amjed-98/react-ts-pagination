import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { renderHook, setupServer } from '@/lib/test_setup';
import useFetch from '.';
import { DUMMY_ITEMS } from '@/lib/test_setup';

const url = 'https://api.punkapi.com/v2/beers';

const server = setupServer({ endpoint: url });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useFetch hook', () => {
  it('should fetch data and return an object with isLoading,isError,error and data states', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch<typeof DUMMY_ITEMS>(url));

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(DUMMY_ITEMS);
  });

  it('should return an an error object, isError = true, isLoading, and data = undefined when an error occurs', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch<null>('bad url'));

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});

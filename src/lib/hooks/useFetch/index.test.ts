import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { renderHook, setupServer } from '@/lib/test_setup';
import useFetch from '.';
import { DUMMY_ITEMS } from '@/lib/test_setup';
import { listenFor } from '@/lib/utils';

const url = new URL('https://api');

url.searchParams.append('page', `${1}`);
url.searchParams.append('per_page', `${10}`);

const server = setupServer(url.href);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(() => server.close());

describe('useFetch hook', () => {
  it('should fetch data and return an object with isLoading,isError,error and data states', async () => {
    const fetchListener = vi.fn();
    listenFor('fetch', fetchListener);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch<typeof DUMMY_ITEMS>(url.href, true),
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(fetchListener).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(DUMMY_ITEMS.slice(0, 10));
  });

  it('should not send a request and get the cache instead', async () => {
    const { result } = renderHook(() => useFetch<typeof DUMMY_ITEMS>(url.href, true));
    const fetchListener = vi.fn();

    listenFor('fetch', fetchListener);

    expect(fetchListener).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(DUMMY_ITEMS.slice(0, 10));
  });

  it('should return an an error object, isError = true, isLoading, and data = undefined when an error occurs', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch<null>('bad url', true));

    expect(result.current.isLoading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});

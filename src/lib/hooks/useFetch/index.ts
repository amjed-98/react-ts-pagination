/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

type FetchError = null | Error | { message: string };

type Returns<Data> = {
  isLoading: boolean;
  isError: boolean;
  error: FetchError;
  data: Data | undefined;
};

type Url = string;

type Cache = {
  [key: Url]: any;
};

const cache: Cache = Object.create(null); // prototype-less object

const useFetch = <Data>(url: Url, cacheEnabled: boolean): Returns<Data> => {
  const [error, setError] = useState<FetchError>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (url: string): Promise<void> => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const cachedResponse = cache[url];

      if (cachedResponse && cacheEnabled) {
        setIsLoading(false);
        setError(null);
        return setData(cache[url]);
      }

      setIsLoading(true);
      const response = await fetch(url, { signal: abortControllerRef.current.signal });
      const parsedResponse: unknown = await response.json();

      if (!isResponseOk<Data>(response, parsedResponse)) return Promise.reject(parsedResponse);

      setError(null);

      if (cacheEnabled) cache[url] = parsedResponse;

      setData(parsedResponse);
    } catch (err) {
      if (err instanceof Error) return setError(err);

      setError({ message: 'something went wrong!' });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    fetchData(url);

    return () => {
      setData(undefined);
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return {
    isError: !!error,
    isLoading: (isLoading || !data) && !error,
    data,
    error,
  };
};

export default useFetch;

const isResponseOk = <Data>(
  response: Response,
  parsedResponse: unknown,
): parsedResponse is Data => {
  return response.ok;
};

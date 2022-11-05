import { useEffect, useRef, useState } from 'react';

type FetchError = null | Error | { message: string };

type ReturnType<Data> = {
  isLoading: boolean;
  isError: boolean;
  error: FetchError;
  data: Data | undefined;
};

const useFetch = <Data>(url: string): ReturnType<Data> => {
  const [error, setError] = useState<FetchError>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (url: string): Promise<void> => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setIsLoading(true);
      const response = await fetch(url, { signal: abortControllerRef.current.signal });
      const parsedResponse = await response.json();

      if (!response.ok) {
        return Promise.reject(parsedResponse);
      }

      setError(null);
      setData(parsedResponse as Data);
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

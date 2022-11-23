import { useQuery, type QueryStatus } from '@tanstack/react-query';

type Returns<Data, Error> = {
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  data: Data | undefined;
  status: QueryStatus;
};

type Parameters<Data> = {
  queryFunction: (pageNumber: number) => Promise<Data>;
  pageNumber: number;
  cacheTime: number;
};

const useFetch = <Data, Error>({ queryFunction, pageNumber, cacheTime }: Parameters<Data>): Returns<Data, Error> => {
  const { status, isFetching, data, error, isError } = useQuery<Data, Error>(
    ['queryKey:', pageNumber],
    () => queryFunction(pageNumber),
    { keepPreviousData: true, staleTime: cacheTime },
  );

  return {
    isError,
    error,
    isFetching: isFetching,
    status,
    data,
  };
};

export default useFetch;

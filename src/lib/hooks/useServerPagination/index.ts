import type { QueryStatus } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import useFetch from '../useFetch';

type Returns<PageItems, Error> = {
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  pageItems: PageItems | undefined;
  currentPageNumber: number;
  handlePageChange: (
    pageNumber: number,
    pageRef: HTMLSpanElement | undefined,
    numberOfPage: number,
  ) => void;
  status: QueryStatus;
};

type Parameters<PageItems> = {
  queryFunction: (pageNumber: number) => Promise<PageItems>;
  initialPageNumber?: number;
  cacheTime?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useServerPagination = <PageItems = any, Error = unknown>({
  queryFunction,
  initialPageNumber = 1,
  cacheTime = 10_000,
}: Parameters<PageItems>): Returns<PageItems, Error> => {
  if (initialPageNumber <= 0) console.error('initial page Number must be greater than 0');

  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber);

  const {
    data: pageItems,
    error,
    isError,
    isFetching,
    status,
  } = useFetch<PageItems, Error>({ queryFunction, pageNumber: currentPageNumber, cacheTime });

  const handlePageChange = useCallback<
    (pageNumber: number, _: HTMLSpanElement, numberOfPages: number) => void
  >((pageNumber, _, numberOfPages) => {
    const FIRST_PAGE_NUMBER = 1;
    const LAST_PAGE_NUMBER = numberOfPages;

    const isFirstPage = pageNumber + 1 === FIRST_PAGE_NUMBER;
    const isLastPage = pageNumber - 1 === LAST_PAGE_NUMBER;

    if (isFirstPage || isLastPage) return;

    setCurrentPageNumber(pageNumber);
  }, []);

  return {
    isFetching,
    isError,
    error,
    pageItems,
    currentPageNumber,
    handlePageChange,
    status,
  };
};

export default useServerPagination;

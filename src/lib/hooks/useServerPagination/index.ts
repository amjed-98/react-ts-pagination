/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import useFetch from '../useFetch';

type FetchError = null | Error | { message: string };

type Returns<PageItems extends any[]> = {
  isLoading: boolean;
  isError: boolean;
  error: FetchError;
  pageItems: PageItems | undefined;
  currentPageNumber: number;
  handlePageChange: (pageNumber: number, pageRef: HTMLSpanElement | undefined) => void;
};

type Parameters = {
  url: string;
  searchParams: Record<'page' | 'perPage', string>;
  itemsPerPage: number;
  numberOfPages: number;
  initialPageNumber?: number;
  cacheEnabled?: boolean;
};

const useServerPagination = <PageItems extends any[]>({
  url,
  itemsPerPage,
  searchParams: { page, perPage },
  initialPageNumber = 1,
  numberOfPages,
  cacheEnabled = true,
}: Parameters): Returns<PageItems> => {
  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber);
  const paginationUrl = new URL(url);
  paginationUrl.searchParams.append(page, `${currentPageNumber}`);
  paginationUrl.searchParams.append(perPage, `${itemsPerPage}`);

  const {
    data: pageItems,
    error,
    isError,
    isLoading,
  } = useFetch<PageItems>(paginationUrl.href, cacheEnabled);

  const handlePageChange = useCallback((pageNumber: number): void => {
    const FIRST_PAGE_NUMBER = 1;
    const LAST_PAGE_NUMBER = numberOfPages;

    const isFirstPage = pageNumber + 1 === FIRST_PAGE_NUMBER;
    const isLastPage = pageNumber - 1 === LAST_PAGE_NUMBER;

    if (isFirstPage || isLastPage) return;

    setCurrentPageNumber(pageNumber);
  }, []);

  return {
    isLoading,
    isError,
    error,
    pageItems,
    currentPageNumber,
    handlePageChange,
  };
};

export default useServerPagination;

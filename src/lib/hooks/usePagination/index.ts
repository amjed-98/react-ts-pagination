import { useCallback, useEffect, useRef, useState } from 'react';

type ReturnType<PageItem> = {
  pageItems: PageItem[];
  currentPageNumber: number;
  numberOfPages: number;
  handlePageChange: (pageNumber: number, pageRef: HTMLSpanElement | undefined) => void;
};

type Parameters<PageItem> = {
  initialPageNumber?: number;
  itemsPerPage?: number;
  items: PageItem[];
};

const usePagination = <PageItem>({
  initialPageNumber = 1,
  itemsPerPage = 10,
  items,
}: Parameters<PageItem>): ReturnType<PageItem> => {
  const numberOfPages = Math.ceil(items.length / itemsPerPage);

  if (initialPageNumber <= 0) console.error('initial page Number must be greater than 0');
  if (initialPageNumber > numberOfPages) console.error('initial page Number must be less than the number of pages');

  const [pageItems, setPageItems] = useState<PageItem[]>([]);
  const currentPageNumber = useRef(initialPageNumber);

  const handlePageChange = useCallback((pageNumber: number): void => {
    const FIRST_PAGE_NUMBER = 1;
    const LAST_PAGE_NUMBER = numberOfPages;

    const isFirstPage = pageNumber + 1 === FIRST_PAGE_NUMBER;
    const isLastPage = pageNumber - 1 === LAST_PAGE_NUMBER;

    if (isFirstPage || isLastPage) return;

    const start = (pageNumber - 1) * itemsPerPage;
    const end = pageNumber * itemsPerPage;

    currentPageNumber.current = pageNumber;
    setPageItems(items.slice(start, end));
  }, []);

  useEffect(() => {
    const start = (currentPageNumber.current - 1) * itemsPerPage;
    const end = currentPageNumber.current * itemsPerPage;
    setPageItems(items.slice(start, end));
  }, []);

  return {
    pageItems,
    currentPageNumber: currentPageNumber.current,
    numberOfPages,
    handlePageChange,
  };
};

export default usePagination;

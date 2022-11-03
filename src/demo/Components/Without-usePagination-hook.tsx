import { useState, useRef, useEffect } from 'react';
import items from '@/demo/items';
import { Pagination } from '@/lib';
import Table from './Table';

const ITEMS_PER_PAGE = 10;
const numberOfPages = Math.ceil(items.length / ITEMS_PER_PAGE);

function Without_usePagination_Hook() {
  const [pageItems, setPageItems] = useState<typeof items>([]);
  const currentPageNumber = useRef(1);

  const handlePageChange = (pageNumber: number, _pageRef: HTMLSpanElement | undefined) => {
    const FIRST_PAGE_NUMBER = 1;
    const LAST_PAGE_NUMBER = numberOfPages;

    const isFirstPage = pageNumber + 1 === FIRST_PAGE_NUMBER;
    const isLastPage = pageNumber - 1 === LAST_PAGE_NUMBER;

    if (isLastPage || isFirstPage) return;

    const start = (pageNumber - 1) * ITEMS_PER_PAGE;
    const end = pageNumber * ITEMS_PER_PAGE;

    currentPageNumber.current = pageNumber;
    setPageItems(items.slice(start, end));
  };

  useEffect(() => {
    const start = (currentPageNumber.current - 1) * ITEMS_PER_PAGE;
    const end = currentPageNumber.current * ITEMS_PER_PAGE;
    setPageItems(items.slice(start, end));
  }, []);

  return (
    <div className='App'>
      <Table pageItems={pageItems} />

      <Pagination
        currentPageNumber={currentPageNumber.current}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Without_usePagination_Hook;

import type { FC, JSXElementConstructor, WheelEvent, CSSProperties } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { dispatchEvent, getPageRef, listenFor, scrollToPage } from '@/lib/utils';
import Button from './components/Button';
import Pages from './components/Pages';
import './index.css';

type Props = {
  currentPageNumber: number;
  numberOfPages: number;
  onPageChange?: (pageNumber: number, pageRef: HTMLSpanElement | undefined) => void;
  paginationContainerClass?: string;
  pagesContainerClass?: string;
  nextLabel?: string | JSXElementConstructor<Record<string, never>>;
  prevLabel?: string | JSXElementConstructor<Record<string, never>>;
  nextBtnClass?: string;
  prevBtnClass?: string;
  pageStyle?: CSSProperties;
  pageClass?: string;
  activePageStyle?: CSSProperties;
  activePageClass?: string;
};

const Pagination: FC<Props> = (props) => {
  const {
    currentPageNumber,
    numberOfPages,
    pageStyle,
    activePageStyle,
    pageClass = 'page-number',
    activePageClass = 'active-page-number',
    paginationContainerClass = 'pagination',
    pagesContainerClass = 'pages',
    nextBtnClass = 'btn',
    prevBtnClass = 'btn',
    onPageChange,
    prevLabel = '❮',
    nextLabel = '❯',
  } = props;

  const pagesRef = useRef<HTMLDivElement>(null);

  const handlePageChange = useCallback((pageNumber: number): void => {
    /*
      ? if pass  onPageChange handler function then will use it
      ? else will use the default handler that is in usePagination hook
    */
    if (onPageChange) {
      const pageRef = getPageRef(pagesRef, pageNumber);
      return onPageChange(pageNumber, pageRef);
    }

    dispatchEvent('pageChange', pageNumber);
  }, []);

  const handleMouseWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.scrollLeft += e.deltaY * 2;
  };

  const handleScrollToPage = ({ detail: pageNumber }: CustomEvent<number>): void => {
    scrollToPage(pagesRef, pageNumber);
  };

  useEffect(listenFor('pageChange', handleScrollToPage), []);

  return (
    <div className={paginationContainerClass} onWheel={handleMouseWheelScroll}>
      <Button
        Label={prevLabel}
        className={nextBtnClass}
        onClick={handlePageChange.bind(null, currentPageNumber - 1)}
      />

      <Pages
        ref={pagesRef}
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        pageStyle={pageStyle}
        activePageStyle={activePageStyle}
        pageClass={pageClass}
        activePageClass={activePageClass}
        handlePageChange={handlePageChange}
        pagesContainerClass={pagesContainerClass}
      />

      <Button
        Label={nextLabel}
        className={prevBtnClass}
        onClick={handlePageChange.bind(null, currentPageNumber + 1)}
      />
    </div>
  );
};

export default Pagination;

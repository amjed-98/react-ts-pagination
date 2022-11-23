import type { FC, JSXElementConstructor, CSSProperties } from 'react';
import { useCallback, useRef } from 'react';
import { getPageRef, handleMouseWheelScroll } from '@/lib/utils';
import Button from './components/Button';
import Pages from './components/Pages';
import './index.css';

export type Props = {
  currentPageNumber: number;
  numberOfPages: number;
  onPageChange: (
    pageNumber: number,
    pageRef: HTMLSpanElement | undefined,
    numberOfPages: number,
  ) => void;
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
  buildPageText?: (pageNumber: number) => string | number;
};

const Pagination: FC<Props> = (props) => {
  const {
    currentPageNumber,
    numberOfPages,
    pageStyle = {},
    activePageStyle = {},
    pageClass = 'page',
    activePageClass = 'active-page',
    paginationContainerClass = 'pagination',
    pagesContainerClass = 'pages',
    nextBtnClass = 'btn',
    prevBtnClass = 'btn',
    onPageChange,
    prevLabel = '❮',
    nextLabel = '❯',
    buildPageText = (pageNumber) => pageNumber,
  } = props;

  const pagesRef = useRef<HTMLDivElement>(null);

  const handlePageChange = useCallback((pageNumber: number): void => {
    const pageRef = getPageRef(pagesRef, pageNumber);

    onPageChange(pageNumber, pageRef, numberOfPages);
    pageRef?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className={paginationContainerClass} onWheel={handleMouseWheelScroll} role='pagination'>
      <Button
        Label={prevLabel}
        className={prevBtnClass}
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
        buildPageText={buildPageText}
      />

      <Button
        Label={nextLabel}
        className={nextBtnClass}
        onClick={handlePageChange.bind(null, currentPageNumber + 1)}
      />
    </div>
  );
};

export default Pagination;

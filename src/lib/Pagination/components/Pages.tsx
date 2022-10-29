import { useEffect, useMemo, useRef, type FC, type CSSProperties } from 'react';
import { listenFor, scrollToPageNumber } from '@/lib/utils';
import PageNumber from './PageNumber';

type Props = {
  numberOfPages: number;
  currentPageNumber: number;
  handlePageChange: (pageNumber: number) => void;
  pageClass: string;
  activePageClass: string;
  pageStyle?: CSSProperties;
  activePageStyle?: CSSProperties;
  pagesContainerClass: string;
};

const Pages: FC<Props> = (props) => {
  const {
    numberOfPages,
    pageClass,
    currentPageNumber,
    activePageClass,
    pageStyle,
    activePageStyle,
    handlePageChange,
    pagesContainerClass,
  } = props;

  const pagesRef = useRef<HTMLDivElement>(null);

  const pages = useMemo<Page[]>(() => {
    return Array.from({ length: numberOfPages }, (_, i) => {
      const pageNumber = i + 1;
      const style = pageNumber === currentPageNumber ? activePageStyle : pageStyle;

      return {
        pageNumber,
        style,
        activePageClass,
        pageClass,
      };
    });
  }, [currentPageNumber, numberOfPages, activePageStyle, pageStyle]);

  const handleScrollToPageNumber = ({ detail: pageNumber }: CustomEvent<number>): void => {
    scrollToPageNumber(pagesRef, pageNumber);
  };

  useEffect(listenFor('pageChange', handleScrollToPageNumber), []);

  return (
    <div className={pagesContainerClass} ref={pagesRef}>
      {pages.map((page) => (
        <PageNumber
          key={page.pageNumber}
          page={page}
          currentPageNumber={currentPageNumber}
          handlePageChange={handlePageChange}
        />
      ))}
    </div>
  );
};

export default Pages;

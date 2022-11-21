import { useMemo, forwardRef, type CSSProperties } from 'react';
import Page from '../Page';

export type Props = {
  numberOfPages: number;
  currentPageNumber: number;
  handlePageChange: (pageNumber: number) => void;
  pageClass: string;
  activePageClass: string;
  pagesContainerClass: string;
  pageStyle: CSSProperties;
  activePageStyle: CSSProperties;
  buildPageText: (pageNumber: number) => string | number;
};

const Pages = forwardRef<HTMLDivElement, Props>((props, pagesRef) => {
  const {
    numberOfPages,
    pageClass,
    currentPageNumber,
    activePageClass,
    pageStyle,
    activePageStyle,
    handlePageChange,
    pagesContainerClass,
    buildPageText,
  } = props;

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
  }, [currentPageNumber, numberOfPages, activePageStyle, pageStyle, activePageClass, pageClass]);

  return (
    <div className={pagesContainerClass} ref={pagesRef}>
      {pages.map((page) => (
        <Page
          key={page.pageNumber}
          page={page}
          currentPageNumber={currentPageNumber}
          handlePageChange={handlePageChange}
          buildPageText={buildPageText}
        />
      ))}
    </div>
  );
});

export default Pages;

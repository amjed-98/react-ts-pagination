import { useMemo, forwardRef, type CSSProperties } from 'react';
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
  }, [currentPageNumber, numberOfPages, activePageStyle, pageStyle]);

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
});

export default Pages;

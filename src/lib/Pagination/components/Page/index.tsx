import { useMemo, type MouseEvent, type FC, useCallback } from 'react';

export type Props = {
  page: Page;
  currentPageNumber: number;
  handlePageChange: (pageNumber: number) => void;
  buildPageText: (pageNumber: number) => string | number;
};

const Page: FC<Props> = (props) => {
  const {
    page: { pageClass, activePageClass, pageNumber, style },
    handlePageChange,
    currentPageNumber,
    buildPageText,
  } = props;

  const computedClasses = useMemo<string>(() => {
    const isActivePage = currentPageNumber === pageNumber;

    if (isActivePage) return `${pageClass} ${activePageClass}`;

    return pageClass;
  }, [currentPageNumber, activePageClass, pageClass]);

  // ? add hover effect when activePageClass is passed
  const handleOnHoverClass = (e: MouseEvent<HTMLSpanElement>): void => {
    if (!activePageClass) return;
    if (currentPageNumber === pageNumber) return;

    const pageElement = e.target as HTMLSpanElement;
    pageElement.classList.toggle(activePageClass);
  };

  const handlePageClick = useCallback((): void => {
    handlePageChange(pageNumber);
  }, []);

  return (
    <span
      onClick={handlePageClick}
      style={style}
      className={computedClasses}
      onMouseEnter={handleOnHoverClass}
      onMouseLeave={handleOnHoverClass}
    >
      {buildPageText(pageNumber)}
    </span>
  );
};

export default Page;

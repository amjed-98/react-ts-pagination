import { dispatchEvent } from '@/lib/utils';
import { useMemo, type MouseEvent, type FC } from 'react';

type Props = {
  page: Page;
  currentPageNumber: number;
  handlePageChange: (pageNumber: number) => void;
};

const PageNumber: FC<Props> = (props) => {
  const {
    page: { pageClass, activeClass, pageNumber, style },
    handlePageChange,
    currentPageNumber,
  } = props;

  const computedClasses = useMemo<string | 'pageNumber'>(() => {
    const isActiveClass = !!(activeClass && currentPageNumber === pageNumber);

    if (isActiveClass) {
      return `${pageClass} ${activeClass}`;
    }

    if (pageClass) {
      return `${pageClass}`;
    }

    return 'pageNumber';
  }, [currentPageNumber]);

  const handlePageClick = () => {
    if (handlePageChange) handlePageChange(pageNumber);
    else dispatchEvent('pageChange', pageNumber);
  };

  const handleOnHoverClass = (e: MouseEvent<HTMLSpanElement>): void => {
    if (!activeClass) return;
    if (currentPageNumber === pageNumber) return;

    const pageElement = e.target as HTMLSpanElement;
    pageElement.classList.toggle(activeClass);
  };

  return (
    <span
      onClick={handlePageClick.bind(null, pageNumber)}
      style={style as Record<string, string>}
      className={computedClasses}
      onMouseEnter={handleOnHoverClass}
      onMouseLeave={handleOnHoverClass}
    >
      {pageNumber}
    </span>
  );
};

export default PageNumber;

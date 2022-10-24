import { type FC, type JSXElementConstructor, type WheelEvent } from 'react';
import { dispatchEvent } from '@/lib/utils';
import Button from './components/Button';
import Pages from './components/Pages';
import './index.css';

type Props = {
  currentPageNumber: number;
  numberOfPages: number;
  onPageChange?: (pageNumber: number) => void;
  NextArrow?: string | JSXElementConstructor<Record<string, never>>;
  PrevArrow?: string | JSXElementConstructor<Record<string, never>>;
  activePageStyle?: { color: Color; backgroundColor: BgColor };
  pageClass?: string;
  activePageClass?: string;
  paginationContainerClass?: string;
  pagesContainerClass?: string;
  arrowsBtnClass?: string;
};

const Pagination: FC<Props> = (props) => {
  const {
    currentPageNumber,
    numberOfPages,
    activePageClass,
    activePageStyle,
    pageClass,
    paginationContainerClass,
    pagesContainerClass,
    arrowsBtnClass,
    onPageChange,
    PrevArrow = '❮',
    NextArrow = '❯',
  } = props;

  const handlePageChange = (action: number | 'next' | 'prev') => {
    const pageNumber =
      action === 'next'
        ? currentPageNumber + 1
        : action === 'prev'
        ? currentPageNumber - 1
        : action;

    /*
    ? if you pass your own onPageChange handler function then will use it
    ? else will use the default handler that is in usePagination hook
    */
    if (onPageChange) onPageChange(pageNumber);
    else dispatchEvent('pageChange', pageNumber);
  };

  const handleMouseWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.scrollLeft += e.deltaY * 2;
  };

  const classes = paginationContainerClass || 'pagination';
  return (
    <div className={classes} onWheel={handleMouseWheelScroll}>
      <Button
        Label={PrevArrow}
        className={arrowsBtnClass || 'btn prev-btn'}
        onClick={handlePageChange.bind(null, 'prev')}
      />

      <Pages
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        activePageStyle={activePageStyle}
        pageClass={pageClass}
        activePageClass={activePageClass}
        handlePageChange={handlePageChange}
        pagesContainerClass={pagesContainerClass}
      />

      <Button
        Label={NextArrow}
        className={arrowsBtnClass || 'btn next-btn'}
        onClick={handlePageChange.bind(null, 'next')}
      />
    </div>
  );
};

export default Pagination;

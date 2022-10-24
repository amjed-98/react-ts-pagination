import { memo, useEffect, useMemo, useRef, type FC } from 'react';
import { listenFor, scrollToPageNumber, unSubscribe } from '@/lib/utils';
import PageNumber from './PageNumber';

type Props = {
  numberOfPages: number;
  currentPageNumber: number;
  activePageStyle?: { color: Color; backgroundColor: BgColor };
  activePageClass?: string;
  pageClass?: string;
  handlePageChange: (pageNumber: number) => void;
};

const Pages: FC<Props> = (props) => {
  const {
    numberOfPages,
    pageClass,
    currentPageNumber,
    activePageClass,
    activePageStyle,
    handlePageChange,
  } = props;
  const pagesRef = useRef<HTMLDivElement>(null);

  const defaultPageTheme: Page['style'] = useMemo(
    () => ({
      '--color': '#A0A7B9',
      '--background-color': 'transparent',
      '--hover-color': activePageStyle?.color ?? 'white',
      '--hover-bgColor': activePageStyle?.backgroundColor ?? '#8D00D8',
    }),
    [activePageStyle?.color, activePageStyle?.backgroundColor],
  );

  const activePageTheme: Page['style'] = useMemo(
    () => ({
      ...defaultPageTheme,
      '--color': activePageStyle?.color ?? 'white',
      '--background-color': activePageStyle?.backgroundColor ?? '#8D00D8',
    }),
    [activePageStyle?.color, activePageStyle?.backgroundColor],
  );

  const pages = useMemo<Page[]>(() => {
    return Array.from({ length: numberOfPages }, (_, i) => {
      const pageNumber = i + 1;
      const style = pageNumber === currentPageNumber ? activePageTheme : defaultPageTheme;

      return {
        pageNumber,
        style,
        activeClass: activePageClass,
        pageClass: pageClass,
      };
    });
  }, [currentPageNumber]);

  const handleScrollToPageNumber = ({ detail: pageNumber }: CustomEvent): void => {
    scrollToPageNumber(pagesRef, pageNumber);
  };

  useEffect(() => {
    listenFor('pageChange', handleScrollToPageNumber);

    return () => unSubscribe('pageChange', handleScrollToPageNumber);
  }, []);

  return (
    <div className='pages' ref={pagesRef}>
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

export default memo(Pages, (prevProps, props) => {
  return prevProps.currentPageNumber === props.currentPageNumber;
});

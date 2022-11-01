import Pagination from '.';
import { render, screen, userEvent } from '@/lib/test_setup';
import { dispatchEvent, listenFor } from '../utils';
import { describe, expect, it } from 'vitest';

const utilsModule = await import('../utils');
const currentPageNumber = 3;
const numberOfPages = 6;

const mockListener = vi.fn();
listenFor<number>('pageChange', ({ detail: pageNumber, type }) =>
  mockListener({ pageNumber, type }),
);

describe('Pagination Component with default props', () => {
  beforeEach(() => {
    render(<Pagination currentPageNumber={currentPageNumber} numberOfPages={numberOfPages} />);
  });

  it('should match snapshot', () => {
    const paginationElement = screen.getByRole('pagination');

    expect(paginationElement).toMatchSnapshot();
  });

  it('should have the "pagination" class', () => {
    const paginationElement = screen.getByRole('pagination');

    expect(paginationElement.className).toBe('pagination');
  });

  it(`should dispatch a pageChange event with pageNumber = ${
    currentPageNumber + 1
  } when next button clicked`, async () => {
    const nextButton = screen.getByText('❯');
    await userEvent.click(nextButton);

    expect(mockListener).toHaveBeenCalledWith({ pageNumber: 4, type: 'pageChange' });
  });

  it(`should dispatch a pageChange event with pageNumber = ${
    currentPageNumber - 1
  } when prev button clicked`, async () => {
    const prevButton = screen.getByText('❮');
    await userEvent.click(prevButton);

    expect(mockListener).toHaveBeenCalledWith({ pageNumber: 2, type: 'pageChange' });
  });

  it('should dispatch a pageChange event with pageNumber = 5 when page "5" is clicked', async () => {
    const pageFive = screen.getByText(5);
    await userEvent.click(pageFive);

    expect(mockListener).toHaveBeenCalledWith({ pageNumber: 5, type: 'pageChange' });
  });

  it('should call scrollToPage function when pageChange event is dispatched', async () => {
    const scrollSpy = vi.spyOn(utilsModule, 'scrollToPage');
    dispatchEvent('pageChange', 5);

    const pagesRef = screen.getByRole('pagination').children[1];

    expect(scrollSpy).toHaveBeenCalledWith({ current: pagesRef }, 5);
  });
});

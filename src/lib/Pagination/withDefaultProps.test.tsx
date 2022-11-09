import Pagination from '.';
import { render, screen, userEvent } from '@/lib/test_setup';
import { describe, expect, it, beforeEach } from 'vitest';
import { getPageRef } from '@/lib/utils';
const utilsModule = await import('../utils');
const currentPageNumber = 3;
const numberOfPages = 6;

const mockHandlePageChange = vi.fn(
  (_pageNumber: number, _pageRef: HTMLSpanElement | undefined) => null,
);

const pageContainer = { current: { children: [1, 2, 3, 4] } };
const getRef = (pageNumber: number) => getPageRef(pageContainer as never, pageNumber);

describe('Pagination Component with default props', () => {
  beforeEach(() => {
    render(
      <Pagination
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        onPageChange={mockHandlePageChange}
      />,
    );
  });

  it('should match snapshot', () => {
    const paginationElement = screen.getByRole('pagination');

    expect(paginationElement).toMatchSnapshot();
  });

  it('should have the "pagination" class', () => {
    const paginationElement = screen.getByRole('pagination');

    expect(paginationElement.className).toBe('pagination');
  });

  it(`should invoke handlePageChange function with pageNumber = ${
    currentPageNumber + 1
  } when next button clicked`, async () => {
    const nextButton = screen.getByText('❯');
    await userEvent.click(nextButton);

    const CurrentPageNumber = currentPageNumber + 1;
    const pageRef = getRef(CurrentPageNumber);

    expect(mockHandlePageChange).toHaveBeenCalledWith(CurrentPageNumber, pageRef);
  });

  it(`should invoke handlePageChange function with pageNumber = ${
    currentPageNumber - 1
  } when prev button clicked`, async () => {
    const prevButton = screen.getByText('❮');
    await userEvent.click(prevButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(2, getRef(2));
  });

  it('should invoke handlePageChange function with pageNumber = 5 when page "5" is clicked', async () => {
    const pageFive = screen.getByText(5);
    await userEvent.click(pageFive);

    expect(mockHandlePageChange).toHaveBeenCalledWith(5, getRef(5));
  });

  it('should call scrollToPage function when handlePageChange function is invoked', async () => {
    const scrollSpy = vi.spyOn(utilsModule, 'scrollToPage');

    const nextButton = screen.getByText('❯');

    await userEvent.click(nextButton);

    const pagesRef = screen.getByRole('pagination').children[1];
    expect(scrollSpy).toHaveBeenCalledWith({ current: pagesRef }, 4);
  });
});

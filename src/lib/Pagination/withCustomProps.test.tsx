import Pagination, { type Props } from '.';
import { render, renderHook, screen, userEvent } from '@/lib/test_setup';
import { listenFor } from '../utils';
import { useState } from 'react';
import { describe, expect, it, beforeEach } from 'vitest';

const {
  result: {
    current: [currentPageNumber, setCurrentPageNumber],
  },
} = renderHook(() => useState(4));

const props: Props = {
  currentPageNumber,
  numberOfPages: 10,
  nextLabel: 'next',
  prevLabel: 'prev',
  onPageChange: (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  },
  nextBtnClass: 'next-btn-class',
  prevBtnClass: 'prev-btn-class',
  pageStyle: { color: 'red' },
  activePageStyle: { color: 'blue' },
  pageClass: 'page-class',
  activePageClass: 'active-page-class',
  pagesContainerClass: 'pages-container-class',
  paginationContainerClass: 'pagination-container-class',
};

const {
  paginationContainerClass,
  nextLabel,
  prevLabel,
  pageClass,
  pageStyle,
  nextBtnClass,
  prevBtnClass,
  activePageClass,
  activePageStyle,
} = props;

const mockListener = vi.fn();
const onPageChangeSpy = vi.spyOn(props, 'onPageChange');

listenFor<number>('pageChange', ({ detail: pageNumber, type }) =>
  mockListener({ pageNumber, type }),
);

describe('Pagination Component  with custom props', () => {
  beforeEach(() => {
    render(<Pagination {...props} />);
  });

  it('should match snapshot', () => {
    const paginationElement = screen.getByRole('pagination');

    expect(paginationElement).toMatchSnapshot();
  });

  it(`should have ${paginationContainerClass} the  class`, () => {
    const paginationElement = screen.getByRole('pagination');

    expect(paginationElement.className).toBe(paginationContainerClass);
  });

  it(`should call onPageChange handler with pageNumber = ${
    currentPageNumber + 1
  } and not dispatch pageChange event when next button clicked`, async () => {
    const nextButton = screen.getByText(nextLabel as string);

    await userEvent.click(nextButton);
    const pageRef = screen.getByText(5);
    expect(onPageChangeSpy).toHaveBeenCalledWith(5, pageRef, props.numberOfPages);

    expect(mockListener).not.toHaveBeenCalled();
  });

  it(`should call onPageChange handler with pageNumber = ${
    currentPageNumber - 1
  } and not dispatch pageChange event when prev button clicked`, async () => {
    const prevButton = screen.getByText(prevLabel as string);

    await userEvent.click(prevButton);
    const pageRef = screen.getByText(3);

    expect(onPageChangeSpy).toHaveBeenCalledWith(3, pageRef, props.numberOfPages);

    expect(mockListener).not.toHaveBeenCalled();
  });

  it(`should give ${nextBtnClass}, ${prevBtnClass} class to buttons`, () => {
    const nextButton = screen.getByText(nextLabel as string);
    const prevButton = screen.getByText(prevLabel as string);

    expect(nextButton.className).toBe(nextBtnClass);
    expect(prevButton.className).toBe(prevBtnClass);
  });

  it(`should give style ${pageStyle?.color}, ${pageClass} class to page element when not active`, () => {
    const pageElement = screen.getByText(1);

    expect(pageElement.style.color).toBe(pageStyle?.color);
    expect(pageElement.className).toBe(pageClass);
  });

  it(`should give style ${activePageStyle?.color}, ${pageClass} ${activePageClass} class to page element when active`, () => {
    const pageElement = screen.getByText(currentPageNumber);

    expect(pageElement.style.color).toBe(activePageStyle?.color);
    expect(pageElement.className).toBe(`${pageClass} ${activePageClass}`);
  });
});

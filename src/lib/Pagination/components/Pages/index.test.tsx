import { render, renderHook } from '@/lib/test_setup';
import Pages, { type Props } from '.';
import { describe, expect, it } from 'vitest';
import { useRef } from 'react';

const props: Props = {
  numberOfPages: 5,
  pageClass: 'page',
  currentPageNumber: 1,
  activePageClass: 'active',
  handlePageChange: () => {
    console.log('called');
  },
  pagesContainerClass: 'page-container',
};

describe('Page Component', () => {
  const { numberOfPages, pagesContainerClass } = props;
  const { container } = render(<Pages {...props} />);
  const pagesElement = container.children[0];

  it(`should render Page component with ${pagesContainerClass} class`, () => {
    expect(pagesElement).toBeInTheDocument();
    expect(pagesElement.className).toBe(pagesContainerClass);
  });

  it(`should render ${numberOfPages} Pages as the total my pages`, () => {
    expect(pagesElement.children.length).toBe(numberOfPages);
  });

  it('should match the pages snapshot', () => {
    const { baseElement } = render(<Pages {...props} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should mutate the forwarded Ref to be the pages Dom reference', () => {
    const { result } = renderHook(() => useRef<HTMLDivElement>(null));
    const { asFragment } = render(<Pages {...props} ref={result.current} />);

    expect(result.current.current).toEqual(asFragment().firstChild);
  });
});

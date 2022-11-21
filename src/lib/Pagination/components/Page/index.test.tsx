import { render, screen, userEvent } from '@/lib/test_setup';
import { describe, expect, it } from 'vitest';
import Page, { type Props } from '.';

const props: Props = {
  page: {
    pageNumber: 1,
    activePageClass: 'active',
    pageClass: 'page',
    style: { backgroundColor: 'red', color: 'blue' },
  },
  currentPageNumber: 2,
  handlePageChange: () => {
    console.count('called');
  },

  buildPageText: (pageNumber) => pageNumber,
};

describe('Page Component', () => {
  const { pageNumber, activePageClass, pageClass, style } = props.page;

  it(`should render Page Component with ${pageClass} class`, () => {
    render(<Page {...props} />);
    const pageElement = screen.getByText(pageNumber);

    expect(pageElement).toBeInTheDocument();
    expect(pageElement.className).toBe(pageClass);
  });

  it(`should have the "${pageClass} ${activePageClass}" class when clicked`, async () => {
    render(<Page {...props} />);
    const pageElement = screen.getByText(pageNumber);

    await userEvent.click(pageElement);
    expect(pageElement.className).toBe(`${pageClass} ${activePageClass}`);
  });

  it(`should have the "${pageClass} ${activePageClass}" class when hovered`, async () => {
    render(<Page {...props} />);
    const pageElement = screen.getByText(pageNumber);

    await userEvent.hover(pageElement);
    expect(pageElement.className).toBe(`${pageClass} ${activePageClass}`);
  });

  it(`should have the color "${style?.color}" and backgroundColor "${style?.backgroundColor}"`, () => {
    render(<Page {...props} />);
    const pageElement = screen.getByText(pageNumber);

    expect(getComputedStyle(pageElement).color).toBe(style?.color);
    expect(getComputedStyle(pageElement).backgroundColor).toBe(style?.backgroundColor);
  });

  it(`should call the handlePageChange function when page clicked"`, async () => {
    const spy = vi.spyOn(props, 'handlePageChange');
    render(<Page {...props} />);
    const pageElement = screen.getByText(pageNumber);

    await userEvent.click(pageElement);
    await userEvent.click(pageElement);

    expect(spy.getMockName()).toBe('handlePageChange');
    expect(spy).toHaveBeenNthCalledWith(2, pageNumber);
  });
});

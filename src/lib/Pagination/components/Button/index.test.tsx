import { render, screen } from '@/lib/test_setup';
import Button from '.';

const Component = () => {
  return <span>next</span>;
};

describe('Button', () => {
  it('should render a button element', () => {
    render(<Button Label={'button'} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('should render Label when passed a string', () => {
    render(<Button Label='next' />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('next');
  });

  it('should render Label when passed a component', () => {
    render(<Button Label={Component} />);
    const button = screen.getByRole('button');

    expect(button).toContainHTML('span');
    expect(button).toHaveTextContent('next');
  });
});

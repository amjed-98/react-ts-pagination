import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) => render(ui, options);
export const arrayOf = (length: number) => Array.from({ length });

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { renderHook, act } from '@testing-library/react-hooks';

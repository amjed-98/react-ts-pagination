import { cleanup, render, RenderOptions } from '@testing-library/react';
import { afterEach } from 'vitest';
import { rest } from 'msw';
import { setupServer, type SetupServerApi } from 'msw/node';
import DUMMY_ITEMS from './DUMMY_ITEMS';

afterEach(cleanup);

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) => render(ui, options);
export const arrayOf = (length: number) => Array.from({ length });

type Parameters = {
  endpoint: string;
  pageNumber?: number;
  itemsPerPage?: number;
};

const createServer = ({
  endpoint,
  pageNumber,
  itemsPerPage = DUMMY_ITEMS.length,
}: Parameters): SetupServerApi => {
  const start = pageNumber ? (pageNumber - 1) * itemsPerPage : 0;
  const end = pageNumber ? pageNumber * itemsPerPage : itemsPerPage;
  const response = DUMMY_ITEMS.slice(start, end);

  return setupServer(rest.get(endpoint, (_req, res, ctx) => res(ctx.json(response))));
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export { renderHook, act } from '@testing-library/react-hooks';
export { createServer as setupServer };

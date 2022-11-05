import { setupServer, type SetupServerApi } from 'msw/node';
import DUMMY_ITEMS from './DUMMY_ITEMS';
import { rest } from 'msw';

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

export default createServer;

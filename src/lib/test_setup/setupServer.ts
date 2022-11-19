import { setupServer, type SetupServerApi } from 'msw/node';
import DUMMY_ITEMS from './DUMMY_ITEMS';
import { rest } from 'msw';
import { dispatchEvent } from '../utils';

window.fetch = new Proxy(window.fetch, {
  async apply(fetch, that, args: never) {
    const result = fetch.apply(that, args);

    const response = await result;
    dispatchEvent('fetch', response);

    return result;
  },
});

const createServer = (endpoint: string): SetupServerApi => {
  return setupServer(
    rest.get(endpoint, (req, res, ctx) => {
      const pageNumber = +(req.url.searchParams.get('page') as `${number}`);
      const itemsPerPage = +(req.url.searchParams.get('per_page') as `${number}`);

      const start = (pageNumber - 1) * itemsPerPage;
      const end = pageNumber * itemsPerPage;

      const response = DUMMY_ITEMS.slice(start, end);

      return res(ctx.json(response));
    }),
  );
};

export default createServer;

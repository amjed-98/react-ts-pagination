import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import With_usePagination_Hook from './With-usePagination-hook';
import Without_usePagination_Hook from './Without-usePagination-hook';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <With_usePagination_Hook />
    {/* <Without_usePagination_Hook /> */}
  </StrictMode>,
);

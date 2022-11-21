import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  // With_usePagination_Hook,
  // Without_hooks,
  With_userServerPagination_Hook,
} from '@/demo/Components';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    {/* <With_usePagination_Hook /> */}
    {/* <Without_hooks /> */}
    <With_userServerPagination_Hook />
  </StrictMode>,
);

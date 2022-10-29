import React from 'react';
import ReactDOM from 'react-dom/client';
import items from './items';
import { usePagination, Pagination } from '@/lib';
import './index.css';

const Table = ({ pageItems }: { pageItems: typeof items }) => {
  const tableHeaders = ['id', 'First name', 'Last name', 'email', 'Phone'];
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {pageItems.map(({ id, first_name, last_name, email, phone }) => {
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{email}</td>
              <td>{phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

function App() {
  const { currentPageNumber, numberOfPages, pageItems } = usePagination({
    items,
  });

  return (
    <div className='App'>
      <Table pageItems={pageItems} />

      <Pagination
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        // activePageClass='active'
        // pageClass='page'
        // nextLabel={'next'}
        // prevLabel={'prev'}
        // pageStyle={{ backgroundColor: 'cyan', color: 'green' }}
        // activePageStyle={{ backgroundColor: 'red', color: 'blue' }}
        // paginationContainerClass='container'
        // nextBtnClass='next'
        // prevBtnClass='prev'
        // pagesContainerClass='page-container'
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import items from '@/demo/items';
import { usePagination, Pagination } from '@/lib';
import Table from './Table';

function With_usePagination_Hook() {
  const { currentPageNumber, pageItems, numberOfPages, handlePageChange } = usePagination({
    items,
    itemsPerPage: 8,
  });

  return (
    <div className='App'>
      <Table>
        {pageItems.map((page) => (
          <tr key={page.id}>
            <td>{page.id}</td>
            <td>{page.first_name}</td>
            <td>{page.last_name}</td>
            <td>{page.email}</td>
            <td>{page.phone}</td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default With_usePagination_Hook;

import items from '@/demo/items';
import { usePagination, Pagination } from '@/lib';
import Table from './Table';

function With_usePagination_Hook() {
  const { currentPageNumber, pageItems, numberOfPages } = usePagination({ items });

  return (
    <div className='App'>
      <Table pageItems={pageItems} />

      <Pagination currentPageNumber={currentPageNumber} numberOfPages={numberOfPages} />
    </div>
  );
}

export default With_usePagination_Hook;

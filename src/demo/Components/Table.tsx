import items from '@/demo/items';
import type { FC } from 'react';

type Props = { pageItems: typeof items };

const Table: FC<Props> = ({ pageItems }) => {
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
        {pageItems?.map((page) => {
          return (
            <tr key={page.id}>
              <td>{page.id}</td>
              <td>{page.first_name}</td>
              <td>{page.last_name}</td>
              <td>{page.email}</td>
              <td>{page.phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

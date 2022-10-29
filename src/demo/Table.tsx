import items from './items';
import type { FC } from 'react';
import './index.css';

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

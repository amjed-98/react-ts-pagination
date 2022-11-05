import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tableHeaders?: string[];
};

const Table: FC<Props> = (props) => {
  const { children, tableHeaders = ['id', 'First name', 'Last name', 'email', 'Phone'] } = props;

  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;

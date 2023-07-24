import React, { ReactNode, ReactElement } from 'react';

type Row = {
  [key: string]: ReactNode;
};

type Column = {
  id: string;
  header: string;
};

type Props = {
  rowData: Row[];
  columnData: Column[];
};

export function Table({ rowData, columnData }: Props): ReactElement<Props> {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden bg-white rounded-lg">
      <table className="border-collapse w-full text-xs md:text-base">
        <thead className="text-xs md:text-sm">
          <tr>
            {columnData.map(({ header, id }) => (
              <th
                key={id}
                className="border-b font-medium p-3 md:p-5 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnData.map((column, columnIndex) => (
                <td key={columnIndex} className="border-b p-3 md:px-5 md:py-3">
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

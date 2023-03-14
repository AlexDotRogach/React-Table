import "./table.css";
import React, { FC, ReactElement } from "react";
import { useTable } from "../../context/tableContext";
import { AiFillDelete } from "react-icons/ai";
import { nanoid } from "nanoid";

const Table: FC = () => {
  const { rows, columns, createRowByClick, removeRowByClick, saveCell } =
    useTable();

  const renderRowsInput: (rowId: string, amount: number) => ReactElement[] = (
    rowId,
    amount
  ) => {
    const rowsArr: ReactElement[] = [];

    for (let i = 0; i < amount; i++) {
      rowsArr.push(
        <th key={i} data-row-id={rowId} data-column-id={columns?.[i].id}>
          <input
            className="cell"
            type="text"
            name="cell"
            autoComplete="off"
            data-id={`${columns?.[i].id}${rowId}`}
            onChange={saveCell}
          />
        </th>
      );
    }

    return rowsArr;
  };

  const renderSumValue: (id: string) => number = (id) => {
    const curRow = rows?.filter(({ id: rowId }) => rowId === id)[0];

    return (
      curRow?.cells?.reduce((result, cell) => {
        result += cell.amount;
        return result;
      }, 0) || 0
    );
  };

  const renderAverageValue: (id: string) => number = (id) => {
    const curColumn = columns?.filter(({ id: columnId }) => columnId === id)[0];

    if (!curColumn?.cells?.length) return 0;

    const resultObj = curColumn?.cells?.reduce(
      (result, cell) => {
        result.result += cell.amount;

        if (cell.amount > 0) {
          result.counter += 1;
        }

        return result;
      },
      { counter: 0, result: 0 }
    ) ?? { counter: 0, result: 0 };

    return resultObj.result / resultObj.counter;
  };

  return (
    <div className="table-wrapper">
      <table cellSpacing="0">
        <thead>
          <tr>
            <th></th>
            {columns?.map(({ id, name }) => {
              return (
                <th key={id} data-column-id={id}>
                  {name}
                </th>
              );
            })}
            <th>Sum values</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map(({ id, name }, index) => {
            return (
              <tr key={id}>
                <th>{name}</th>
                {renderRowsInput(id, columns?.length ?? 0)}
                <th data-row-id={id}>{renderSumValue(id)}</th>
                <th
                  className="delete-icon"
                  onClick={() => removeRowByClick && removeRowByClick(id)}
                >
                  <AiFillDelete></AiFillDelete>
                </th>
              </tr>
            );
          })}
          <tr data-last>
            <th>Average values</th>
            {columns?.map(({ id, name }, index) => {
              return (
                <th key={id} data-column-id={id}>
                  {renderAverageValue(id)}
                </th>
              );
            })}
            <th></th>
          </tr>
        </tbody>
      </table>
      <button className="rowAdd" onClick={createRowByClick}>
        add row
      </button>
    </div>
  );
};

export default Table;

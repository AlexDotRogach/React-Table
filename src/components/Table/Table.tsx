import "./table.css";
import React, { FC, MouseEventHandler, ReactElement } from "react";
import { useTable } from "../../context/tableContext";
import { AiFillDelete } from "react-icons/ai";

const Table: FC = () => {
  const {
    rows,
    columns,
    createRowByClick,
    removeRowByClick,
    saveCell,
    findValue = 0,
  } = useTable();

  const renderRowsInput: (rowId: string, amount: number) => ReactElement[] = (
    rowId,
    amount
  ) => {
    const rowsArr: ReactElement[] = [];
    for (let i = 0; i < amount; i++) {
      const curRow = rows?.find((row) => row.id === rowId);

      const curCell = curRow?.cells.find(
        (cell) => cell.id === `${columns?.[i].id}${rowId}`
      ) || { amount: 0 };

      const sumCell =
        curRow?.cells.reduce((sum, cell) => {
          sum += cell.amount;
          return sum;
        }, 0) || 0;

      const procentByOther = Math.round((curCell.amount * 100) / sumCell) || 0;
      const findClass =
        curCell.amount !== 0 && curCell.amount < +findValue
          ? "selectionGradient"
          : "";

      rowsArr.push(
        <th
          key={i}
          data-row-id={rowId}
          data-column-id={columns?.[i].id}
          className={findClass}
        >
          <input
            className="cell"
            type="text"
            name="cell"
            autoComplete="off"
            data-id={`${columns?.[i].id}${rowId}`}
            onChange={saveCell}
          />
          <div className="procentByOther">{procentByOther}%</div>
        </th>
      );
    }

    return rowsArr;
  };

  const toggleProcent: (id: string) => void = (id) => {
    try {
      const cells = document.querySelectorAll(`[data-row-id *= ${id}]`);

      cells.forEach((cell) => {
        const procEl = cell?.lastElementChild;
        const procElValue = procEl?.textContent?.slice(0, -1) || "";
        const procElValueNumber = +procElValue || 0;

        if (procElValueNumber > 0) cell?.classList.toggle("selectionGradient");
        procEl?.classList.toggle("procentByOtherShow");
      });
    } catch {
      console.log("trobules with DOM");
    }
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

    const calcValue = resultObj.result / resultObj.counter;

    return isNaN(calcValue) ? 0 : +calcValue.toFixed(2);
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
                <th
                  className="sumCell"
                  data-row-id={id}
                  onMouseLeave={() => toggleProcent(id)}
                  onMouseEnter={() => toggleProcent(id)}
                >
                  {renderSumValue(id)}
                </th>
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

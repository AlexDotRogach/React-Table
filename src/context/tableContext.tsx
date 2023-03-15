import { ChangeEvent, createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { IcreateTable, IvalueProvider, Icell, Iline } from "../types/Itable";

const valueProvider: IvalueProvider = {};
export const tableContext = createContext(valueProvider);
export const useTable = () => useContext(tableContext);
export const TableProvider = ({ children }: any) => {
  const [rows, setRows] = useState<Iline[]>([]);
  const [columns, setColumns] = useState<Iline[]>([]);
  const [findValue, setFindValue] = useState(0);
  const createTable: (obj: IcreateTable) => void = ({
    columnValue,
    rowValue,
    searchValue,
  }) => {
    setRows(createDataForTable("M", +rowValue));
    setColumns(createDataForTable("N", +columnValue));
    setFindValue(+searchValue);
  };

  const createRowByClick = () => {
    setRows([
      ...rows,
      { id: nanoid(), name: `M - ${rows.length + 1}`, cells: [] },
    ]);
  };

  const removeRowByClick = (id: string) => {
    const indexDelete = rows.findIndex(({ id: idRow }) => idRow === id);
    rows[indexDelete].cells.forEach((cell) => {
      columns.forEach((column) => {
        const curCellIndex = column.cells.findIndex(
          (cellColumn) => cellColumn.id === cell.id
        );

        if (!(curCellIndex < 0)) {
          column.cells.splice(curCellIndex, 1);
        }
      });
    });

    rows.splice(indexDelete, 1);

    setRows([...rows]);
  };

  const saveCell = (e: ChangeEvent) => {
    const { rowId, columnId }: any = e.target?.parentElement?.dataset;
    const target = e.target as HTMLTextAreaElement;
    const { id: cellId = "" } = target?.dataset;
    const value = target?.value;
    const newCell: Icell = { id: cellId, amount: +value };

    const curRow = rows.find(({ id }) => id === rowId);
    const curColumn = columns.find(({ id }) => id === columnId);

    // delete old cell
    const rowCellIndex: number =
      curRow?.cells.findIndex((cell) => cell.id === cellId) || 0;
    const columnCellIndex: number =
      curColumn?.cells.findIndex((cell) => cell.id === cellId) || 0;

    if (!(rowCellIndex < 0)) {
      curRow?.cells.splice(rowCellIndex, 1);
      curColumn?.cells.splice(columnCellIndex, 1);
    }
    // add new cell
    curRow?.cells.push(newCell);
    curColumn?.cells.push(newCell);

    setRows([...rows]);
  };
  const createDataForTable: (text: string, amount: number) => Iline[] = (
    text,
    amount
  ) => {
    const newLine = [];

    for (let i = 1; i <= +amount; i++) {
      newLine.push({ id: nanoid(), name: `${text} - ${i}`, cells: [] });
    }

    return newLine;
  };

  return (
    <tableContext.Provider
      value={{
        rows,
        columns,
        createTable,
        createRowByClick,
        removeRowByClick,
        saveCell,
        findValue,
      }}
    >
      {children}
    </tableContext.Provider>
  );
};

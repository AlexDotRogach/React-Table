import { ChangeEvent } from "react";

export interface IcreateTable {
  columnValue: string;
  rowValue: string;
  searchValue: string;
}
export interface IvalueProvider {
  createTable?: (obj: IcreateTable) => void;
  rows?: Iline[];
  columns?: Iline[];
  createRowByClick?: () => void;
  removeRowByClick?: (id: string) => void;
  saveCell?: (e: ChangeEvent) => void;
  findValue?: number;
}

export interface Icell {
  id: string;
  amount: number;
}
export interface Iline {
  id: string;
  name: string;
  cells: Icell[];
}

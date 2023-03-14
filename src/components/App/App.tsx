import { FormEvent } from "react";
import "./App.css";
import { useTable } from "../../context/tableContext";
import { createTableSubmitValidate as validateValue } from "../../validation/createTableSubmitValidate";
import Table from "../Table";
import Form from "../Form";

function App() {
  const { createTable } = useTable();
  const createTableSubmit: (e: FormEvent) => void = (e: FormEvent) => {
    e.preventDefault();
    const {
      currentTarget: { elements },
    }: any = e;

    const {
      column: { value: columnValue },
      row: { value: rowValue },
      searchValue: { value: searchValue },
    } = elements;
    //
    // if (validateValue([columnValue, rowValue, searchValue])) {
    //   alert(
    //     "all fields must be fill or your value isn`t correct (you should write a number)"
    //   );
    //   return;
    // }

    if (!createTable) return;

    createTable({ columnValue, rowValue, searchValue });
  };

  return (
    <>
      <Form createTableSubmit={createTableSubmit}></Form>
      <Table></Table>
    </>
  );
}

export default App;

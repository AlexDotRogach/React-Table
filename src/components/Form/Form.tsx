import "./form.css";
import { FC, FormEvent } from "react";

interface FormProps {
  createTableSubmit: (e: FormEvent) => void;
}

const Form: FC<FormProps> = ({ createTableSubmit }) => {
  return (
    <form className="form" onSubmit={createTableSubmit}>
      <input
        type="text"
        name="column"
        autoComplete="off"
        placeholder="write amount of columns"
      />
      <input
        type="text"
        name="row"
        autoComplete="off"
        placeholder="write amount of rows"
      />
      <input
        type="text"
        name="searchValue"
        autoComplete="off"
        placeholder="write value for search"
      />
      <button className="submitBtn">create table</button>
    </form>
  );
};

export default Form;

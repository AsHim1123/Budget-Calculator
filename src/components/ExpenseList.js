import React from "react";
import ExpenseItem from "./ExpenseItem";
import {MdDelete} from "react-icons/md"
const ExpenseList = (props) => {
  return (
    <>
      <ul className="list">
        {props.expenses.map((e) => {
          return <ExpenseItem key={e.id} expense={e} handleDelete={props.handleDelete} handleEdit={props.handleEdit} />;
        })}
      </ul>
      {props.expenses.length>0 && <button className="btn" onClick={props.clearAllExpenses}>Clear All Expenses
      <MdDelete className="btn-icon"/></button>}
    </>
  );
};

export default ExpenseList;

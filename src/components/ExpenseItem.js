import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
const ExpenseItem = (props) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{props.expense.charge}</span>
        <span className="amount">Rs.{props.expense.amount}</span>
      </div>
      <div>
        <button className="edit-btn" aria-label="edit button" onClick={() => props.handleEdit(props.expense.id)}>
          <MdEdit />
        </button>
        <button className="clear-btn" aria-label="delete button" onClick={() => props.handleDelete(props.expense.id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;

import React from "react";
import { MdSend } from "react-icons/md";
const ExpenseForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            value={props.charge}
            onChange={props.handleCharge}
            placeholder="Enter the charge..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            onChange={props.handleAmount}
            value={props.amount}
            placeholder="Enter the amount..."
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {props.edit ? "Edit" : "Add"}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;

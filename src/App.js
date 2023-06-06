import "./App.css";
import { v4 as uuidv4 } from "uuid";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import AlertMsg from "./components/AlertMsg";
import { useEffect, useState } from "react";
function App() {
  const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];
  const [expenses, setExpenses] = useState(initialExpenses);
  const [alert, setAlert] = useState({ show: false });
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge: charge, amount: amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item Edited!!!" });
      } else {
        const singleExpense = { id: uuidv4(), charge: charge, amount: amount };
        setExpenses([...expenses, singleExpense]);
      }

      setCharge("");
      setAmount("");
      handleAlert({ type: "success", text: "Item Added!!!" });
    } else if (charge !== "" && amount === "") {
      handleAlert({ type: "danger", text: "Amount should not be empty!!!" });
    } else if (charge === "" && amount > 0) {
      handleAlert({ type: "danger", text: "Charge should not be empty!!!" });
    } else if (charge !== "" && amount < 0) {
      handleAlert({ type: "danger", text: "Amount should be greater than zero!!!" });
    } else if (charge === "" && amount < 0) {
      handleAlert({ type: "danger", text: "Charge should not be empty and amount should be greater than zero!!!" });
    } else {
      handleAlert({ type: "danger", text: "Charge and amount should not be empty!!!" });
    }
  };
  const clearAllExpenses = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items Cleared!!!" });
  };
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((e) => {
      return e.id !== id;
    });
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item Deleted!!!" });
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);
  };
  return (
    <div>
      {alert.show && <AlertMsg type={alert.type} text={alert.text} />}
      <AlertMsg />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleSubmit={handleSubmit}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearAllExpenses={clearAllExpenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        Total Spending:{" "}
        <span className="total">
          Rs.
          {expenses.reduce((acc, current) => {
            return (acc += parseInt(current.amount));
          }, 0)}
        </span>
      </h1>
    </div>
  );
}
export default App;

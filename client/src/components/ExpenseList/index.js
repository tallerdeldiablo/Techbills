import React from 'react';
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container"
import { Toast } from 'bootstrap';

const ExpenseList = ({ expenses, title }) => {
    const totalExpenses = (val) => {
    const tot = 0;
    tot+=val;
    console.log("tot",tot)
  };
  


  if (!expenses.length) {
    return <h3>No Expenses Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {expenses &&
        expenses.map((expense) => (
          <div key={expense._id} className="card mb-1">
            <h4 className="card-header bg-primary text-light p-2 m-0">
            {expense.expenseValue}   $    {expense.expenseAuthor}   
           
            </h4> Edit Remove
            <ProgressBar variant="success" now={expense.expenseAuthor} key={1} />
          </div>
        ))}
    </div>
  );
};

export default ExpenseList;

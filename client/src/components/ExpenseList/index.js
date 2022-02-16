import React from 'react';

const ExpenseList = ({ expenses, title }) => {
  if (!expenses.length) {
    return <h3>No Expenses Yet</h3>;
  }

  return (
    
    <div>
   
      <h3>{title}</h3>
      {expenses &&
        expenses.map((expense) => (
          <div key={expense._id} className="">
            <h4 className="c">
              {expense.expenseAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this expense on {expense.createdAt}
              </span>
            </h4>
            <div className="">
              <p>{expense.expenseValue}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ExpenseList;

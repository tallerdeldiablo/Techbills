import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_EXPENSE } from '../../utils/mutations';
import { QUERY_EXPENSES } from '../../utils/queries';

const ExpenseForm = () => {
  const [formState, setFormState] = useState({
    expenseValue: '',
    expenseAuthor: '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addExpense, { error }] = useMutation(ADD_EXPENSE, {
   
    update(cache, { data: { addExpense } }) {
      try {
        const { expenses } = cache.readQuery({ query: QUERY_EXPENSES });

        cache.writeQuery({
          query: QUERY_EXPENSES,
          data: { expenses: [addExpense, ...expenses] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addExpense({
        variables: { ...formState },
      });

      setFormState({
        expenseValue: '',
        expenseAuthor: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'expenseValue' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'expenseValue') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <h3>ADD your expenses</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Total Expenses $ {characterCount}
        
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-6">
          <textarea
            name="expenseValue"
            placeholder="Add Name of the expense."
            value={formState.expenseValue}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-6">
          <input
            type="number"
            name="expenseAuthor"
            placeholder="Add amount for the expense"
            value={formState.expenseAuthor}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-4">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Expense
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;

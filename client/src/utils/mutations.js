import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
  mutation addExpense($expenseValue: String!, $expenseAuthor: String!) {
    addExpense(expenseValue: $expenseValue, expenseAuthor: $expenseAuthor) {
      _id
      expenseValue
      expenseAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

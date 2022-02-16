import { gql } from '@apollo/client';

export const QUERY_EXPENSES = gql`
  query getExpenses {
    expenses {
      _id
      expenseValue
      expenseAuthor
      createdAt
    }
  }
`;

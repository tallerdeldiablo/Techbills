const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Expense {
    _id: ID
    expenseValue: String
    expenseAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type Query {
    expenses: [Expense]!
    expense(expenseId: ID!): Expense
  }

  type Mutation {
    addExpense(expenseValue: String!, expenseAuthor: String!): Expense
    addComment(expenseId: ID!, commentText: String!): Expense
    removeExpense(expenseId: ID!): Expense
    removeComment(expenseId: ID!, commentId: ID!): Expense
  }
`;

module.exports = typeDefs;

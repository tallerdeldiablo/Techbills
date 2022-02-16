const { Expense } = require('../models');

const resolvers = {
  Query: {
    expenses: async () => {
      return Expense.find().sort({ createdAt: -1 });
    },

    expense: async (parent, { expenseId }) => {
      return Expense.findOne({ _id: expenseId });
    },
  },

  Mutation: {
    addExpense: async (parent, { expenseValue, expenseAuthor }) => {
      return Expense.create({ expenseValue, expenseAuthor });
    },
    addComment: async (parent, { expenseId, commentText }) => {
      return Expense.findOneAndUpdate(
        { _id: expenseId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeExpense: async (parent, { expenseId }) => {
      return Expense.findOneAndDelete({ _id: expenseId });
    },
    removeComment: async (parent, { expenseId, commentId }) => {
      return Expense.findOneAndUpdate(
        { _id: expenseId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

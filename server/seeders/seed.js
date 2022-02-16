const db = require('../config/connection');
const { Expense } = require('../models');
const expenseSeeds = require('./expenseSeeds.json');

db.once('open', async () => {
  await Expense.deleteMany({});
  await Expense.create(expenseSeeds);

  console.log('all done!');
  process.exit(0);
});

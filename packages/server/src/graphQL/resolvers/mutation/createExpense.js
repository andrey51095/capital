module.exports = async (_, { input }, context) =>  {
  const {Expense} = context.schemas;

  const expense = new Expense(input);
  return await expense.save();
}
module.exports = async (_, { id }, context) =>  {
  const {Expense} = context.schemas;

  const result = await Expense.findByIdAndDelete(id);
  return !!result;
}
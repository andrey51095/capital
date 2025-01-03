module.exports = async (_, { id }) => {
  const {Income} = context.schemas;

  const result = await Income.findByIdAndDelete(id);
  return !!result;
}
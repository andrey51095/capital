module.exports = async (_, { input }) => {
    const {Income} = context.schemas;

    const income = new Income(input);
    await income.save();
    return income;
  }
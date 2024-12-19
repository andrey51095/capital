module.exports = async (_, { filter }, context) =>  {
    const {Expense} = context.schemas;

    const { startDate, endDate, categories } = filter || {};
    const query = {};

    if (startDate) query.date = { ...query.date, $gte: new Date(startDate) };
    if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
    if (categories && categories.length > 0) query.category = { $in: categories };

    return await Expense.find(query);
}
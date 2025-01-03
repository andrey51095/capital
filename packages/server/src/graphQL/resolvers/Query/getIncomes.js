module.exports = async (_, { filter }) => {
    const {Income} = context.schemas;

    const query = {};
    if (filter && filter.fromDate || filter.toDate) {
      query.date = {};
      if (filter.fromDate) query.date.$gte = new Date(filter.fromDate);
      if (filter.toDate) query.date.$lte = new Date(filter.toDate);
    }
    if (filter && filter.categories) {
      query.category = { $in: filter.categories };
    }
    return Income.find(query).sort({ date: -1 });
  }

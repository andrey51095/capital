const { INVESTED_TAGS } = require("../../../constants");

module.exports = async (_, _args, context, _info) => {
  const {MoneyBundle} = context.schemas;
  const bundles = await MoneyBundle.find({});

  let summaryByCurrency = {};

  bundles.forEach(({ amount, currency, type }) => {
    if (INVESTED_TAGS.includes(type)) return
    summaryByCurrency[currency] = (summaryByCurrency[currency] || 0) + amount
  });

  return Object.entries(summaryByCurrency).map(([currency, amount]) => ({currency, amount}));
}

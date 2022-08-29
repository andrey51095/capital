const moneySummary = require('./money-summary');

module.exports = async (_, args, context, _info) => {
  const { currency, config } = args;

  const summary = await moneySummary(undefined, undefined, context, _info)

  const value = summary.reduce((acc, item) => {
    if (item.currency === currency) {
      return acc + item.amount;
    } else {
      const { exchangeRate = 0 } = config.find((c) => c.currency === item.currency) || {};
      return acc + item.amount * exchangeRate;
    }
  }, 0)

  return value
}

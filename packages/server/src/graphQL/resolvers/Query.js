const {CURRENCY} = require('../../constants');

const moneySummary = async (_, _args, context, _info) => {
  const {MoneyBundle} = context.schemas;
  const bundles = await MoneyBundle.find({});

  let summaryByCurrency = {};

  bundles.forEach(({amount, currency}) => {
    summaryByCurrency[currency] = (summaryByCurrency[currency] || 0) + amount
  });

  return Object.entries(summaryByCurrency).map(([currency, amount]) => ({currency, amount}));
}

const moneyBundles = async (_, _args, context, _info) => {
  const {MoneyBundle} = context.schemas;
  const bundles = await MoneyBundle.find({});

  return bundles;
};

const currencies = () => CURRENCY;

const currencyEquivalent = async (_, args, context, _info) => {
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

module.exports = {
  moneyBundles,
  moneySummary,
  currencies,
  currencyEquivalent,
};

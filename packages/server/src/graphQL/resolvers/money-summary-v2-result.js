const { INVESTED_TAGS } = require("../../constants");

module.exports = {
  total: (bundles) => {

    let summaryByCurrency = {};

    bundles.forEach(({ amount, currency, type }) => {
      summaryByCurrency[currency] = (summaryByCurrency[currency] || 0) + amount
    });

    return Object.entries(summaryByCurrency).map(([currency, amount]) => ({currency, amount}));
  },

  notInvested: (bundles) => {
    let summaryByCurrency = {};

    bundles.forEach(({ amount, currency, type }) => {
      if (INVESTED_TAGS.includes(type)) return
      summaryByCurrency[currency] = (summaryByCurrency[currency] || 0) + amount
    });

    return Object.entries(summaryByCurrency).map(([currency, amount]) => ({currency, amount}));
  },

  invested: (bundles) => {
    let summaryByCurrency = {};

    bundles.forEach(({ amount, currency, type }) => {
      if (!INVESTED_TAGS.includes(type)) return
      summaryByCurrency[currency] = (summaryByCurrency[currency] || 0) + amount
    });

    return Object.entries(summaryByCurrency).map(([currency, amount]) => ({currency, amount}));
  }
};

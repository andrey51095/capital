// moneySummaryFunctions.test.js
const { total, notInvested, invested } = require('../moneySummaryFunctions');
const { INVESTED_TAGS } = require('../../constants');

describe('Money Summary Functions', () => {
  const mockBundles = [
    { amount: 1000, currency: 'USD', type: 'Income' },
    { amount: 500, currency: 'USD', type: 'Investment' },
    { amount: 200, currency: 'EUR', type: 'Income' },
    { amount: 300, currency: 'EUR', type: 'Expense' },
    { amount: 500, currency: 'EUR', type: 'Investment' },
  ];

  describe('total', () => {
    it('should return total amounts grouped by currency', () => {
      const result = total(mockBundles);
      expect(result).toEqual([
        { currency: 'USD', amount: 1500 },
        { currency: 'EUR', amount: 1000 },
      ]);
    });

    it('should return empty array when no bundles are passed', () => {
      const result = total([]);
      expect(result).toEqual([]);
    });
  });

  describe('notInvested', () => {
    it('should return total amounts excluding invested types grouped by currency', () => {
      const result = notInvested(mockBundles);
      expect(result).toEqual([
        { currency: 'USD', amount: 1000 },
        { currency: 'EUR', amount: 500 },
      ]);
    });

    it('should return empty array when no bundles are passed', () => {
      const result = notInvested([]);
      expect(result).toEqual([]);
    });

    it('should exclude bundles with invested types', () => {
      const investedBundles = [
        { amount: 1000, currency: 'USD', type: 'Investment' },
        { amount: 200, currency: 'USD', type: 'Income' },
      ];
      const result = notInvested(investedBundles);
      expect(result).toEqual([{ currency: 'USD', amount: 200 }]);
    });
  });

  describe('invested', () => {
    it('should return total amounts of invested types grouped by currency', () => {
      const result = invested(mockBundles);
      expect(result).toEqual([
        { currency: 'USD', amount: 500 },
        { currency: 'EUR', amount: 500 },
      ]);
    });

    it('should return empty array when no bundles are passed', () => {
      const result = invested([]);
      expect(result).toEqual([]);
    });

    it('should only include bundles with invested types', () => {
      const investedBundles = [
        { amount: 1000, currency: 'USD', type: 'Investment' },
        { amount: 500, currency: 'USD', type: 'Income' },
      ];
      const result = invested(investedBundles);
      expect(result).toEqual([{ currency: 'USD', amount: 1000 }]);
    });
  });
});

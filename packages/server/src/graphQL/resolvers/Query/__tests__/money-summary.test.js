// getMoneySummary.test.js
const getMoneySummary = require('../get-money-summary');
const { INVESTED_TAGS } = require('../../../constants');

describe('getMoneySummary', () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      schemas: {
        MoneyBundle: {
          find: jest.fn().mockResolvedValue([]),
        },
      },
    };
  });

  it('should return a summary of money bundles grouped by currency', async () => {
    const mockBundles = [
      { amount: 1000, currency: 'USD', type: 'Investment' },
      { amount: 500, currency: 'USD', type: 'Income' },
      { amount: 300, currency: 'EUR', type: 'Income' },
      { amount: 200, currency: 'EUR', type: 'Expense' },
    ];

    mockContext.schemas.MoneyBundle.find.mockResolvedValue(mockBundles);

    const result = await getMoneySummary(null, null, mockContext);

    expect(mockContext.schemas.MoneyBundle.find).toHaveBeenCalledWith({});
    expect(result).toEqual([
      { currency: 'USD', amount: 500 },
      { currency: 'EUR', amount: 500 },
    ]);
  });

  it('should exclude bundles with invested type', async () => {
    const mockBundles = [
      { amount: 1000, currency: 'USD', type: 'Investment' },
      { amount: 500, currency: 'USD', type: 'Income' },
      { amount: 300, currency: 'EUR', type: 'Income' },
      { amount: 200, currency: 'EUR', type: 'Expense' },
    ];

    mockContext.schemas.MoneyBundle.find.mockResolvedValue(mockBundles);

    const result = await getMoneySummary(null, null, mockContext);

    expect(mockContext.schemas.MoneyBundle.find).toHaveBeenCalledWith({});
    expect(result).toEqual([
      { currency: 'USD', amount: 500 },
      { currency: 'EUR', amount: 500 },
    ]);
  });

  it('should return an empty array if no bundles exist', async () => {
    mockContext.schemas.MoneyBundle.find.mockResolvedValue([]);

    const result = await getMoneySummary(null, null, mockContext);

    expect(mockContext.schemas.MoneyBundle.find).toHaveBeenCalledWith({});
    expect(result).toEqual([]);
  });

  it('should handle database errors gracefully', async () => {
    mockContext.schemas.MoneyBundle.find.mockRejectedValue(new Error('Database error'));

    await expect(getMoneySummary(null, null, mockContext)).rejects.toThrow('Database error');
  });
});

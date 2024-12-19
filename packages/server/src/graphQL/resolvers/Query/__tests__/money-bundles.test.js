// getActiveMoneyBundles.test.js
const getActiveMoneyBundles = require('../get-active-money-bundles');

describe('getActiveMoneyBundles', () => {
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

  it('should return active money bundles with deletedAt: 0', async () => {
    const mockBundles = [
      { id: 1, amount: 1000, currency: 'USD', deletedAt: 0 },
      { id: 2, amount: 500, currency: 'EUR', deletedAt: 0 },
    ];
    mockContext.schemas.MoneyBundle.find.mockResolvedValue(mockBundles);

    const result = await getActiveMoneyBundles(null, null, mockContext);

    expect(mockContext.schemas.MoneyBundle.find).toHaveBeenCalledWith({ deletedAt: 0 });
    expect(result).toEqual(mockBundles);
  });

  it('should return an empty array if no active bundles are found', async () => {
    mockContext.schemas.MoneyBundle.find.mockResolvedValue([]);

    const result = await getActiveMoneyBundles(null, null, mockContext);

    expect(mockContext.schemas.MoneyBundle.find).toHaveBeenCalledWith({ deletedAt: 0 });
    expect(result).toEqual([]);
  });

  it('should handle database errors gracefully', async () => {
    mockContext.schemas.MoneyBundle.find.mockRejectedValue(new Error('Database error'));

    await expect(getActiveMoneyBundles(null, null, mockContext)).rejects.toThrow('Database error');
  });
});

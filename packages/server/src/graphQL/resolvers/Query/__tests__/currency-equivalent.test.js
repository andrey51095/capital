// calculateMoneySummary.test.js
const calculateMoneySummary = require('../calculate-money-summary');
const moneySummary = require('../money-summary');

jest.mock('../money-summary', () => jest.fn());

describe('calculateMoneySummary', () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      schemas: {
        MoneyBundle: {
          findOne: jest.fn(),
        },
      },
    };
  });

  it('should calculate total value for specified currency', async () => {
    const mockArgs = {
      currency: 'USD',
      config: [
        { currency: 'USD', exchangeRate: 1 },
        { currency: 'EUR', exchangeRate: 0.85 },
      ],
    };

    const mockSummary = [
      { currency: 'USD', amount: 1000 },
      { currency: 'EUR', amount: 1000 },
    ];

    moneySummary.mockResolvedValue(mockSummary);

    const result = await calculateMoneySummary(null, mockArgs, mockContext);

    // Ensure the summary was fetched
    expect(moneySummary).toHaveBeenCalledWith(undefined, undefined, mockContext, undefined);

    // Ensure correct value calculation for USD
    expect(result).toBe(1000 + 1000 * 0.85); // 1000 USD + 1000 EUR * 0.85 exchange rate
  });

  it('should calculate total value when no exchange rate is provided in config', async () => {
    const mockArgs = {
      currency: 'USD',
      config: [
        { currency: 'USD', exchangeRate: 1 },
      ],
    };

    const mockSummary = [
      { currency: 'USD', amount: 1000 },
      { currency: 'EUR', amount: 1000 },
    ];

    moneySummary.mockResolvedValue(mockSummary);

    const result = await calculateMoneySummary(null, mockArgs, mockContext);

    // Ensure the summary was fetched
    expect(moneySummary).toHaveBeenCalledWith(undefined, undefined, mockContext, undefined);

    // Ensure fallback to 0 for EUR as exchangeRate is not defined
    expect(result).toBe(1000 + 1000 * 0); // 1000 USD + 1000 EUR * 0 exchange rate
  });

  it('should calculate total value for another specified currency with exchange rate', async () => {
    const mockArgs = {
      currency: 'EUR',
      config: [
        { currency: 'USD', exchangeRate: 1 },
        { currency: 'EUR', exchangeRate: 1 },
      ],
    };

    const mockSummary = [
      { currency: 'USD', amount: 1000 },
      { currency: 'EUR', amount: 1000 },
    ];

    moneySummary.mockResolvedValue(mockSummary);

    const result = await calculateMoneySummary(null, mockArgs, mockContext);

    // Ensure the summary was fetched
    expect(moneySummary).toHaveBeenCalledWith(undefined, undefined, mockContext, undefined);

    // Ensure correct value calculation for EUR
    expect(result).toBe(1000 * 1 + 1000); // 1000 USD * 1 exchange rate + 1000 EUR
  });

  it('should throw an error if summary data is empty', async () => {
    const mockArgs = {
      currency: 'USD',
      config: [
        { currency: 'USD', exchangeRate: 1 },
      ],
    };

    moneySummary.mockResolvedValue([]);

    await expect(calculateMoneySummary(null, mockArgs, mockContext)).rejects.toThrowError('No money summary available');
  });

  it('should handle undefined currency gracefully', async () => {
    const mockArgs = {
      currency: undefined,
      config: [
        { currency: 'USD', exchangeRate: 1 },
        { currency: 'EUR', exchangeRate: 0.85 },
      ],
    };

    const mockSummary = [
      { currency: 'USD', amount: 1000 },
      { currency: 'EUR', amount: 1000 },
    ];

    moneySummary.mockResolvedValue(mockSummary);

    const result = await calculateMoneySummary(null, mockArgs, mockContext);

    // Ensure the summary was fetched
    expect(moneySummary).toHaveBeenCalledWith(undefined, undefined, mockContext, undefined);

    // Ensure correct total value calculation when currency is undefined
    expect(result).toBe(1000 + 1000 * 0.85); // 1000 USD + 1000 EUR * 0.85 exchange rate
  });
});

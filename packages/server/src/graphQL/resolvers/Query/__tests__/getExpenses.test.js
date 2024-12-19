// getFilteredExpenses.test.js
const getFilteredExpenses = require('../get-filtered-expenses');

describe('getFilteredExpenses', () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      schemas: {
        Expense: {
          find: jest.fn().mockResolvedValue([]),
        },
      },
    };
  });

  it('should return expenses filtered by startDate and endDate', async () => {
    const mockArgs = {
      filter: {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      },
    };

    const mockExpenses = [{ id: 1, date: '2024-01-15', amount: 100 }];
    mockContext.schemas.Expense.find.mockResolvedValue(mockExpenses);

    const result = await getFilteredExpenses(null, mockArgs, mockContext);

    // Ensure the query includes the date range
    expect(mockContext.schemas.Expense.find).toHaveBeenCalledWith({
      date: { $gte: new Date('2024-01-01'), $lte: new Date('2024-01-31') },
    });

    expect(result).toEqual(mockExpenses);
  });

  it('should return expenses filtered by categories', async () => {
    const mockArgs = {
      filter: {
        categories: ['Food', 'Transport'],
      },
    };

    const mockExpenses = [{ id: 1, category: 'Food', amount: 50 }];
    mockContext.schemas.Expense.find.mockResolvedValue(mockExpenses);

    const result = await getFilteredExpenses(null, mockArgs, mockContext);

    // Ensure the query includes the category filter
    expect(mockContext.schemas.Expense.find).toHaveBeenCalledWith({
      category: { $in: ['Food', 'Transport'] },
    });

    expect(result).toEqual(mockExpenses);
  });

  it('should return expenses with both date and category filters', async () => {
    const mockArgs = {
      filter: {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        categories: ['Food'],
      },
    };

    const mockExpenses = [{ id: 1, category: 'Food', date: '2024-01-15', amount: 100 }];
    mockContext.schemas.Expense.find.mockResolvedValue(mockExpenses);

    const result = await getFilteredExpenses(null, mockArgs, mockContext);

    // Ensure the query includes both date range and category filters
    expect(mockContext.schemas.Expense.find).toHaveBeenCalledWith({
      date: { $gte: new Date('2024-01-01'), $lte: new Date('2024-01-31') },
      category: { $in: ['Food'] },
    });

    expect(result).toEqual(mockExpenses);
  });

  it('should return all expenses when no filters are provided', async () => {
    const mockArgs = {
      filter: {},
    };

    const mockExpenses = [
      { id: 1, category: 'Food', amount: 50 },
      { id: 2, category: 'Transport', amount: 30 },
    ];
    mockContext.schemas.Expense.find.mockResolvedValue(mockExpenses);

    const result = await getFilteredExpenses(null, mockArgs, mockContext);

    // Ensure no filters are applied to the query
    expect(mockContext.schemas.Expense.find).toHaveBeenCalledWith({});

    expect(result).toEqual(mockExpenses);
  });

  it('should handle invalid filter formats gracefully', async () => {
    const mockArgs = {
      filter: {
        startDate: 'invalid-date',
        endDate: 'invalid-date',
      },
    };

    await expect(getFilteredExpenses(null, mockArgs, mockContext)).rejects.toThrowError('Invalid date format');
  });
});

// createExpense.test.js
const createExpense = require('../createExpense');

describe('createExpense', () => {
  let mockExpense;
  let context;

  beforeEach(() => {
    mockExpense = {
      save: jest.fn(),
    };

    context = {
      schemas: {
        Expense: mockExpense,
      },
    };
  });

  it('should create and save a new Expense', async () => {
    const mockExpenseData = { amount: 100, description: 'Test Expense' };
    mockExpense.save.mockResolvedValue(mockExpenseData);

    const args = { input: mockExpenseData };

    const result = await createExpense(null, args, context);

    expect(mockExpense.save).toHaveBeenCalledWith();
    expect(mockExpense.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockExpenseData);
  });

  it('should handle errors during saving Expense', async () => {
    const errorMessage = 'Error saving Expense';
    mockExpense.save.mockRejectedValue(new Error(errorMessage));

    const args = { input: { amount: 100, description: 'Test Expense' } };

    await expect(createExpense(null, args, context)).rejects.toThrow(errorMessage);
  });
});

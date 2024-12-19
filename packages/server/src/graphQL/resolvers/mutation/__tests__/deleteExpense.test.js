// deleteExpense.test.js
const deleteExpense = require('../deleteExpense');

describe('deleteExpense', () => {
  let mockExpense;
  let context;

  beforeEach(() => {
    mockExpense = {
      findByIdAndDelete: jest.fn(),
    };

    context = {
      schemas: {
        Expense: mockExpense,
      },
    };
  });

  it('should delete an existing Expense and return true', async () => {
    const mockId = '123';
    const mockDeletedExpense = { id: mockId };

    mockExpense.findByIdAndDelete.mockResolvedValue(mockDeletedExpense);

    const args = { id: mockId };

    const result = await deleteExpense(null, args, context);

    expect(mockExpense.findByIdAndDelete).toHaveBeenCalledWith(mockId);
    expect(result).toBe(true);
  });

  it('should return false if no Expense is found', async () => {
    const mockId = '123';

    mockExpense.findByIdAndDelete.mockResolvedValue(null);

    const args = { id: mockId };

    const result = await deleteExpense(null, args, context);

    expect(mockExpense.findByIdAndDelete).toHaveBeenCalledWith(mockId);
    expect(result).toBe(false);
  });

  it('should handle errors during Expense deletion', async () => {
    const mockId = '123';

    mockExpense.findByIdAndDelete.mockRejectedValue(new Error('Error deleting Expense'));

    const args = { id: mockId };

    await expect(deleteExpense(null, args, context)).rejects.toThrow('Error deleting Expense');
  });
});

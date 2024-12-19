// deleteMoneyBundle.test.js
const deleteMoneyBundle = require('../deleteMoneyBundle');

describe('deleteMoneyBundle', () => {
  let mockMoneyBundle;
  let mockFeed;
  let context;

  beforeEach(() => {
    mockMoneyBundle = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    };

    mockFeed = {
      create: jest.fn(),
    };

    context = {
      schemas: {
        MoneyBundle: mockMoneyBundle,
        Feed: mockFeed,
      },
    };
  });

  it('should delete an existing MoneyBundle and create a Feed entry', async () => {
    const mockId = '123';
    const mockOldDoc = { id: mockId, deletedAt: null };
    const mockNewDoc = { id: mockId, deletedAt: Date.now() };

    mockMoneyBundle.findOne.mockResolvedValue(mockOldDoc);
    mockMoneyBundle.findOneAndUpdate.mockResolvedValue(mockNewDoc);

    const args = { id: mockId };

    const result = await deleteMoneyBundle(null, args, context);

    expect(mockMoneyBundle.findOne).toHaveBeenCalledWith({ id: mockId });
    expect(mockMoneyBundle.findOneAndUpdate).toHaveBeenCalledWith({ id: mockId }, { deletedAt: expect.any(Number) }, { new: true });
    expect(mockFeed.create).toHaveBeenCalledWith({ from: JSON.stringify(mockOldDoc), to: JSON.stringify(mockNewDoc) });
    expect(result).toEqual(mockNewDoc);
  });

  it('should throw an error if MoneyBundle is already deleted', async () => {
    const mockId = '123';
    const mockOldDoc = { id: mockId, deletedAt: Date.now() };

    mockMoneyBundle.findOne.mockResolvedValue(mockOldDoc);

    const args = { id: mockId };

    await expect(deleteMoneyBundle(null, args, context)).rejects.toThrow('Already deleted');
  });

  it('should handle errors during MoneyBundle update', async () => {
    const mockId = '123';
    const mockOldDoc = { id: mockId, deletedAt: null };

    mockMoneyBundle.findOne.mockResolvedValue(mockOldDoc);
    mockMoneyBundle.findOneAndUpdate.mockRejectedValue(new Error('Error updating MoneyBundle'));

    const args = { id: mockId };

    await expect(deleteMoneyBundle(null, args, context)).rejects.toThrow('Error updating MoneyBundle');
  });
});

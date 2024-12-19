const restoreBackup = require('../populate');

describe('restoreBackup', () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      schemas: {
        MoneyBundle: {
          deleteMany: jest.fn(),
          insertMany: jest.fn(),
        },
        Feed: {
          deleteMany: jest.fn(),
          insertMany: jest.fn(),
        },
      },
    };
  });

  it('should restore data from backup successfully', async () => {
    const mockBackupData = {
      MoneyBundle: [{ id: '1', amount: 1000, currency: 'USD' }],
      Feed: [{ id: '2', content: 'Feed content' }],
    };

    const args = { data: JSON.stringify(mockBackupData) };

    await restoreBackup(null, args, mockContext);

    // Ensure delete and insert operations are called
    expect(mockContext.schemas.MoneyBundle.deleteMany).toHaveBeenCalled();
    expect(mockContext.schemas.MoneyBundle.insertMany).toHaveBeenCalledWith(mockBackupData.MoneyBundle);
    expect(mockContext.schemas.Feed.deleteMany).toHaveBeenCalled();
    expect(mockContext.schemas.Feed.insertMany).toHaveBeenCalledWith(mockBackupData.Feed);
  });

  it('should throw an error if invalid data is provided', async () => {
    const args = { data: 'invalid data' };

    await expect(restoreBackup(null, args, mockContext)).rejects.toThrow(SyntaxError);
  });

  it('should handle errors during insertMany operation', async () => {
    const mockBackupData = {
      MoneyBundle: [{ id: '1', amount: 1000, currency: 'USD' }],
    };

    const args = { data: JSON.stringify(mockBackupData) };

    mockContext.schemas.MoneyBundle.insertMany.mockRejectedValue(new Error('Insert failed'));

    await expect(restoreBackup(null, args, mockContext)).rejects.toThrow('Insert failed');
  });
});

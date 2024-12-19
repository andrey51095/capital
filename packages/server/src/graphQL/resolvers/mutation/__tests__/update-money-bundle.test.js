// updateMoneyBundle.test.js
const updateMoneyBundle = require('../updateMoneyBundle');
const createMoneyBundle = require('../create-money-bundle');

jest.mock('../create-money-bundle', () => jest.fn());

describe('updateMoneyBundle', () => {
  let mockContext;
  let mockMoneyBundleModel;
  let mockFeedModel;

  beforeEach(() => {
    mockMoneyBundleModel = {
      findOneAndUpdate: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
    };
    mockFeedModel = { create: jest.fn() };
    
    mockContext = {
      schemas: {
        MoneyBundle: mockMoneyBundleModel,
        Feed: mockFeedModel,
      },
    };
  });

  it('should update MoneyBundle and create Feed item', async () => {
    const mockArgs = {
      id: '1',
      transfer: [],
      amount: 500,
      currency: 'USD',
    };
    
    const mockOldDoc = { id: '1', amount: 1000, currency: 'USD' };
    const mockNewDoc = { id: '1', amount: 500, currency: 'USD' };

    mockMoneyBundleModel.findOneAndUpdate.mockResolvedValue(mockOldDoc);
    mockMoneyBundleModel.findOne.mockResolvedValue(mockNewDoc);

    const result = await updateMoneyBundle(null, mockArgs, mockContext);

    // Ensure that MoneyBundle was updated
    expect(mockMoneyBundleModel.findOneAndUpdate).toHaveBeenCalledWith({ id: '1' }, expect.objectContaining({ updatedAt: expect.any(Number) }));
    expect(mockMoneyBundleModel.findOne).toHaveBeenCalledWith({ id: '1' });

    // Ensure Feed item was created
    expect(mockFeedModel.create).toHaveBeenCalledWith(expect.objectContaining({
      from: JSON.stringify(mockOldDoc),
      to: JSON.stringify(mockNewDoc),
    }));

    // Ensure correct result is returned
    expect(result).toEqual(mockNewDoc);
  });

  it('should transfer funds to another MoneyBundle', async () => {
    const mockArgs = {
      id: '1',
      transfer: [{ id: '2', amount: 300 }],
      amount: 500,
      currency: 'USD',
    };

    const mockOldDoc = { id: '1', amount: 1000, currency: 'USD' };
    const mockNewDoc = { id: '1', amount: 500, currency: 'USD' };
    const mockTransferredDoc = { id: '2', amount: 300, currency: 'USD' };

    mockMoneyBundleModel.findOneAndUpdate.mockResolvedValue(mockOldDoc);
    mockMoneyBundleModel.findOne.mockResolvedValue(mockNewDoc);
    mockMoneyBundleModel.updateOne.mockResolvedValue(mockTransferredDoc);
    createMoneyBundle.mockResolvedValue(mockTransferredDoc);

    const result = await updateMoneyBundle(null, mockArgs, mockContext);

    // Ensure transfer to another MoneyBundle is processed
    expect(mockMoneyBundleModel.updateOne).toHaveBeenCalledWith(
      { id: '2' },
      { amount: 600, updatedAt: expect.any(Number) },
      { new: true }
    );

    // Ensure new Feed item is created with transfer details
    expect(mockFeedModel.create).toHaveBeenCalledWith(expect.objectContaining({
      from: JSON.stringify(mockOldDoc),
      to: JSON.stringify(mockNewDoc),
      transferredTo: JSON.stringify([{ id: '2', amount: 600 }]),
    }));

    expect(result).toEqual(mockNewDoc);
  });

  it('should create a new MoneyBundle if transfer ID is not provided', async () => {
    const mockArgs = {
      id: '1',
      transfer: [{ amount: 300 }],
      amount: 500,
      currency: 'USD',
    };

    const mockOldDoc = { id: '1', amount: 1000, currency: 'USD' };
    const mockNewDoc = { id: '1', amount: 500, currency: 'USD' };
    const mockCreatedMoneyTransfer = { id: '3', amount: 300 };

    mockMoneyBundleModel.findOneAndUpdate.mockResolvedValue(mockOldDoc);
    mockMoneyBundleModel.findOne.mockResolvedValue(mockNewDoc);
    createMoneyBundle.mockResolvedValue(mockCreatedMoneyTransfer);

    const result = await updateMoneyBundle(null, mockArgs, mockContext);

    // Ensure that a new MoneyBundle is created when transfer has no ID
    expect(createMoneyBundle).toHaveBeenCalledWith(null, expect.objectContaining({ amount: 300, currency: 'USD' }), mockContext, null);

    // Ensure new Feed item is created with transfer details
    expect(mockFeedModel.create).toHaveBeenCalledWith(expect.objectContaining({
      from: JSON.stringify(mockOldDoc),
      to: JSON.stringify(mockNewDoc),
      transferredTo: JSON.stringify([{ id: '3', amount: 300 }]),
    }));

    expect(result).toEqual(mockNewDoc);
  });

  it('should throw an error if transfer amount exceeds available funds', async () => {
    const mockArgs = {
      id: '1',
      transfer: [{ id: '2', amount: 1200 }],
      amount: 500,
      currency: 'USD',
    };

    const mockOldDoc = { id: '1', amount: 1000, currency: 'USD' };
    mockMoneyBundleModel.findOneAndUpdate.mockResolvedValue(mockOldDoc);

    await expect(updateMoneyBundle(null, mockArgs, mockContext)).rejects.toThrowError('Insufficient funds');
  });

  it('should throw an error if MoneyBundle not found', async () => {
    const mockArgs = { id: '999', transfer: [], amount: 500, currency: 'USD' };

    mockMoneyBundleModel.findOneAndUpdate.mockResolvedValue(null);

    await expect(updateMoneyBundle(null, mockArgs, mockContext)).rejects.toThrowError('MoneyBundle not found');
  });
});

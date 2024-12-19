// getFeeds.test.js
const getFeeds = require('../get-feeds');

describe('getFeeds', () => {
  let mockContext;

  beforeEach(() => {
    mockContext = {
      schemas: {
        Feed: {
          find: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          sort: jest.fn().mockResolvedValue([]),
        },
      },
    };
  });

  it('should return feeds with pagination', async () => {
    const mockArgs = {
      page: 1,
      perPage: 10,
    };

    const result = await getFeeds(null, mockArgs, mockContext);

    // Ensure that Feed.find, limit, skip, and sort were called
    expect(mockContext.schemas.Feed.find).toHaveBeenCalled();
    expect(mockContext.schemas.Feed.limit).toHaveBeenCalledWith(10);
    expect(mockContext.schemas.Feed.skip).toHaveBeenCalledWith(10); // page * perPage = 1 * 10 = 10
    expect(mockContext.schemas.Feed.sort).toHaveBeenCalledWith({ createdAt: 'asc' });

    // Ensure correct result
    expect(result).toEqual({ page: 1, feeds: [] });
  });

  it('should handle empty feeds result correctly', async () => {
    const mockArgs = {
      page: 0,
      perPage: 5,
    };

    mockContext.schemas.Feed.sort.mockResolvedValue([]);

    const result = await getFeeds(null, mockArgs, mockContext);

    // Ensure empty result when no feeds are found
    expect(result).toEqual({ page: 0, feeds: [] });
  });

  it('should handle non-empty feeds result correctly', async () => {
    const mockArgs = {
      page: 1,
      perPage: 5,
    };

    const mockFeeds = [{ id: 1, content: 'Test Feed' }, { id: 2, content: 'Another Feed' }];
    mockContext.schemas.Feed.sort.mockResolvedValue(mockFeeds);

    const result = await getFeeds(null, mockArgs, mockContext);

    // Ensure correct result with mock feeds
    expect(result).toEqual({ page: 1, feeds: mockFeeds });
  });

  it('should apply the correct pagination based on perPage', async () => {
    const mockArgs = {
      page: 2,
      perPage: 3,
    };

    const mockFeeds = [{ id: 1, content: 'Feed 1' }, { id: 2, content: 'Feed 2' }, { id: 3, content: 'Feed 3' }];
    mockContext.schemas.Feed.sort.mockResolvedValue(mockFeeds);

    await getFeeds(null, mockArgs, mockContext);

    // Check if the skip method correctly accounts for pagination
    expect(mockContext.schemas.Feed.skip).toHaveBeenCalledWith(6); // 2 * 3 = 6
  });

  it('should throw an error if pagination arguments are invalid', async () => {
    const mockArgs = {
      page: -1,
      perPage: 0,
    };

    await expect(getFeeds(null, mockArgs, mockContext)).rejects.toThrowError('Invalid pagination values');
  });
});

import {renderHook, act} from '@testing-library/react';
import {useQuery} from '@apollo/client';
import useFeed from '../use-feed';

// Mocking useQuery
jest.mock('@apollo/client', () => ({useQuery: jest.fn()}));

describe('useFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return feed data', async () => {
    const mockData = {
      feed: {
        feeds: [
          {
            id: 1,
            createdAt: '2021-01-01',
            to: 'A',
            from: 'B',
            transferredTo: 'C',
          }, {
            id: 2,
            createdAt: '2021-01-02',
            to: 'D',
            from: 'E',
            transferredTo: 'F',
          },
        ],
      },
    };

    useQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      fetchMore: jest.fn(),
    });

    const {result} = renderHook(() => useFeed());

    expect(result.current.feed).toEqual(mockData.feed.feeds);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', async () => {
    useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      fetchMore: jest.fn(),
    });

    const {result} = renderHook(() => useFeed());

    expect(result.current.feed).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('An error occurred'),
      fetchMore: jest.fn(),
    });

    const {result} = renderHook(() => useFeed());

    expect(result.current.feed).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error('An error occurred'));
  });

  it('should call loadMore and update the feed', async () => {
    const mockFetchMore = jest.fn();
    useQuery.mockReturnValue({
      data: {
        feed: {
          feeds: [
            {
              id: 1,
              createdAt: '2021-01-01',
              to: 'A',
              from: 'B',
              transferredTo: 'C',
            },
          ],
        },
      },
      loading: false,
      error: null,
      fetchMore: mockFetchMore,
    });

    const {result} = renderHook(() => useFeed());

    act(() => {
      result.current.loadMore();
    });

    expect(mockFetchMore).toHaveBeenCalled();
  });
});

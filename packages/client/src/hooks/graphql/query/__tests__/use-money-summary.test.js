import {renderHook, act} from '@testing-library/react';
import {useQuery} from '@apollo/client';
import useMoneySummary from '../use-money-summary';

// Mocking useQuery
jest.mock('@apollo/client', () => ({useQuery: jest.fn()}));

describe('useMoneySummary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return money summary data', async () => {
    const mockData = {
      summary: [
        {
          amount: 1000,
          currency: 'USD',
        }, {
          amount: 2000,
          currency: 'EUR',
        },
      ],
    };

    useQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const {result} = renderHook(() => useMoneySummary());

    expect(result.current.summary).toEqual(mockData.summary);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', async () => {
    useQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    const {result} = renderHook(() => useMoneySummary());

    expect(result.current.summary).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('An error occurred'),
      refetch: jest.fn(),
    });

    const {result} = renderHook(() => useMoneySummary());

    expect(result.current.summary).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error('An error occurred'));
  });

  it('should call refetch function', async () => {
    const mockRefetch = jest.fn();
    useQuery.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    const {result} = renderHook(() => useMoneySummary());

    act(() => {
      result.current.refetch();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });
});

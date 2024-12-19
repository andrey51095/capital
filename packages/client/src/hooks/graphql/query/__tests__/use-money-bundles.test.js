import {renderHook, act} from '@testing-library/react';
import {useQuery} from '@apollo/client';
import useMoneyBundles from '../use-money-bundles';

// Mocking useQuery
jest.mock('@apollo/client', () => ({useQuery: jest.fn()}));

describe('useMoneyBundles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return moneyBundles data', async () => {
    const mockData = {
      moneyBundles: [
        {
          id: 1,
          currency: 'USD',
          description: 'Bundle 1',
          amount: 100,
          storage: 'Storage 1',
          type: 'Type 1',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01',
          deletedAt: null,
        }, {
          id: 2,
          currency: 'EUR',
          description: 'Bundle 2',
          amount: 200,
          storage: 'Storage 2',
          type: 'Type 2',
          createdAt: '2021-01-02',
          updatedAt: '2021-01-02',
          deletedAt: null,
        },
      ],
    };

    useQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const {result} = renderHook(() => useMoneyBundles());

    expect(result.current.moneyBundles).toEqual(mockData.moneyBundles);
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

    const {result} = renderHook(() => useMoneyBundles());

    expect(result.current.moneyBundles).toEqual([]);
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

    const {result} = renderHook(() => useMoneyBundles());

    expect(result.current.moneyBundles).toEqual([]);
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

    const {result} = renderHook(() => useMoneyBundles());

    act(() => {
      result.current.refetch();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });
});

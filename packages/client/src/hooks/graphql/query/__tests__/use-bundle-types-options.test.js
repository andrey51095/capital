import {renderHook, act} from '@testing-library/react';
import {useQuery} from '@apollo/client';
import useBundleTypesOptions from '../use-bundle-types-options';

// Mocking useQuery
jest.mock('@apollo/client', () => ({useQuery: jest.fn()}));

describe('useBundleTypesOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return typesOptions from data', async () => {
    const mockData = {
      types: [
        {
          id: 1,
          label: 'Type 1',
        }, {
          id: 2,
          label: 'Type 2',
        },
      ],
    };
    useQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    const {result} = renderHook(() => useBundleTypesOptions());

    expect(result.current.typesOptions).toEqual(mockData.types);
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

    const {result} = renderHook(() => useBundleTypesOptions());

    expect(result.current.typesOptions).toEqual([]);
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

    const {result} = renderHook(() => useBundleTypesOptions());

    expect(result.current.typesOptions).toEqual([]);
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

    const {result} = renderHook(() => useBundleTypesOptions());

    act(() => {
      result.current.refetch();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });
});

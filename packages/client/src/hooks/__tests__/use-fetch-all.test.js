import {renderHook, waitFor} from '@testing-library/react';
import useFetchAll from '../use-fetch-all';
import useLazyFetch from '../use-lazy-fetch';

// Mocking useLazyFetch
jest.mock('../use-lazy-fetch');

describe('useFetchAll', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should handle multiple successful fetches', async () => {
    // Mocking the getData function to return specific data
    useLazyFetch.mockReturnValue([jest.fn().mockResolvedValue({data: 'test'})]);

    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];

    const {result} = renderHook(() => useFetchAll(urls));

    // Initially, the loading state should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    // After the fetch, loading should be false and data should contain the results
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual([{data: 'test'}, {data: 'test'}]);
  });

  it('should set loading to false after all fetches are complete', async () => {
    useLazyFetch.mockReturnValue([jest.fn().mockResolvedValue({data: 'test'})]);

    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];

    const {result} = renderHook(() => useFetchAll(urls));

    // Initially loading is true
    expect(result.current.loading).toBe(true);

    // After fetch, loading should be false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle empty URLs array gracefully', async () => {
    useLazyFetch.mockReturnValue([jest.fn().mockResolvedValue({data: 'test'})]);

    const urls = [];

    const {result} = renderHook(() => useFetchAll(urls));

    // Initially, loading should be true
    expect(result.current.loading).toBe(true);

    // After the "fetch", loading should be false and data should be empty
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual([]);
  });
});

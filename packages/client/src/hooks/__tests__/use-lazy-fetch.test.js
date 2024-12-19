import {renderHook, act, waitFor} from '@testing-library/react';
import useLazyFetch from '../use-lazy-fetch';

// Mocking fetch
global.fetch = jest.fn();

describe('useLazyFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should start with loading state', async () => {
    fetch.mockResolvedValueOnce({json: async () => ({data: 'test'})});

    const {result} = renderHook(() => useLazyFetch('https://api.example.com'));

    // Initially loading should be true, and data/error should be null
    expect(result.current[1].loading).toBe(false);
    expect(result.current[1].data).toBeNull();
    expect(result.current[1].error).toBeNull();

    // Trigger fetch
    act(() => {
      result.current[0]();
    });

    // After fetch completes, loading should be false
    expect(result.current[1].loading).toBe(true);
    await waitFor(() => {
      expect(result.current[1].loading).toBe(false);
    });
  });

  it('should set data after successful fetch', async () => {
    fetch.mockResolvedValueOnce({json: async () => ({data: 'test'})});

    const {result} = renderHook(() => useLazyFetch('https://api.example.com'));

    await act(async () => {
      await result.current[0]();
    });

    // Check if data is set correctly after fetch
    expect(result.current[1].data).toEqual({data: 'test'});
  });

  it('should set error if fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const {result} = renderHook(() => useLazyFetch('https://api.example.com'));

    await act(async () => {
      await result.current[0]();
    });

    // Check if error state is set
    expect(result.current[1].error).toEqual(new Error('Network error'));
  });

  it('should handle fetch with custom options', async () => {
    fetch.mockResolvedValueOnce({json: async () => ({data: 'custom test'})});

    const {result} = renderHook(() => useLazyFetch('https://api.example.com', {method: 'POST'}));

    await act(async () => {
      await result.current[0]();
    });

    // Check if the custom fetch options are passed correctly
    expect(result.current[1].data).toEqual({data: 'custom test'});
  });
});

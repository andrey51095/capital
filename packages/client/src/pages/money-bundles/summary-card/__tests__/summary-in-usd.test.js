import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SummaryInUsd from '../SummaryInUsd'; // Adjust import based on file structure
import { useLazyFetch } from '../../../hooks';
import { toaster } from 'baseui/toast';

// Mocking the `useLazyFetch` hook
jest.mock('../../../hooks', () => ({
  useLazyFetch: jest.fn(),
}));

// Mock the Currency component for testing purposes
jest.mock('../../../components/currency', () => ({
  Currency: ({ value }) => <span>{value}</span>,
}));

describe('SummaryInUsd Component', () => {
  const mockSummary = [
    { currency: 'USD', amount: 100 },
    { currency: 'EUR', amount: 50 },
  ];
  const mockResponse = {
    source: 'USD',
    quotes: {
      'USDEUR': 0.85,
    },
  };

  beforeEach(() => {
    // Resetting mock
    useLazyFetch.mockClear();
    toaster.warning = jest.fn();
  });

  it('displays loading spinner when fetching data', () => {
    useLazyFetch.mockReturnValue([jest.fn(), { loading: true, data: null }]);

    render(<SummaryInUsd data={mockSummary} loading={false} />);

    fireEvent.click(screen.getByText('Get in Usd'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('displays total value and currency when data is loaded', async () => {
    useLazyFetch.mockReturnValue([jest.fn(), { loading: false, data: mockResponse }]);

    render(<SummaryInUsd data={mockSummary} loading={false} />);

    fireEvent.click(screen.getByText('Get in Usd'));

    await waitFor(() => expect(screen.getByText('~141')).toBeInTheDocument()); // Example total value
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('handles exchange rate warnings if data is missing', async () => {
    const missingDataResponse = {
      source: 'USD',
      quotes: {
        'USDEUR': null, // Simulating missing rate for EUR
      },
    };

    useLazyFetch.mockReturnValue([jest.fn(), { loading: false, data: missingDataResponse }]);

    render(<SummaryInUsd data={mockSummary} loading={false} />);

    fireEvent.click(screen.getByText('Get in Usd'));

    await waitFor(() => expect(toaster.warning).toHaveBeenCalledWith('USDEUR exchange rate is missing'));
  });

  it('handles empty summary data gracefully', () => {
    useLazyFetch.mockReturnValue([jest.fn(), { loading: false, data: mockResponse }]);

    render(<SummaryInUsd data={[]} loading={false} />);

    fireEvent.click(screen.getByText('Get in Usd'));

    // No data should show a value of 0
    expect(screen.getByText('~0')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });
});

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import SummaryInPln from '../SummaryInPln'; // Adjust import based on the file structure
import {Skeleton} from '../../../components/skeleton';
import {useFetchAll} from '../../../hooks';

// Mocking the `useFetchAll` hook to simulate API data
jest.mock('../../../hooks', () => ({useFetchAll: jest.fn()}));

// Mock the Currency component for testing purposes
jest.mock('../../../components/currency', () => ({Currency: ({value}) => <span>{value}</span>}));

describe('SummaryInPln Component', () => {
  const mockSummary = [
    {
      currency: 'USD',
      amount: 100,
    }, {
      currency: 'EUR',
      amount: 50,
    },
  ];
  const mockResponse = [
    {
      code: 'USD',
      rates: [
        {
          bid: 4.0,
          ask: 4.1,
        },
      ],
    }, {
      code: 'EUR',
      rates: [
        {
          bid: 4.5,
          ask: 4.6,
        },
      ],
    },
  ];

  beforeEach(() => {
    // Resetting mock
    useFetchAll.mockClear();
  });

  it('displays loading skeleton while fetching data', () => {
    useFetchAll.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<SummaryInPln
      data={mockSummary}
      loading={true}
           />);

    // Check if Skeleton loader is shown
    expect(screen.getByText('~0')).toBeInTheDocument();
    expect(screen.getByText('PLN')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Adjust the skeleton message if needed
  });

  it('displays total value and exchange rates correctly when data is loaded', async () => {
    useFetchAll.mockReturnValue({
      data: mockResponse,
      loading: false,
    });

    render(<SummaryInPln
      data={mockSummary}
      loading={false}
           />);

    // Wait for the API response to update the component
    await waitFor(() => expect(screen.getByText('~650')).toBeInTheDocument()); // Example total value
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('4.00')).toBeInTheDocument(); // Bid rate for USD
    expect(screen.getByText('4.10')).toBeInTheDocument(); // Ask rate for USD
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('4.50')).toBeInTheDocument(); // Bid rate for EUR
    expect(screen.getByText('4.60')).toBeInTheDocument(); // Ask rate for EUR
  });

  it('handles empty summary data', () => {
    render(<SummaryInPln
      data={[]}
      loading={false}
           />);

    // Check if the component handles empty data gracefully
    expect(screen.queryByText('~0')).toBeInTheDocument();
    expect(screen.queryByText('PLN')).toBeInTheDocument();
    expect(screen.queryByText('USD')).not.toBeInTheDocument();
    expect(screen.queryByText('EUR')).not.toBeInTheDocument();
  });

  it('handles loading state properly when summary data is not loading', () => {
    useFetchAll.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<SummaryInPln
      data={mockSummary}
      loading={false}
           />);

    // Ensure the loading skeleton appears
    expect(screen.getByText('~0')).toBeInTheDocument();
    expect(screen.getByText('PLN')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

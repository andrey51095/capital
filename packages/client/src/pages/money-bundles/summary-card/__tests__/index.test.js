import React from 'react';
import {render, screen} from '@testing-library/react';
import SummaryCard from '../SummaryCard'; // Adjust import based on the file structure
import {CurrencyAmountRenderer} from './currency-amount'; // Adjust import based on the file structure
import SummaryInPln from './summary-in-pln'; // Adjust import based on the file structure
import SummaryInUsd from './summary-in-usd'; // Adjust import based on the file structure

jest.mock('./currency-amount', () => ({
  CurrencyAmountRenderer: ({data, loading}) => (
    <div data-testid="currency-amount">
      {loading ? 'Loading Currency Amount' : `Currency Amount: ${data.length} items`}
    </div>
  ),
}));

jest.mock('./summary-in-pln', () => ({
  SummaryInPln: ({data, loading}) => (
    <div data-testid="summary-in-pln">
      {loading ? 'Loading PLN Summary' : `PLN Summary: ${data.length} items`}
    </div>
  ),
}));

jest.mock('./summary-in-usd', () => ({
  SummaryInUsd: ({data, loading}) => (
    <div data-testid="summary-in-usd">
      {loading ? 'Loading USD Summary' : `USD Summary: ${data.length} items`}
    </div>
  ),
}));

describe('SummaryCard Component', () => {
  const mockSummary = [
    {
      amount: 100,
      currency: 'USD',
    }, {
      amount: 50,
      currency: 'PLN',
    },
  ];
  const mockEmptySummary = [];

  it('displays loading state correctly', () => {
    render(<SummaryCard
      summary={mockSummary}
      loading={true}
           />);

    // Check if the loading messages are displayed for all components
    expect(screen.getByText('Loading Currency Amount')).toBeInTheDocument();
    expect(screen.getByText('Loading PLN Summary')).toBeInTheDocument();
    expect(screen.getByText('Loading USD Summary')).toBeInTheDocument();
  });

  it('renders summary data when loading is false', () => {
    render(<SummaryCard
      summary={mockSummary}
      loading={false}
           />);

    // Check if the correct data is displayed
    expect(screen.getByText('Currency Amount: 2 items')).toBeInTheDocument();
    expect(screen.getByText('PLN Summary: 2 items')).toBeInTheDocument();
    expect(screen.getByText('USD Summary: 2 items')).toBeInTheDocument();
  });

  it('handles empty summary data correctly', () => {
    render(<SummaryCard
      summary={mockEmptySummary}
      loading={false}
           />);

    // Check that it handles an empty summary correctly
    expect(screen.getByText('Currency Amount: 0 items')).toBeInTheDocument();
    expect(screen.getByText('PLN Summary: 0 items')).toBeInTheDocument();
    expect(screen.getByText('USD Summary: 0 items')).toBeInTheDocument();
  });

  it('displays the correct title based on configKey', () => {
    render(<SummaryCard
      summary={mockSummary}
      loading={false}
           />);

    // Assuming the title is set based on configKey
    expect(screen.getByText('Config Title')).toBeInTheDocument();
  });
});

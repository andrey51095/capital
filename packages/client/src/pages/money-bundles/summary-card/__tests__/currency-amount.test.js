import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrencyAmountRenderer from '../CurrencyAmountRenderer'; // Adjust import based on the file structure
import { Skeleton } from '../../../components/skeleton'; // Assuming Skeleton is imported from the correct path
import Currency from '../../../components/currency'; // Assuming Currency is imported from the correct path

jest.mock('../../../components/skeleton', () => ({
  Skeleton: ({ items, height, width }) => (
    <div data-testid="skeleton" style={{ height, width }}>{`Skeleton: ${items} items`}</div>
  ),
}));

jest.mock('../../../components/currency', () => ({
  Currency: ({ value }) => <span data-testid="currency">{value}</span>,
}));

describe('CurrencyAmountRenderer Component', () => {
  it('displays skeleton loader when loading is true', () => {
    render(<CurrencyAmountRenderer data={[]} loading={true} />);

    // Check if the Skeleton component is rendered
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getByText('Skeleton: 3 items')).toBeInTheDocument();
  });

  it('renders currency data when loading is false', () => {
    const mockData = [
      { amount: 100, currency: 'USD' },
      { amount: 200, currency: 'EUR' },
    ];

    render(<CurrencyAmountRenderer data={mockData} loading={false} />);

    // Check if the correct amount and currency are rendered
    expect(screen.getByText('100 (')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText(')')).toBeInTheDocument();

    expect(screen.getByText('200 (')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText(')')).toBeInTheDocument();
  });

  it('does not render currency data when data is empty', () => {
    render(<CurrencyAmountRenderer data={[]} loading={false} />);

    // The component should not render anything when the data array is empty
    expect(screen.queryByText('(')).not.toBeInTheDocument();
  });

  it('correctly displays multiple currencies with amounts', () => {
    const mockData = [
      { amount: 50, currency: 'USD' },
      { amount: 75, currency: 'GBP' },
    ];

    render(<CurrencyAmountRenderer data={mockData} loading={false} />);

    // Ensure the correct amount and currency are displayed for both items
    expect(screen.getByText('50 (')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText(')')).toBeInTheDocument();

    expect(screen.getByText('75 (')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
    expect(screen.getByText(')')).toBeInTheDocument();
  });
});

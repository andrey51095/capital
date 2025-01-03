import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from './Header';
import Currency from '../../../components/currency';

jest.mock('../../../components/currency', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Currency Component</div>),
}));

describe('Header component', () => {
  const mockProps = {
    storage: 'Cash',
    amount: 1000,
    currency: 'USD',
  };

  it('should render storage, amount, and currency', () => {
    render(<Header {...mockProps} />);

    // Check for storage text
    expect(screen.getByText(mockProps.storage)).toBeInTheDocument();

    // Check for amount text
    expect(screen.getByText(mockProps.amount)).toBeInTheDocument();

    // Check for currency text
    expect(screen.getByText('Currency Component')).toBeInTheDocument();
  });

  it('should render currency component correctly', () => {
    render(<Header {...mockProps} />);

    // Check that the Currency component is called with the correct prop
    expect(Currency).toHaveBeenCalledWith({value: mockProps.currency}, {});
  });

  it('should display the correct format for amount and currency', () => {
    render(<Header {...mockProps} />);

    expect(screen.getByText(`(${mockProps.currency})`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.amount)).toBeInTheDocument();
  });

  it('should handle empty storage correctly', () => {
    const propsWithEmptyStorage = {
      ...mockProps,
      storage: '',
    };
    render(<Header {...propsWithEmptyStorage} />);

    expect(screen.queryByText('')).toBeNull();
    expect(screen.getByText(mockProps.amount)).toBeInTheDocument();
    expect(screen.getByText('Currency Component')).toBeInTheDocument();
  });

  it('should render currency component when currency is passed', () => {
    const propsWithDifferentCurrency = {
      ...mockProps,
      currency: 'EUR',
    };
    render(<Header {...propsWithDifferentCurrency} />);

    expect(screen.getByText('Currency Component')).toBeInTheDocument();
  });
});

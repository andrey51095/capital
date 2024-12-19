import React from 'react';
import {render, screen} from '@testing-library/react';
import Currency from '../';

describe('Currency', () => {
  it('renders the correct color for USD', () => {
    render(<Currency value="USD" />);
    const currencyElement = screen.getByText('USD');
    expect(currencyElement).toHaveStyle('color: positive500');
  });

  it('renders the correct color for EUR', () => {
    render(<Currency value="EUR" />);
    const currencyElement = screen.getByText('EUR');
    expect(currencyElement).toHaveStyle('color: accent500');
  });

  it('renders the correct color for PLN', () => {
    render(<Currency value="PLN" />);
    const currencyElement = screen.getByText('PLN');
    expect(currencyElement).toHaveStyle('color: warning500');
  });

});

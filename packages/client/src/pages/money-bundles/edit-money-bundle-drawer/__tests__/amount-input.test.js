import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import AmountInput from '../AmountInput'; // Adjust import path as needed

describe('AmountInput', () => {
  it('renders correctly with initial value and no error', () => {
    render(<AmountInput
      name="amount"
      value={100}
      onChange={() => {}}
           />);

    // Assert input value is set correctly
    expect(screen.getByRole('textbox')).toHaveValue(100);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('shows input field for concatenation when Add button is clicked', () => {
    render(<AmountInput
      name="amount"
      value={100}
      onChange={() => {}}
           />);

    // Simulate clicking the Add button
    fireEvent.click(screen.getByText('Add'));

    // Assert the concatenation input appears
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('adds the value to the current amount when concatenation is confirmed', () => {
    const mockOnChange = jest.fn();
    render(<AmountInput
      name="amount"
      value={100}
      onChange={mockOnChange}
           />);

    // Click the Add button to show concatenation input
    fireEvent.click(screen.getByText('Add'));

    // Enter a value into the concatenation input and click Add again
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: '50'}});
    fireEvent.click(screen.getByText('Add'));

    // Assert that the onChange is called with the updated value
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'amount',
        value: 150,
      },
    });
  });

  it('resets the valueToConcat after concatenation is confirmed', () => {
    const mockOnChange = jest.fn();
    render(<AmountInput
      name="amount"
      value={100}
      onChange={mockOnChange}
           />);

    // Click the Add button to show concatenation input
    fireEvent.click(screen.getByText('Add'));

    // Enter a value into the concatenation input and click Add again
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: '50'}});
    fireEvent.click(screen.getByText('Add'));

    // Assert that the valueToConcat is reset
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  it('shows error message when error prop is passed', () => {
    render(<AmountInput
      name="amount"
      value={100}
      onChange={() => {}}
      error="Invalid amount"
           />);

    // Assert that the error message is shown
    expect(screen.getByText('Invalid amount')).toBeInTheDocument();
  });
});

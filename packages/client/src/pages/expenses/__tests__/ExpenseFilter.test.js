import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ExpenseFilter from '../ExpenseFilter';

test('renders ExpenseFilter and triggers filter changes', () => {
  const onFilterChange = jest.fn();
  render(<ExpenseFilter onFilterChange={onFilterChange} />);

  fireEvent.change(screen.getByPlaceholderText(/Start Date/i), {target: {value: '2023-01-01'}});
  fireEvent.change(screen.getByPlaceholderText(/End Date/i), {target: {value: '2023-12-31'}});
  fireEvent.change(screen.getByPlaceholderText(/Categories/i), {target: {value: 'Groceries, Bills'}});

  fireEvent.click(screen.getByText(/Apply Filters/i));

  expect(onFilterChange).toHaveBeenCalledWith({
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    categories: ['Groceries', 'Bills'],
  });
});

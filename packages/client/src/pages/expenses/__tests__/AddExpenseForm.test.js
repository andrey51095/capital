import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddExpenseForm from '../components/AddExpenseForm';

test('renders AddExpenseForm and handles submission', () => {
  const onAddExpense = jest.fn();
  render(<AddExpenseForm onAddExpense={onAddExpense} />);

  fireEvent.change(screen.getByPlaceholderText(/Date/i), { target: { value: '2023-01-01' } });
  fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: '100' } });
  fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Groceries' } });

  fireEvent.click(screen.getByText(/Add Expense/i));

  expect(onAddExpense).toHaveBeenCalledWith({
    date: '2023-01-01',
    category: 'Other',
    amount: 100,
    description: 'Groceries',
  });
});

import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ExpenseList from '../components/ExpenseList';

const mockExpenses = [
  {
    id: '1',
    date: '2023-01-01',
    category: 'Groceries',
    amount: 50,
    description: 'Apples',
  }, {
    id: '2',
    date: '2023-01-02',
    category: 'Clothing',
    amount: 100,
    description: 'Jeans',
  },
];

test('renders ExpenseList with expenses', () => {
  const onDeleteExpense = jest.fn();
  render(<ExpenseList
    expenses={mockExpenses}
    onDeleteExpense={onDeleteExpense}
         />);

  expect(screen.getByText(/Apples/i)).toBeInTheDocument();
  expect(screen.getByText(/Jeans/i)).toBeInTheDocument();

  fireEvent.click(screen.getAllByText(/Delete/i)[0]);
  expect(onDeleteExpense).toHaveBeenCalledWith('1');
});

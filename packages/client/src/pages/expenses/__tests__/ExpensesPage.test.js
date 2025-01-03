import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import ExpensesPage from '../';
import {GET_EXPENSES} from '../../../gql/queries';
import {CREATE_EXPENSE, DELETE_EXPENSE} from '../../../gql/mutations';

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

const mocks = [
  {
    request: {
      query: GET_EXPENSES,
      variables: {filter: {}},
    },
    result: {data: {getExpenses: mockExpenses}},
  }, {
    request: {
      query: CREATE_EXPENSE,
      variables: {
        input: {
          date: '2023-01-03',
          category: 'Bills',
          amount: 200,
        },
      },
    },
    result: {
      data: {
        createExpense: {
          id: '3',
          date: '2023-01-03',
          category: 'Bills',
          amount: 200,
          description: '',
        },
      },
    },
  }, {
    request: {
      query: DELETE_EXPENSE,
      variables: {id: '1'},
    },
    result: {data: {deleteExpense: true}},
  },
];

test('renders ExpensesPage with initial data', async () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <ExpensesPage />
    </MockedProvider>
  );

  expect(screen.getByText(/Expense Manager/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Apples/i)).toBeInTheDocument();
    expect(screen.getByText(/Jeans/i)).toBeInTheDocument();
  });
});

test('deletes an expense', async () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <ExpensesPage />
    </MockedProvider>
  );

  await waitFor(() => screen.getByText(/Apples/i));
  fireEvent.click(screen.getAllByText(/Delete/i)[0]);

  await waitFor(() => {
    expect(screen.queryByText(/Apples/i)).not.toBeInTheDocument();
  });
});

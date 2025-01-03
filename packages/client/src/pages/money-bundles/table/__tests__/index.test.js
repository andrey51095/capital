import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import MoneyBundleTable from './MoneyBundleTable';
import {BACKUP_MUTATION} from '../../../gql';

const mockMoneyBundles = [
  {
    id: '1',
    currency: 'USD',
    amount: 100,
    type: 'Income',
    storage: 'Bank',
    description: 'Salary',
    createdAt: 1647450000,
    updatedAt: 1647540000,
  }, {
    id: '2',
    currency: 'EUR',
    amount: 50,
    type: 'Expense',
    storage: 'Wallet',
    description: 'Groceries',
    createdAt: 1647540000,
    updatedAt: 1647630000,
  },
];

const mockHandleView = jest.fn();
const mockHandleEdit = jest.fn();
const mockHandleDelete = jest.fn();
const mockHandleBackup = jest.fn();

const mocks = [
  {
    request: {query: BACKUP_MUTATION},
    result: {data: {backup: JSON.stringify(mockMoneyBundles)}},
  },
];

test('renders MoneyBundleTable correctly with data', () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <MoneyBundleTable
        moneyBundles={mockMoneyBundles}
        handleView={mockHandleView}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        loading={false}
      />
    </MockedProvider>
  );

  expect(screen.getByText('Currency')).toBeInTheDocument();
  expect(screen.getByText('Amount')).toBeInTheDocument();
  expect(screen.getByText('Type')).toBeInTheDocument();

  mockMoneyBundles.forEach(bundle => {
    expect(screen.getByText(bundle.amount)).toBeInTheDocument();
    expect(screen.getByText(bundle.currency)).toBeInTheDocument();
    expect(screen.getByText(bundle.type)).toBeInTheDocument();
  });
});

test('displays loading state when data is being fetched', () => {
  render(
    <MockedProvider
      mocks={[]}
      addTypename={false}
    >
      <MoneyBundleTable
        moneyBundles={[]}
        handleView={mockHandleView}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        loading={true}
      />
    </MockedProvider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('handles row actions correctly: View, Edit, Delete', async () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <MoneyBundleTable
        moneyBundles={mockMoneyBundles}
        handleView={mockHandleView}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        loading={false}
      />
    </MockedProvider>
  );

  const viewButton = screen.getAllByLabelText('View')[0];
  fireEvent.click(viewButton);
  await waitFor(() => expect(mockHandleView).toHaveBeenCalledWith(mockMoneyBundles[0]));

  const editButton = screen.getAllByLabelText('Edit')[0];
  fireEvent.click(editButton);
  await waitFor(() => expect(mockHandleEdit).toHaveBeenCalledWith(mockMoneyBundles[0]));

  const deleteButton = screen.getAllByLabelText('Delete')[0];
  fireEvent.click(deleteButton);
  await waitFor(() => expect(mockHandleDelete).toHaveBeenCalledWith(mockMoneyBundles[0]));
});

test('displays backup button and triggers backup download', async () => {
  render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
    >
      <MoneyBundleTable
        moneyBundles={mockMoneyBundles}
        handleView={mockHandleView}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        loading={false}
      />
    </MockedProvider>
  );

  const backupButton = screen.getByText('Backup Data');
  fireEvent.click(backupButton);

  // Expect a modal to show with a backup name input
  expect(screen.getByText('Please enter a name of the file')).toBeInTheDocument();

  const input = screen.getByRole('textbox');
  fireEvent.change(input, {target: {value: 'backup1'}});

  const submitButton = screen.getByText('Download');
  fireEvent.click(submitButton);

  await waitFor(() => expect(mockHandleBackup).toHaveBeenCalled());
});

test('displays empty state when there are no money bundles', () => {
  render(
    <MockedProvider
      mocks={[]}
      addTypename={false}
    >
      <MoneyBundleTable
        moneyBundles={[]}
        handleView={mockHandleView}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        loading={false}
      />
    </MockedProvider>
  );

  expect(screen.getByText('No data available')).toBeInTheDocument();
});

test('displays proper data for various money bundle types', () => {
  const testBundles = [
    {
      id: '1',
      amount: 500,
      currency: 'USD',
      type: 'Income',
      storage: 'Bank',
      description: 'Deposit',
      createdAt: 1630452000,
      updatedAt: 1630455000,
    }, {
      id: '2',
      amount: 100,
      currency: 'EUR',
      type: 'Expense',
      storage: 'Wallet',
      description: 'Rent',
      createdAt: 1630456000,
      updatedAt: 1630462000,
    },
  ];

  render(
    <MockedProvider
      mocks={[]}
      addTypename={false}
    >
      <MoneyBundleTable
        moneyBundles={testBundles}
        handleView={mockHandleView}
        handleDelete={mockHandleDelete}
        handleEdit={mockHandleEdit}
        loading={false}
      />
    </MockedProvider>
  );

  expect(screen.getByText('500')).toBeInTheDocument();
  expect(screen.getByText('USD')).toBeInTheDocument();
  expect(screen.getByText('Income')).toBeInTheDocument();

  expect(screen.getByText('100')).toBeInTheDocument();
  expect(screen.getByText('EUR')).toBeInTheDocument();
  expect(screen.getByText('Expense')).toBeInTheDocument();
});

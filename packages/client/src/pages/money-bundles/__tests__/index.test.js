import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MoneyBundles from './MoneyBundles';
import { useMoneyBundles, useCreateMoneyBundle, useDeleteMoneyBundle, useUpdateMoneyBundle, useMoneySummary } from '../../hooks/graphql';
import { toaster } from 'baseui/toast';

jest.mock('../../hooks/graphql', () => ({
  useMoneyBundles: jest.fn(),
  useCreateMoneyBundle: jest.fn(),
  useDeleteMoneyBundle: jest.fn(),
  useUpdateMoneyBundle: jest.fn(),
  useMoneySummary: jest.fn(),
}));

jest.mock('baseui/toast', () => ({
  toaster: {
    positive: jest.fn(),
    negative: jest.fn(),
  },
}));

describe('MoneyBundles', () => {
  const mockMoneyBundles = [
    { id: 1, storage: 'Cash', amount: 1000, currency: 'USD', type: 'Deposit', description: 'Test Description', createdAt: '2023-01-01', updatedAt: '2023-01-02' },
    { id: 2, storage: 'Bank', amount: 2000, currency: 'EUR', type: 'Withdrawal', description: 'Test Description 2', createdAt: '2023-02-01', updatedAt: '2023-02-02' },
  ];

  const mockMoneySummary = {
    totalAmount: 3000,
    totalCurrency: 'USD',
  };

  beforeEach(() => {
    useMoneyBundles.mockReturnValue({
      moneyBundles: mockMoneyBundles,
      loading: false,
      refetch: jest.fn(),
    });

    useMoneySummary.mockReturnValue(mockMoneySummary);

    useCreateMoneyBundle.mockReturnValue({
      createMoneyBundle: jest.fn(),
    });

    useDeleteMoneyBundle.mockReturnValue({
      deleteMoneyBundle: jest.fn(),
      loading: false,
    });

    useUpdateMoneyBundle.mockReturnValue({
      updateMoneyBundle: jest.fn(),
    });
  });

  it('should render MoneyBundles with the correct data', () => {
    render(<MoneyBundles />);

    // Check if the summary card shows the correct total
    expect(screen.getByText(`Total Amount: ${mockMoneySummary.totalAmount} ${mockMoneySummary.totalCurrency}`)).toBeInTheDocument();

    // Check if the MoneyBundleTable renders correctly with mock data
    expect(screen.getByText(mockMoneyBundles[0].storage)).toBeInTheDocument();
    expect(screen.getByText(mockMoneyBundles[0].amount)).toBeInTheDocument();
    expect(screen.getByText(mockMoneyBundles[0].currency)).toBeInTheDocument();
    expect(screen.getByText(mockMoneyBundles[0].description)).toBeInTheDocument();
  });

  it('should handle the "Create Money Bundle" button click', async () => {
    const { createMoneyBundle } = useCreateMoneyBundle();
    render(<MoneyBundles />);

    fireEvent.click(screen.getByText('Create Money Bundle'));

    // Check if the modal for creating money bundle is opened
    expect(screen.getByText('Create Money Bundle')).toBeInTheDocument();

    // Simulate form submission
    createMoneyBundle({ variables: { amount: 1000, currency: 'USD', storage: 'Cash' } });
    
    await waitFor(() => expect(toaster.positive).toHaveBeenCalledWith('Created new money bundle 1000(USD)!'));
  });

  it('should handle the "Delete Money Bundle" button click', async () => {
    const { deleteMoneyBundle } = useDeleteMoneyBundle();
    render(<MoneyBundles />);

    // Simulate opening delete modal for the first money bundle
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Simulate deletion action
    deleteMoneyBundle({ variables: { id: 1 } });
    
    await waitFor(() => expect(toaster.positive).toHaveBeenCalledWith('Successfully Deleted!'));
  });

  it('should handle the "Update Money Bundle" button click', async () => {
    const { updateMoneyBundle } = useUpdateMoneyBundle();
    render(<MoneyBundles />);

    // Simulate opening edit modal for the first money bundle
    fireEvent.click(screen.getAllByText('Edit')[0]);

    // Simulate update action
    updateMoneyBundle({ variables: { id: 1, amount: 1500 } });
    
    await waitFor(() => expect(toaster.positive).toHaveBeenCalledWith('Updated money bundle 1500(USD)!'));
  });

  it('should render loading state when money bundles are loading', () => {
    useMoneyBundles.mockReturnValueOnce({ moneyBundles: [], loading: true, refetch: jest.fn() });
    render(<MoneyBundles />);

    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Assuming "Loading..." text appears when data is loading
  });

  it('should handle the "Open Feed" button click', () => {
    render(<MoneyBundles />);

    fireEvent.click(screen.getByText('Open Feed'));
    
    // Check if FeedModalContainer is displayed
    expect(screen.getByText('Feed Modal')).toBeInTheDocument();
  });

  it('should not render modal if "isOpen" is false', () => {
    render(<MoneyBundles />);

    // Check if the Create Money Bundle modal is not rendered initially
    expect(screen.queryByText('Create Money Bundle')).toBeNull();
  });

  it('should handle empty money bundle list', () => {
    useMoneyBundles.mockReturnValueOnce({ moneyBundles: [], loading: false, refetch: jest.fn() });
    render(<MoneyBundles />);

    // Check if a message or empty state is shown when there are no money bundles
    expect(screen.getByText('No money bundles available')).toBeInTheDocument();
  });

  it('should show error toast if create action fails', async () => {
    const mockCreateMoneyBundle = jest.fn(() => {
      throw new Error('Create failed');
    });

    useCreateMoneyBundle.mockReturnValue({ createMoneyBundle: mockCreateMoneyBundle });

    render(<MoneyBundles />);

    fireEvent.click(screen.getByText('Create Money Bundle'));

    await waitFor(() => expect(toaster.negative).toHaveBeenCalledWith('Create failed'));
  });

  it('should show error toast if delete action fails', async () => {
    const mockDeleteMoneyBundle = jest.fn(() => {
      throw new Error('Delete failed');
    });

    useDeleteMoneyBundle.mockReturnValue({ deleteMoneyBundle: mockDeleteMoneyBundle, loading: false });

    render(<MoneyBundles />);

    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => expect(toaster.negative).toHaveBeenCalledWith('Delete failed'));
  });

  it('should show error toast if update action fails', async () => {
    const mockUpdateMoneyBundle = jest.fn(() => {
      throw new Error('Update failed');
    });

    useUpdateMoneyBundle.mockReturnValue({ updateMoneyBundle: mockUpdateMoneyBundle });

    render(<MoneyBundles />);

    fireEvent.click(screen.getAllByText('Edit')[0]);

    await waitFor(() => expect(toaster.negative).toHaveBeenCalledWith('Update failed'));
  });
});

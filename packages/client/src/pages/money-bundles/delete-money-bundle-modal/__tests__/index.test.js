import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DeleteMoneyBundleModal from '../DeleteMoneyBundleModal'; // Adjust import path as needed

// Mock onSubmit function
const mockOnSubmit = jest.fn();

// Mock bundle data
const mockBundle = {
  id: '1',
  amount: 1000,
};

// Helper function to render the modal
const renderModal = (isOpen = true, bundle = mockBundle) => {
  render(
    <MockedProvider>
      <DeleteMoneyBundleModal
        isOpen={isOpen}
        onClose={jest.fn()}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        {...bundle}
      />
    </MockedProvider>
  );
};

describe('DeleteMoneyBundleModal', () => {
  it('renders the modal with correct text when amount is present', () => {
    renderModal(true);

    // Assert modal is open
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();

    // Assert the confirmation message
    expect(screen.getByText('Are you sure want to delete?')).toBeInTheDocument();

    // Assert Cancel and Confirm buttons are rendered
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders the modal with correct text when amount is absent', () => {
    renderModal(true, { id: '2', amount: 0 });

    // Assert modal is open
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();

    // Assert the not able to delete message is shown
    expect(screen.getByText("You can't delete a non-empty bundle")).toBeInTheDocument();

    // Assert Cancel button is enabled, Confirm button is disabled
    expect(screen.getByText('Cancel')).not.toBeDisabled();
    expect(screen.getByText('Confirm')).toBeDisabled();
  });

  it('calls onSubmit when Confirm button is clicked and bundle has amount', async () => {
    renderModal(true);

    // Simulate clicking Confirm button
    fireEvent.click(screen.getByText('Confirm'));

    // Wait for the onSubmit callback to be called with the correct bundle id
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith('1'));
  });

  it('does not call onSubmit when Confirm button is clicked and bundle does not have amount', async () => {
    renderModal(true, { id: '2', amount: 0 });

    // Simulate clicking Confirm button
    fireEvent.click(screen.getByText('Confirm'));

    // Wait for the onSubmit callback not to be called
    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });

  it('calls onClose when Cancel button is clicked', async () => {
    const mockOnClose = jest.fn();
    renderModal(true, { id: '1', amount: 1000, onClose: mockOnClose });

    // Simulate clicking Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Wait for the onClose callback to be called
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });

  it('shows loading state on Confirm button when isSubmitting is true', async () => {
    renderModal(true, { id: '1', amount: 1000, isSubmitting: true });

    // Assert the Confirm button has loading state
    expect(screen.getByText('Confirm').closest('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('should close modal when onClose is triggered', async () => {
    const mockOnClose = jest.fn();
    renderModal(true, { id: '1', amount: 1000, onClose: mockOnClose });

    // Trigger close action
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure onClose is called
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });
});

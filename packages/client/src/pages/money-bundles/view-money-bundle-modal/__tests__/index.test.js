import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ViewMoneyBundleModal from './ViewMoneyBundleModal';
import Header from './header';
import Body from './body';

jest.mock('./header', () => jest.fn(() => <div>Header Component</div>));
jest.mock('./body', () => jest.fn(() => <div>Body Component</div>));

describe('ViewMoneyBundleModal', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    storage: 'Cash',
    amount: 1000,
    currency: 'USD',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'Test Description',
    type: 'Test Type',
  };

  it('should render modal with header and body', () => {
    render(<ViewMoneyBundleModal {...mockProps} />);

    // Check modal header and body rendering
    expect(screen.getByText('Header Component')).toBeInTheDocument();
    expect(screen.getByText('Body Component')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<ViewMoneyBundleModal {...mockProps} />);
    const closeButton = screen.getByRole('button', {name: /close/i});

    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should render modal content correctly', () => {
    render(<ViewMoneyBundleModal {...mockProps} />);

    // Check if storage, amount, and currency are passed correctly
    expect(screen.getByText(mockProps.storage)).toBeInTheDocument();
    expect(screen.getByText(mockProps.amount)).toBeInTheDocument();
    expect(screen.getByText(mockProps.currency)).toBeInTheDocument();

    // Check if body content is passed correctly
    expect(screen.getByText(mockProps.type)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('should not render modal when isOpen is false', () => {
    const props = { ...mockProps, isOpen: false };
    render(<ViewMoneyBundleModal {...props} />);

    // Modal should not be visible
    expect(screen.queryByText('Header Component')).toBeNull();
  });

  it('should render the modal correctly when isOpen is true', () => {
    render(<ViewMoneyBundleModal {...mockProps} />);

    // Modal should be visible
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EditDrawer from '../EditDrawer'; // Adjust import path as needed
import { Formik } from 'formik';
import { Drawer } from 'baseui/drawer';

// Mocking necessary components
jest.mock('baseui/drawer', () => ({
  Drawer: jest.fn().mockImplementation(({ isOpen, children }) => isOpen ? <div>{children}</div> : null),
}));

describe('EditDrawer', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  it('renders correctly when open', () => {
    render(
      <EditDrawer isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <EditDrawer isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('calls onClose when the drawer is closed', () => {
    render(
      <EditDrawer isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.click(screen.getByText('Close')); // Assuming the close button or action is there

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('submits the form correctly when the drawer is open', async () => {
    const initialValues = { amount: 100, description: '', storage: '', transfer: [], currency: 'USD', type: '' };
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <EditDrawer isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
      </Formik>
    );

    fireEvent.click(screen.getByText(/Submit/i));
    
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      amount: 100,
      description: '',
      storage: '',
      transfer: [],
      currency: 'USD',
      type: '',
    })));
  });

  it('renders the EditForm inside the Drawer', () => {
    render(
      <Formik initialValues={{ amount: 100, description: '', storage: '', transfer: [], currency: 'USD' }} onSubmit={mockOnSubmit}>
        <EditDrawer isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
      </Formik>
    );

    expect(screen.getByLabelText(/Amount/i)).toHaveValue(100);
    expect(screen.getByLabelText(/Storage/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
  });
});

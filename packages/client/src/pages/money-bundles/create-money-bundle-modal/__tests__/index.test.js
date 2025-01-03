import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {Formik} from 'formik';
import CreateMoneyBundleModal from '../CreateMoneyBundleModal'; // Adjust import path as needed
import {initialForm} from '../constants'; // Adjust import path as needed
import MoneyBundleForm from '../form'; // Adjust import path as needed
import {validationSchema} from '../validation'; // Adjust import path as needed

// Mock the onSubmit function
const mockOnSubmit = jest.fn();

// Mock initial form and validation schema
jest.mock('../constants', () => ({
  initialForm: {
    amount: '',
    currency: '',
    type: '',
    storage: '',
    description: '',
  },
}));

jest.mock('../validation', () => ({
  validationSchema: {
    amount: 'Amount is required',
    currency: 'Currency is required',
    type: 'Type is required',
    storage: 'Storage is required',
  },
}));

describe('CreateMoneyBundleModal', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders modal and form correctly', async () => {
    render(
      <MockedProvider>
        <CreateMoneyBundleModal
          isOpen={true}
          onClose={jest.fn()}
          onSubmit={mockOnSubmit}
        />
      </MockedProvider>
    );

    // Assert modal is rendered
    expect(screen.getByText('Create Money Bundle')).toBeInTheDocument();

    // Wait for form fields to appear
    await waitFor(() => screen.getByLabelText('Amount *'));
    expect(screen.getByLabelText('Amount *')).toBeInTheDocument();
    expect(screen.getByLabelText('Currency *')).toBeInTheDocument();
    expect(screen.getByLabelText('Type *')).toBeInTheDocument();
    expect(screen.getByLabelText('Storage *')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('handles form input changes correctly', async () => {
    render(
      <MockedProvider>
        <CreateMoneyBundleModal
          isOpen={true}
          onClose={jest.fn()}
          onSubmit={mockOnSubmit}
        />
      </MockedProvider>
    );

    await waitFor(() => screen.getByLabelText('Amount *'));

    // Simulate input change for 'Amount'
    fireEvent.change(screen.getByLabelText('Amount *'), {target: {value: '1000'}});
    expect(screen.getByLabelText('Amount *')).toHaveValue('1000');

    // Simulate input change for 'Currency'
    fireEvent.change(screen.getByLabelText('Currency *'), {target: {value: 'USD'}});
    expect(screen.getByLabelText('Currency *')).toHaveValue('USD');

    // Simulate input change for 'Type'
    fireEvent.change(screen.getByLabelText('Type *'), {target: {value: 'Type 1'}});
    expect(screen.getByLabelText('Type *')).toHaveValue('Type 1');

    // Simulate input change for 'Storage'
    fireEvent.change(screen.getByLabelText('Storage *'), {target: {value: 'Storage 1'}});
    expect(screen.getByLabelText('Storage *')).toHaveValue('Storage 1');

    // Simulate input change for 'Description'
    fireEvent.change(screen.getByLabelText('Description'), {target: {value: 'Test Description'}});
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
  });

  it('shows validation errors when form is submitted with invalid data', async () => {
    render(
      <MockedProvider>
        <CreateMoneyBundleModal
          isOpen={true}
          onClose={jest.fn()}
          onSubmit={mockOnSubmit}
        />
      </MockedProvider>
    );

    await waitFor(() => screen.getByLabelText('Amount *'));

    // Submit the form without filling the fields
    fireEvent.click(screen.getByText('Submit'));

    // Wait for validation errors to appear
    await waitFor(() => screen.getByText('Amount is required'));
    expect(screen.getByText('Amount is required')).toBeInTheDocument();
    expect(screen.getByText('Currency is required')).toBeInTheDocument();
    expect(screen.getByText('Type is required')).toBeInTheDocument();
    expect(screen.getByText('Storage is required')).toBeInTheDocument();
  });

  it('submits the form correctly when all fields are filled', async () => {
    render(
      <MockedProvider>
        <CreateMoneyBundleModal
          isOpen={true}
          onClose={jest.fn()}
          onSubmit={mockOnSubmit}
        />
      </MockedProvider>
    );

    await waitFor(() => screen.getByLabelText('Amount *'));

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Amount *'), {target: {value: '1000'}});
    fireEvent.change(screen.getByLabelText('Currency *'), {target: {value: 'USD'}});
    fireEvent.change(screen.getByLabelText('Type *'), {target: {value: 'Type 1'}});
    fireEvent.change(screen.getByLabelText('Storage *'), {target: {value: 'Storage 1'}});
    fireEvent.change(screen.getByLabelText('Description'), {target: {value: 'Test Description'}});

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Wait for submission callback to be called
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));

    // Assert form values are passed to onSubmit
    expect(mockOnSubmit).toHaveBeenCalledWith({
      amount: '1000',
      currency: 'USD',
      type: 'Type 1',
      storage: 'Storage 1',
      description: 'Test Description',
    });
  });

  it('closes the modal when onClose is called', async () => {
    const mockOnClose = jest.fn();

    render(
      <MockedProvider>
        <CreateMoneyBundleModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </MockedProvider>
    );

    // Assert modal is open
    expect(screen.getByText('Create Money Bundle')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByLabelText('Close'));

    // Assert onClose callback was called
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });
});

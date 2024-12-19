import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TransferBundles from '../TransferBundles'; // Adjust import path as needed
import { Formik } from 'formik';
import { Select } from 'baseui/select';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

jest.mock('baseui/select', () => ({
  Select: jest.fn(({ onChange, options, value }) => (
    <div onClick={() => onChange({ type: 'select', option: options[0] })}>
      {value ? value[0]?.id : 'Select'}
    </div>
  )),
}));

jest.mock('baseui/input', () => ({
  Input: jest.fn(({ value, onChange }) => (
    <input value={value} onChange={onChange} />
  )),
}));

jest.mock('baseui/button', () => ({
  Button: jest.fn(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

describe('TransferBundles', () => {
  const mockGetError = jest.fn();
  const mockGetCommonProps = jest.fn((key) => ({
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  }));

  const mockOptions = [
    { id: '1', amount: '100', currency: 'USD', storage: 'Storage 1' },
    { id: '2', amount: '50', currency: 'USD', storage: 'Storage 2' },
  ];

  const initialValues = {
    transfer: [
      {
        amount: 100,
        currency: 'USD',
        storage: 'Storage 1',
        description: 'Description 1',
      },
    ],
    currency: 'USD',
    storage: 'Storage 1',
  };

  const mockOnSubmit = jest.fn();

  it('renders transfer bundles correctly', () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <TransferBundles
          values={initialValues}
          getError={mockGetError}
          optionsTransferTo={mockOptions}
          getCommonProps={mockGetCommonProps}
        />
      </Formik>
    );

    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Storage 1')).toBeInTheDocument();
  });

  it('adds a new transfer bundle when clicking "Add"', () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <TransferBundles
          values={initialValues}
          getError={mockGetError}
          optionsTransferTo={mockOptions}
          getCommonProps={mockGetCommonProps}
        />
      </Formik>
    );

    fireEvent.click(screen.getByText('Add'));

    expect(screen.getAllByText('Storage 1').length).toBe(2);
  });

  it('removes a transfer bundle when clicking "Remove"', async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <TransferBundles
          values={initialValues}
          getError={mockGetError}
          optionsTransferTo={mockOptions}
          getCommonProps={mockGetCommonProps}
        />
      </Formik>
    );

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(screen.queryByText('Storage 1')).toBeNull();
    });
  });

  it('handles selecting transfer options correctly', () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <TransferBundles
          values={initialValues}
          getError={mockGetError}
          optionsTransferTo={mockOptions}
          getCommonProps={mockGetCommonProps}
        />
      </Formik>
    );

    fireEvent.click(screen.getByText('Select'));

    expect(mockGetCommonProps).toHaveBeenCalled();
  });

  it('submits the form correctly', async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <TransferBundles
          values={initialValues}
          getError={mockGetError}
          optionsTransferTo={mockOptions}
          getCommonProps={mockGetCommonProps}
        />
      </Formik>
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(initialValues));
  });
});

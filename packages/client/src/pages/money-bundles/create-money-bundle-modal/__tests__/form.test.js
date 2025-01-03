import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import {Formik} from 'formik';
import MoneyBundleForm from '../MoneyBundleForm'; // Adjust the import path as needed
import {MockedProvider} from '@apollo/client/testing';
import {QUERY_CURRENCIES} from '../../../gql';
import {useBundleTypesOptions} from '../../../hooks/graphql';

// Mock hooks and queries
jest.mock('../../../hooks/graphql', () => ({useBundleTypesOptions: jest.fn()}));

const mockCurrencies = {
  request: {query: QUERY_CURRENCIES},
  result: {data: {currencies: ['USD', 'EUR', 'GBP']}},
};

const mockTypesOptions = [
  {
    id: 'type1',
    label: 'Type 1',
  }, {
    id: 'type2',
    label: 'Type 2',
  },
];

describe('MoneyBundleForm', () => {
  beforeEach(() => {
    useBundleTypesOptions.mockReturnValue({
      typesOptions: mockTypesOptions,
      loading: false,
    });
  });

  it('renders form and handles input changes correctly', async () => {
    render(
      <MockedProvider
        mocks={[mockCurrencies]}
        addTypename={false}
      >
        <Formik
          initialValues={{
            amount: '',
            currency: '',
            type: '',
            storage: '',
            description: '',
          }}
          onSubmit={jest.fn()}
        >
          <MoneyBundleForm />
        </Formik>
      </MockedProvider>
    );

    // Wait for the form elements to appear
    await waitFor(() => screen.getByLabelText('Amount *'));

    // Test initial state
    expect(screen.getByLabelText('Amount *')).toHaveValue('');
    expect(screen.getByLabelText('Currency *')).toHaveValue('');
    expect(screen.getByLabelText('Type *')).toHaveValue('');
    expect(screen.getByLabelText('Storage *')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');

    // Simulate user entering a value
    fireEvent.change(screen.getByLabelText('Amount *'), {target: {value: '1000'}});
    fireEvent.change(screen.getByLabelText('Currency *'), {target: {value: 'USD'}});
    fireEvent.change(screen.getByLabelText('Type *'), {target: {value: 'type1'}});
    fireEvent.change(screen.getByLabelText('Storage *'), {target: {value: 'Storage 1'}});
    fireEvent.change(screen.getByLabelText('Description'), {target: {value: 'Test Description'}});

    // Assert changes
    expect(screen.getByLabelText('Amount *')).toHaveValue('1000');
    expect(screen.getByLabelText('Currency *')).toHaveValue('USD');
    expect(screen.getByLabelText('Type *')).toHaveValue('type1');
    expect(screen.getByLabelText('Storage *')).toHaveValue('Storage 1');
    expect(screen.getByLabelText('Description')).toHaveValue('Test Description');
  });

  it('shows validation errors if fields are touched and not filled', async () => {
    render(
      <MockedProvider
        mocks={[mockCurrencies]}
        addTypename={false}
      >
        <Formik
          initialValues={{
            amount: '',
            currency: '',
            type: '',
            storage: '',
            description: '',
          }}
          onSubmit={jest.fn()}
          validate={() => ({
            amount: 'Amount is required',
            currency: 'Currency is required',
            type: 'Type is required',
            storage: 'Storage is required',
          })}
        >
          <MoneyBundleForm />
        </Formik>
      </MockedProvider>
    );

    // Wait for the form elements to appear
    await waitFor(() => screen.getByLabelText('Amount *'));

    // Simulate focusing and blurring fields
    fireEvent.blur(screen.getByLabelText('Amount *'));
    fireEvent.blur(screen.getByLabelText('Currency *'));
    fireEvent.blur(screen.getByLabelText('Type *'));
    fireEvent.blur(screen.getByLabelText('Storage *'));

    // Assert validation errors are displayed
    expect(screen.getByText('Amount is required')).toBeInTheDocument();
    expect(screen.getByText('Currency is required')).toBeInTheDocument();
    expect(screen.getByText('Type is required')).toBeInTheDocument();
    expect(screen.getByText('Storage is required')).toBeInTheDocument();
  });

  it('submits the form correctly', async () => {
    const handleSubmit = jest.fn();

    render(
      <MockedProvider
        mocks={[mockCurrencies]}
        addTypename={false}
      >
        <Formik
          initialValues={{
            amount: '1000',
            currency: 'USD',
            type: 'type1',
            storage: 'Storage 1',
            description: 'Test Description',
          }}
          onSubmit={handleSubmit}
        >
          <MoneyBundleForm />
        </Formik>
      </MockedProvider>
    );

    // Wait for the form elements to appear
    await waitFor(() => screen.getByLabelText('Amount *'));

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit'));

    // Wait for submit to complete and assert the function was called
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
  });

  it('displays loading state for currency and types options', async () => {
    useBundleTypesOptions.mockReturnValue({
      typesOptions: [],
      loading: true,
    });

    render(
      <MockedProvider
        mocks={[mockCurrencies]}
        addTypename={false}
      >
        <Formik
          initialValues={{
            amount: '',
            currency: '',
            type: '',
            storage: '',
            description: '',
          }}
          onSubmit={jest.fn()}
        >
          <MoneyBundleForm />
        </Formik>
      </MockedProvider>
    );

    // Wait for the form elements to appear
    await waitFor(() => screen.getByLabelText('Amount *'));

    // Assert loading state for select inputs
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

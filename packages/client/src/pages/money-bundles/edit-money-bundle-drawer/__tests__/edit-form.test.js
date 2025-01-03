import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {Formik} from 'formik';
import EditForm from '../EditForm'; // Adjust import path as needed
import {useBundleTypesOptions} from '../../../hooks/graphql';

// Mocking the custom hook for testing
jest.mock('../../../hooks/graphql', () => ({useBundleTypesOptions: jest.fn()}));

describe('EditForm', () => {
  const mockOnSubmit = jest.fn();
  const mockUseBundleTypesOptions = useBundleTypesOptions;

  beforeEach(() => {
    mockUseBundleTypesOptions.mockReturnValue({
      typesOptions: [
        {
          id: '1',
          label: 'Type 1',
        }, {
          id: '2',
          label: 'Type 2',
        },
      ],
      loading: false,
    });
  });

  it('renders the form correctly with initial values', () => {
    render(
      <Formik
        initialValues={{
          amount: 100,
          description: '',
          storage: '',
          transfer: [],
          currency: 'USD',
          type: '',
        }}
        onSubmit={mockOnSubmit}
      >
        <EditForm
          allList={[]}
          onSubmit={mockOnSubmit}
        />
      </Formik>
    );

    expect(screen.getByLabelText(/Amount/i)).toHaveValue(100);
    expect(screen.getByLabelText(/Storage/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
  });

  it('shows the correct error message when validation fails', async () => {
    const initialValues = {
      amount: 100,
      description: '',
      storage: '',
      transfer: [],
      currency: 'USD',
    };
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
      >
        <EditForm
          allList={[]}
          onSubmit={mockOnSubmit}
        />
      </Formik>
    );

    fireEvent.change(screen.getByLabelText(/Amount/i), {target: {value: ''}});
    fireEvent.blur(screen.getByLabelText(/Amount/i));

    await waitFor(() => expect(screen.getByText(/Amount is required/)).toBeInTheDocument());
  });

  it('correctly handles the form submission with valid data', async () => {
    const initialValues = {
      amount: 100,
      description: 'Test description',
      storage: 'Test storage',
      transfer: [],
      currency: 'USD',
      type: '1',
    };
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
      >
        <EditForm
          allList={[]}
          onSubmit={mockOnSubmit}
        />
      </Formik>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith({
      ...initialValues,
      transfer: [],
      id: undefined, // Assuming id is undefined as it's not passed in the form
    }));
  });

  it('disables submit button if there are errors or the form is unchanged', () => {
    const initialValues = {
      amount: 100,
      description: '',
      storage: '',
      transfer: [],
      currency: 'USD',
    };
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
      >
        <EditForm
          allList={[]}
          onSubmit={mockOnSubmit}
        />
      </Formik>
    );

    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/Amount/i), {target: {value: '150'}});
    expect(submitButton).toBeEnabled();

    fireEvent.change(screen.getByLabelText(/Amount/i), {target: {value: ''}});
    expect(submitButton).toBeDisabled();
  });

  it('renders transfer bundles correctly', () => {
    const allList = [
      {
        id: '1',
        currency: 'USD',
        amount: 100,
        description: 'Bundle 1',
        storage: 'Storage 1',
      }, {
        id: '2',
        currency: 'USD',
        amount: 200,
        description: 'Bundle 2',
        storage: 'Storage 2',
      },
    ];
    const initialValues = {
      amount: 100,
      description: '',
      storage: '',
      transfer: [],
      currency: 'USD',
    };

    render(
      <Formik
        initialValues={initialValues}
        onSubmit={mockOnSubmit}
      >
        <EditForm
          allList={allList}
          onSubmit={mockOnSubmit}
        />
      </Formik>
    );

    expect(screen.getByText('Bundle 1')).toBeInTheDocument();
    expect(screen.getByText('Bundle 2')).toBeInTheDocument();
  });

  it('renders loading state for types options', () => {
    mockUseBundleTypesOptions.mockReturnValue({
      typesOptions: [],
      loading: true,
    });

    render(
      <Formik
        initialValues={{
          amount: 100,
          description: '',
          storage: '',
          transfer: [],
          currency: 'USD',
        }}
        onSubmit={mockOnSubmit}
      >
        <EditForm
          allList={[]}
          onSubmit={mockOnSubmit}
        />
      </Formik>
    );

    expect(screen.getByLabelText(/Type/i)).toHaveTextContent('Loading...');
  });
});

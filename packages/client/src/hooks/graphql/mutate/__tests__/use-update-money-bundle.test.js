import {renderHook, act, waitFor} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import useUpdateMoneyBundle from '../use-update-money-bundle';
import {ApolloError} from '@apollo/client/errors';
import React from 'react';
import {gql} from '@apollo/client';

const UPDATE_MONEY_BUNDLE_MUTATION = gql`
  mutation updateMoneyBundle(
    $id: ID!
    $amount: Int!
    $storage: String
    $description: String
    $type: String
    $transfer: [TransferMoneyBundle!]
  ) {
    moneyBundle: updateMoneyBundle(
      id: $id
      amount: $amount
      description: $description
      storage: $storage
      type: $type
      transfer: $transfer
    ) {
      id
      currency
      description
      amount
      storage
      createdAt
      type
    }
  }
`;

const mocks = [
  {
    request: {
      query: UPDATE_MONEY_BUNDLE_MUTATION,
      variables: {
        id: '1',
        amount: 2000,
        storage: 'Storage B',
        description: 'Updated Description',
        type: 'Type B',
        transfer: [],
      },
    },
    result: {
      data: {
        moneyBundle: {
          id: '1',
          currency: 'USD',
          description: 'Updated Description',
          amount: 2000,
          storage: 'Storage B',
          createdAt: '2021-01-01',
          type: 'Type B',
        },
      },
    },
  },
];

describe('useUpdateMoneyBundle hook', () => {
  it('should execute mutation and return data', async () => {
    const {result} = renderHook(
      () => useUpdateMoneyBundle({onCompleted: jest.fn()}),
      {
        wrapper: ({children}) => (
          <MockedProvider
            mocks={mocks}
            addTypename={false}
          >
            {children}
          </MockedProvider>
        ),
      }
    );

    act(() => {
      result.current.updateMoneyBundle({
        id: '1',
        amount: 2000,
        storage: 'Storage B',
        description: 'Updated Description',
        type: 'Type B',
        transfer: [],
      });
    });
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeUndefined();
  });

  it('should handle error state', async () => {
    const errorMock = {
      request: {
        query: UPDATE_MONEY_BUNDLE_MUTATION,
        variables: {
          id: '1',
          amount: 2000,
          storage: 'Storage B',
          description: 'Updated Description',
          type: 'Type B',
          transfer: [],
        },
      },
      result: {errors: [new Error('An error occurred')]},
    };

    const {result} = renderHook(
      () => useUpdateMoneyBundle({onCompleted: jest.fn()}),
      {
        wrapper: ({children}) => (
          <MockedProvider
            mocks={[errorMock]}
            addTypename={false}
          >
            {children}
          </MockedProvider>
        ),
      }
    );

    act(() => {
      result.current.updateMoneyBundle({
        id: '1',
        amount: 2000,
        storage: 'Storage B',
        description: 'Updated Description',
        type: 'Type B',
        transfer: [],
      });
    });

    await waitFor(() => {
      expect(result.current.error).toEqual(new ApolloError({errorMessage: 'An error occurred'}));
    });
  });
});

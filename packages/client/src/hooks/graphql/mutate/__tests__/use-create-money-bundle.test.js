import {render, act, waitFor} from '@testing-library/react';
import useCreateMoneyBundle from '../use-create-money-bundle';
import {ApolloProvider, InMemoryCache, gql} from '@apollo/client';
import {MockedProvider} from '@apollo/client/testing';
import React from 'react';

// Mocking useMutation and ApolloProvider
const CREATE_MONEY_BUNDLE_MUTATION = gql`
  mutation createMoneyBundleMutation(
    $currency: String!,
    $amount: Int!,
    $storage: String!,
    $type: String!,
    $description: String
  ) {
    moneyBundle: createMoneyBundle(
      currency: $currency
      description: $description
      amount: $amount
      storage: $storage
      type: $type
    ) {
      id
      currency
      description
      amount
      storage
      createdAt
    }
  }
`;

const mocks = [
  {
    request: {
      query: CREATE_MONEY_BUNDLE_MUTATION,
      variables: {
        currency: 'USD',
        amount: 1000,
        storage: 'Storage A',
        type: 'Type A',
        description: 'Description A',
      },
    },
    result: {
      data: {
        moneyBundle: {
          id: '1',
          currency: 'USD',
          description: 'Description A',
          amount: 1000,
          storage: 'Storage A',
          createdAt: '2021-01-01',
        },
      },
    },
  },
];

describe('useCreateMoneyBundle', () => {
  it('should execute mutation and return data', async () => {
    const {result} = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <ApolloProvider client={{cache: new InMemoryCache()}}>
          <Component />
        </ApolloProvider>
      </MockedProvider>
    );

    const {createMoneyBundle, loading} = result.current;

    await act(async () => {
      createMoneyBundle({
        currency: 'USD',
        amount: 1000,
        storage: 'Storage A',
        type: 'Type A',
        description: 'Description A',
      });
    });

    await waitFor(() => !loading);

    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it('should handle loading state', () => {
    const {result} = render(
      <MockedProvider
        mocks={[]}
        addTypename={false}
      >
        <ApolloProvider client={{cache: new InMemoryCache()}}>
          <Component />
        </ApolloProvider>
      </MockedProvider>
    );

    expect(result.current.loading).toBe(true);
  });

  it('should handle error state', async () => {
    const errorMock = {
      request: {
        query: CREATE_MONEY_BUNDLE_MUTATION,
        variables: {
          currency: 'USD',
          amount: 1000,
          storage: 'Storage A',
          type: 'Type A',
          description: 'Description A',
        },
      },
      error: new Error('An error occurred'),
    };

    const {result} = render(
      <MockedProvider
        mocks={[errorMock]}
        addTypename={false}
      >
        <ApolloProvider client={{cache: new InMemoryCache()}}>
          <Component />
        </ApolloProvider>
      </MockedProvider>
    );

    await waitFor(() => result.current.error);

    expect(result.current.error).toEqual(new Error('An error occurred'));
  });
});

const Component = () => {
  const {createMoneyBundle, loading, error} = useCreateMoneyBundle({onCompleted: jest.fn()});

  return (
    <div>
      <button
        onClick={() =>
          createMoneyBundle({
            currency: 'USD',
            amount: 1000,
            storage: 'Storage A',
            type: 'Type A',
            description: 'Description A',
          })}
      >
        Create Money Bundle
      </button>
      {loading && <span>Loading...</span>}
      {error && (
        <span>
          Error:
          {error.message}
        </span>
      )}
    </div>
  );
};

import {render, act, waitFor} from '@testing-library/react';
import useDeleteMoneyBundle from '../use-delete-money-bundle';
import {ApolloProvider, InMemoryCache, gql} from '@apollo/client';
import {MockedProvider} from '@apollo/client/testing';
import React from 'react';

// Mocking DELETE_MONEY_BUNDLE_MUTATION
const DELETE_MONEY_BUNDLE_MUTATION = gql`
  mutation deleteMoneyBundleMutation( $id: ID!) {
    deletedMoneyBundle: deleteMoneyBundle(id: $id) {
      id
      currency
      description
      amount
      storage
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const mocks = [
  {
    request: {
      query: DELETE_MONEY_BUNDLE_MUTATION,
      variables: {id: '1'},
    },
    result: {
      data: {
        deletedMoneyBundle: {
          id: '1',
          currency: 'USD',
          description: 'Description A',
          amount: 1000,
          storage: 'Storage A',
          createdAt: '2021-01-01',
          updatedAt: '2021-02-01',
          deletedAt: '2021-03-01',
        },
      },
    },
  },
];

describe('useDeleteMoneyBundle', () => {
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

    const {deleteMoneyBundle, loading} = result.current;

    await act(async () => {
      deleteMoneyBundle('1');
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
        query: DELETE_MONEY_BUNDLE_MUTATION,
        variables: {id: '1'},
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
  const {deleteMoneyBundle, loading, error} = useDeleteMoneyBundle({onCompleted: jest.fn()});

  return (
    <div>
      <button onClick={() => deleteMoneyBundle('1')}>Delete Money Bundle</button>
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

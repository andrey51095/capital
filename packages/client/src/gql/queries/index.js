import gql from 'graphql-tag';

export const QUERY_MONEY_BUNDLES = gql`
  query MoneyBundles {
    moneyBundles {
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

export const QUERY_CURRENCIES = gql`
  query Currencies {
    currencies
  }
`;
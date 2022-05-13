import gql from 'graphql-tag';

export const QUERY_MONEY_BUNDLES = gql`
  query MoneyBundles {
    moneyBundles {
      id
      currency
      description
      amount
      storage
      type
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

export const QUERY_TYPES = gql`
  query Types {
    types {
      id
      label
    }
  }
`;

export const QUERY_MONEY_SUMMARY = gql`
  query MoneySummary {
    summary: moneySummary {
      amount
      currency
    }
  }
`;

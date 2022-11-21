import gql from 'graphql-tag';

export const QUERY_CURRENCIES = gql`
  query Currencies {
    currencies
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

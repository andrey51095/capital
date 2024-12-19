import {gql} from '@apollo/client';

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

export const GET_EXPENSES = gql`
  query GetExpenses($filter: ExpenseFilter) {
    getExpenses(filter: $filter) {
      id
      date
      category
      amount
      description
    }
  }
`;

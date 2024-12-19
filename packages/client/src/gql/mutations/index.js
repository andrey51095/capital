import {gql} from '@apollo/client';

export const UPDATE_MONEY_BUNDLE_MUTATION = gql`
  mutation updateMoneyBundle(
    $id: ID!
    $amount: Int!,
    $storage: String
    $description: String
    $transfer: [TransferMoneyBundle!]
  ) {
    moneyBundle: updateMoneyBundle(
      id: $id
      amount: $amount
      description: $description
      storage: $storage
      transfer: $transfer
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

export const BACKUP_MUTATION = gql`
  mutation Backup{
    backup
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: ExpenseInput!) {
    createExpense(input: $input) {
      id
      date
      category
      amount
      description
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;

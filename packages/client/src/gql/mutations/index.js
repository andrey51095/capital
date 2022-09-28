import gql from 'graphql-tag';

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

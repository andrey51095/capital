import gql from 'graphql-tag';

export const CREATE_MONEY_BUNDLE_MUTATION = gql`
  mutation createMoneyBundleMutation(
    $currency: String!,
    $amount: Int!,
    $storage: String!,
    $description: String
  ) {
    moneyBundle: createMoneyBundle(
      currency: $currency
      description: $description
      amount: $amount
      storage: $storage
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

export const UPDATE_MONEY_BUNDLE_MUTATION = gql`
  mutation updateMoneyBundle(
    $id: ID!
    $amount: Int!,
    $description: String
    $transfer: [TransferMoneyBundle!]
  ) {
    moneyBundle: updateMoneyBundle(
      id: $id
      amount: $amount
      description: $description
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

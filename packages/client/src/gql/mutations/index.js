import gql from 'graphql-tag'

export const CREATE_MONEY_BUNDLE_MUTATION = gql`
  mutation createTaskMutation(
    $currency: String!,
    $amount: Int!,
    $storage: String!,
    $description: String
  ) {
  createMoneyBundle(
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

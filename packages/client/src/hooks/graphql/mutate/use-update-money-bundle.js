// @flow
import {useMutation} from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_MONEY_BUNDLE_MUTATION = gql`
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

const useUpdateMoneyBundle = ({onCompleted}) => {
  const [mutate, {error, loading}] =useMutation(UPDATE_MONEY_BUNDLE_MUTATION, {onCompleted});

  const updateMoneyBundle = variables => mutate({variables});

  return {
    updateMoneyBundle,
    loading,
    error,
  };
};
export default useUpdateMoneyBundle;

// @flow
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';

const QUERY_MONEY_BUNDLES = gql`
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

const useMoneyBundles = () => {
  const {data, loading, error, refetch} = useQuery(QUERY_MONEY_BUNDLES);

  return {
    data: data?.moneyBundles,
    loading,
    error,
    refetch,
  };
};
export default useMoneyBundles;

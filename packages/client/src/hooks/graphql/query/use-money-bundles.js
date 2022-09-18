// @flow
import {useMemo} from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

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

  const moneyBundles = useMemo(() => [...(data?.moneyBundles || [])], [data]);

  return {
    moneyBundles,
    loading,
    error,
    refetch,
  };
};
export default useMoneyBundles;

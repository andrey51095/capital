// @flow
import {useMemo} from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const QUERY_MONEY_SUMMARY = gql`
  query MoneySummary {
    summary: moneySummary {
      amount
      currency
    }
  }
`;

const useMoneySummary = () => {
  const {data, loading, error, refetch} = useQuery(QUERY_MONEY_SUMMARY, {notifyOnNetworkStatusChange: true});

  const summary = useMemo(() => ([...(data?.summary || [])]), [data]);

  return {
    summary,
    loading,
    error,
    refetch,
  };
};
export default useMoneySummary;

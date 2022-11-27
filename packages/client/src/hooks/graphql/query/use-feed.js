// @flow
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const QUERY_FEED = gql`
  query Feed($page: Int!, $perPage: Int!) {
    feed(page: $page, perPage: $perPage) {
      page
      feeds {
        id
        createdAt
        to
        from
        transferredTo
      }
    }
  }
`;

const useFeed = () => {
  const {data, loading, error, refetch} = useQuery(QUERY_FEED, {
    variables: {
      page: 0,
      perPage: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  return {
    feed: data?.feed?.feeds,
    loading,
    error,
    refetch,
  };
};
export default useFeed;

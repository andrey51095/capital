// @flow
import {useMemo} from 'react';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';

const QUERY_TYPES = gql`
  query Types {
    types {
      id
      label
    }
  }
`;

const useBundleTypesOptions = () => {
  const {data, loading, error, refetch} = useQuery(QUERY_TYPES);

  const typesOptions = useMemo(() => [...(data?.types || [])], [data]);

  return {
    typesOptions,
    loading,
    error,
    refetch,
  };
};
export default useBundleTypesOptions;

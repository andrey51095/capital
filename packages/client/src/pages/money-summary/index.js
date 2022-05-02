import React from 'react';
import {Spinner} from 'baseui/spinner';
import {Block} from 'baseui/block';
import {useQuery} from 'react-apollo';

import {QUERY_MONEY_SUMMARY} from '../../gql/queries';
import Currency from '../../components/currency';

const MoneySummary = () => {
  const {data, loading} = useQuery(QUERY_MONEY_SUMMARY);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Block>
      <Block>
        {data.summary.map(({amount, currency}) => (
          <Block
            key={`${amount}(${currency})`}
            display="flex"
          >
            {amount}
            (
            <Currency value={currency} />
            )
          </Block>
        ))}
      </Block>
    </Block>
  );
};
export default MoneySummary;

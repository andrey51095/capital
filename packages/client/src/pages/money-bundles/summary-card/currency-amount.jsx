import React from 'react';
import {Block} from 'baseui/block';

import Currency from '../../../components/currency';
import {Skeleton} from '../../../components/skeleton';

// https://baseweb.design/components/card/
const CurrencyAmountRenderer = ({data, loading}) => {

  if (loading) {
    return (
      <Skeleton
        items={3}
        height="72px"
        width="90px"
      />
    );
  }
  return (
    data.map(({amount, currency}) => (
      <Block
        key={`${amount}(${currency})`}
        display="flex"
      >
        {amount}
        (
        <Currency value={currency} />
        )
      </Block>
    ))

  );
};
export default CurrencyAmountRenderer;

import React from 'react';
import {Card, StyledBody} from 'baseui/card';
import {Block} from 'baseui/block';
import {Skeleton} from 'baseui/skeleton';

import Currency from '../../components/currency';

// https://baseweb.design/components/card/
const SummaryCard = ({summary, loading}) => (
  <Card title="Summary">
    <StyledBody>
      {loading && (
        <Skeleton
          rows={3}
          height="75px"
          width="90px"
          animation
        />
      )}
      {!loading && summary.map(({amount, currency}) => (
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
    </StyledBody>
  </Card>
);
export default SummaryCard;

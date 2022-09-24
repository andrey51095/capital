import React, {useState} from 'react';
import {Card, StyledBody} from 'baseui/card';
import {StyledDivider} from 'baseui/divider';

import {configOptions, titleMapper} from './constants';
import CurrencyAmountRenderer from './currency-amount';
import SummaryInPln from './summary-in-pln';
import SummaryInUsd from './summary-in-usd';

// https://baseweb.design/components/card/
const SummaryCard = ({summary, loading}) => {
  const [configKey] = useState(configOptions[0]);

  let data = summary;

  return (
    <Card title={titleMapper[configKey]}>
      <StyledBody>
        <CurrencyAmountRenderer
          data={data}
          loading={loading}
        />
        <StyledDivider />
        <SummaryInPln
          data={data}
          loading={loading}
        />
        <StyledDivider />
        <SummaryInUsd
          data={data}
          loading={loading}
        />
      </StyledBody>
    </Card>
  );
};
export default SummaryCard;

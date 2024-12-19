import React, {useState} from 'react';
import {StyledBody} from 'baseui/card';
import {Block} from 'baseui/block';
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
    <Block
      overrides={{}}
      title={titleMapper[configKey]}
    >
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
    </Block>
  );
};
export default SummaryCard;

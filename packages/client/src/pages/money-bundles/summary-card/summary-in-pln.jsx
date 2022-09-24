import React, {useMemo} from 'react';
import {Block} from 'baseui/block';

import Currency from '../../../components/currency';
import {useFetchAll} from '../../../hooks';
import {Skeleton} from '../../../components/skeleton';

const PLN = 'PLN';

const getUrl = code => `http://api.nbp.pl/api/exchangerates/rates/C/${code}`;

let myHeaders = new Headers();
let requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

export default function SummaryInPln({data: summary, loading: isSummaryLoading}) {
  const urls = useMemo(() => summary.map(({currency}) => currency).filter(c => c !== PLN)
    .map(getUrl), [summary]);
  const {data, loading} = useFetchAll(urls, requestOptions);

  const preparedData = data.reduce((acc, item) => ({
    [item.code]: item.rates[0],
    ...acc,
  }), {});

  const totalValue = data.length ? summary.reduce((acc, {currency, amount}) => acc + (amount * (preparedData[currency]?.bid || 1)), 0) : 0;

  const isLoading = isSummaryLoading || loading;

  return (
    <Block
      display="flex"
      alignItems="center"
      gridColumnGap="scale400"
    >
      {isLoading && (
        <Skeleton
          items={3}
          height="72px"
          width="90px"
        />
      )}

      {!isLoading && (
        <Block>
          <Block display="flex" >
            ~
            {Math.round(totalValue)}
            (
            <Currency value={PLN} />
            )
          </Block>
          <Block paddingLeft="scale200">
            {Object.keys(preparedData).map(key => (
              <Block
                key={key}
                display="flex"
              >
                <Block>{preparedData[key].bid.toFixed(2)}</Block>
                /
                <Block>{preparedData[key].ask.toFixed(2)}</Block>
                (
                <Currency value={key} />
                )
              </Block>
            ))}
          </Block>
        </Block>
      )}
    </Block>
  );
}

import React, {useMemo} from 'react';
import {Block} from 'baseui/block';
import {Spinner} from 'baseui/spinner';

import Currency from '../../components/currency';
import {useFetchAll} from '../../hooks';

const PLN = 'PLN';

const getUrl = code => `http://api.nbp.pl/api/exchangerates/rates/C/${code}`;

let myHeaders = new Headers();
let requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

export default function SummaryInPln({summary}) {
  const urls = useMemo(() => summary.map(({currency}) => currency).filter(c => c !== PLN)
    .map(getUrl), [summary]);
  const {data, loading} = useFetchAll(urls, requestOptions);

  const preparedData = data.reduce((acc, item) => ({
    [item.code]: item.rates[0],
    ...acc,
  }), {});

  const totalValue = data.length ? summary.reduce((acc, {currency, amount}) => acc + (amount * (preparedData[currency]?.bid || 1)), 0) : 0;

  return (
    <Block
      display="flex"
      marginTop="scale500"
      justifyContent="center"
      alignItems="center"
      gridColumnGap="scale400"
    >
      {loading && <Spinner />}

      {!loading && (
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
                gridColumnGap="scale200"
              >
                <Currency value={key} />
                <Block>{preparedData[key].effectiveDate }</Block>
                <Block>{preparedData[key].bid }</Block>
                <Block>{preparedData[key].ask }</Block>
              </Block>
            ))}
          </Block>
        </Block>
      )}
    </Block>
  );
}

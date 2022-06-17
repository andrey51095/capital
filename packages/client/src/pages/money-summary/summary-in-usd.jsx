import React, { useMemo} from 'react'
import { Block } from 'baseui/block'
import { Button } from 'baseui/button'

import Currency from '../../components/currency';
import {useLazyFetch} from '../../hooks';

const API_KEY = 'Y9Z0UZRuC2yFA8U7u183D8MvOWH4AXHW';
const USD = 'USD';
var myHeaders = new Headers();
myHeaders.append("apikey", API_KEY);
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function SummaryInUsd({ summary }) {
  const summaryParam = summary.map(({ currency }) => currency).join(',');
  const url = `https://api.apilayer.com/currency_data/live?source=${USD}&currencies=${summaryParam}`;
  const [getData, {loading, data}] = useLazyFetch(url, requestOptions)

  const totalValue = useMemo(() => {
    if (!data) {
      return 0
    }
    return summary.reduce((acc, {currency, amount}) => acc + amount / data.quotes[`${data.source}${currency}`], 0)
  }, [summary, data]);

  const handleClick = () => { getData() }

  return (
    <Block display="flex" marginTop="scale500" justifyContent="center" alignItems="center" gridColumnGap="scale400">
      <Button onClick={handleClick} isLoading={loading}>
        Get in Usd
      </Button>

      {data && (
        <Block display="flex" >
          ~{Math.round(totalValue)}
          (<Currency value={data.source} />)
        </Block>
      )
      }
   </Block>
 )
}